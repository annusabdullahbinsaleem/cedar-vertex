import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
	getLeadSaveResponse,
	saveLeadIdempotently,
} from "./idempotency.ts";

const migrationUrl = new URL("../migrations/0001_add_leads_idempotency_key.sql", import.meta.url);
const submission = {
	name: "Test Lead",
	email: "test@example.com",
	company: "Example Co",
	service: "Website",
	budget: "",
	message: "Build a website",
	timeline: "",
	idempotencyKey: "a6382f2e-941e-48f9-b9d2-a1dffda182b0",
};

async function createDatabase() {
	const sqlite = new DatabaseSync(":memory:");
	sqlite.exec(
		"CREATE TABLE leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, company TEXT, service TEXT, budget TEXT, message TEXT NOT NULL, submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, status TEXT NOT NULL DEFAULT 'New', timeline TEXT)",
	);
	sqlite
		.prepare("INSERT INTO leads (name, email, message) VALUES (?, ?, ?)")
		.run("Existing Lead", "existing@example.com", "Existing record");
	sqlite.exec(await readFile(migrationUrl, "utf8"));

	return {
		sqlite,
		db: {
			prepare(query) {
				return {
					values: [],
					bind(...values) {
						this.values = values;
						return this;
					},
					async run() {
						const result = sqlite.prepare(query).run(...this.values);
						return {
							success: true,
							meta: { changes: Number(result.changes) },
						};
					},
					async first() {
						return sqlite.prepare(query).get(...this.values) ?? null;
					},
				};
			},
		},
	};
}

test("same idempotency key and normalized payload inserts one lead", async () => {
	const { sqlite, db } = await createDatabase();
	try {
		const firstResult = await saveLeadIdempotently(db, submission);
		const repeatedResult = await saveLeadIdempotently(db, submission);
		assert.equal(firstResult, "inserted");
		assert.equal(repeatedResult, "duplicate");
		assert.equal(getLeadSaveResponse(firstResult).status, 201);
		assert.equal(getLeadSaveResponse(repeatedResult).status, 201);
		assert.equal(
			sqlite
				.prepare("SELECT COUNT(*) AS count FROM leads WHERE idempotency_key = ?")
				.get(submission.idempotencyKey).count,
			1,
		);
		assert.deepEqual(
			{
				...sqlite
					.prepare("SELECT name, email, idempotency_key FROM leads WHERE email = ?")
					.get("existing@example.com"),
			},
			{
				name: "Existing Lead",
				email: "existing@example.com",
				idempotency_key: null,
			},
		);
	} finally {
		sqlite.close();
	}
});

test("concurrent submissions with the same key insert only one lead", async () => {
	const { sqlite, db } = await createDatabase();
	try {
		const results = await Promise.all(
			Array.from({ length: 16 }, () => saveLeadIdempotently(db, submission)),
		);
		assert.equal(results.filter((result) => result === "inserted").length, 1);
		assert.equal(results.filter((result) => result === "duplicate").length, 15);
		assert.equal(
			sqlite
				.prepare("SELECT COUNT(*) AS count FROM leads WHERE idempotency_key = ?")
				.get(submission.idempotencyKey).count,
			1,
		);
	} finally {
		sqlite.close();
	}
});

test("same key with a different normalized payload returns conflict without inserting", async () => {
	const { sqlite, db } = await createDatabase();
	try {
		assert.equal(await saveLeadIdempotently(db, submission), "inserted");
		const conflict = await saveLeadIdempotently(db, {
				...submission,
				message: "Different request",
			});
		assert.equal(conflict, "conflict");
		assert.equal(getLeadSaveResponse(conflict).status, 409);
		assert.equal(
			sqlite
				.prepare("SELECT COUNT(*) AS count FROM leads WHERE idempotency_key = ?")
				.get(submission.idempotencyKey).count,
			1,
		);
	} finally {
		sqlite.close();
	}
});
