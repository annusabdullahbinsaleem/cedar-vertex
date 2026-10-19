export type LeadSubmission = {
	name: string;
	email: string;
	company: string;
	service: string;
	budget: string;
	message: string;
	timeline: string;
	idempotencyKey: string;
};

type ExistingLead = Omit<LeadSubmission, "idempotencyKey">;

type D1RunResult = {
	success: boolean;
	meta: { changes: number };
};

type D1StatementLike = {
	bind(...values: unknown[]): D1StatementLike;
	run(): Promise<D1RunResult>;
	first<T>(): Promise<T | null>;
};

export type LeadDatabase = {
	prepare(query: string): D1StatementLike;
};

export function getLeadSaveResponse(
	result: "inserted" | "duplicate" | "conflict",
): { body: { success: true } | { error: string }; status: 201 | 409 } {
	if (result === "conflict") {
		return { body: { error: "Idempotency key conflict." }, status: 409 };
	}
	return { body: { success: true }, status: 201 };
}

export async function saveLeadIdempotently(
	db: LeadDatabase,
	submission: LeadSubmission,
): Promise<"inserted" | "duplicate" | "conflict"> {
	const result = await db
		.prepare(
			"INSERT INTO leads (name, email, company, service, budget, message, timeline, idempotency_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(idempotency_key) DO NOTHING",
		)
		.bind(
			submission.name,
			submission.email,
			submission.company,
			submission.service,
			submission.budget || null,
			submission.message,
			submission.timeline || null,
			submission.idempotencyKey,
		)
		.run();

	if (!result.success) {
		throw new Error("Lead insert failed.");
	}
	if (result.meta.changes === 1) {
		return "inserted";
	}
	if (result.meta.changes !== 0) {
		throw new Error("Lead insert affected an unexpected number of rows.");
	}

	const existingLead = await db
		.prepare(
			"SELECT name, email, company, service, COALESCE(budget, '') AS budget, message, COALESCE(timeline, '') AS timeline FROM leads WHERE idempotency_key = ?",
		)
		.bind(submission.idempotencyKey)
		.first<ExistingLead>();

	if (
		!existingLead ||
		existingLead.name !== submission.name ||
		existingLead.email !== submission.email ||
		existingLead.company !== submission.company ||
		existingLead.service !== submission.service ||
		existingLead.budget !== submission.budget ||
		existingLead.message !== submission.message ||
		existingLead.timeline !== submission.timeline
	) {
		return "conflict";
	}

	return "duplicate";
}
