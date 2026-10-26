import { DurableObject, env } from "cloudflare:workers";
import { getLeadSaveResponse, saveLeadIdempotently } from "./idempotency";

const submissionPath = "/submit";
const maxRequestBytes = 8 * 1024;
const replayIdPattern =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const replayRetentionMs = 2 * 60 * 1000;
const fieldNames = [
	"name",
	"email",
	"company",
	"phone",
	"projectType",
	"description",
	"budget",
	"timeline",
	"idempotencyKey",
] as const;
const projectTypes = new Set([
	"Website",
	"Web App",
	"Mobile App",
	"UI/UX / Product Design",
	"SEO",
	"Branding / Graphic Design",
	"Not Sure",
]);
const budgets = new Set([
	"Under £1,000",
	"£1,000–£2,500",
	"£2,500–£5,000",
	"£5,000–£10,000",
	"£10,000+",
	"Not sure yet",
]);
const timelines = new Set([
	"ASAP",
	"Within 1 month",
	"1–3 months",
	"3–6 months",
	"Flexible / Not sure",
]);
const emailPattern =
	/^[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*(?:\.[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+(?:'[A-Za-z0-9!#$%&*+/=?^_`{|}~-]+)*)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

type ProposalSubmission = {
	name: string;
	email: string;
	company: string;
	phone: string | null;
	projectType: string;
	description: string;
	budget: string;
	timeline: string;
	idempotencyKey: string;
};

type BodyResult =
	| { kind: "ok"; text: string }
	| { kind: "too-large" }
	| { kind: "invalid" };

function jsonResponse(body: object, status: number, headers?: HeadersInit) {
	return Response.json(body, {
		status,
		headers: {
			"Cache-Control": "no-store",
			"X-Content-Type-Options": "nosniff",
			...headers,
		},
	});
}

async function readLimitedBody(request: Request): Promise<BodyResult> {
	const contentLength = request.headers.get("content-length");
	if (contentLength !== null) {
		const declaredLength = Number(contentLength);
		if (!Number.isSafeInteger(declaredLength) || declaredLength < 0) {
			return { kind: "invalid" };
		}
		if (declaredLength > maxRequestBytes) {
			return { kind: "too-large" };
		}
	}

	if (!request.body) {
		return { kind: "invalid" };
	}

	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let totalBytes = 0;

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}

			totalBytes += value.byteLength;
			if (totalBytes > maxRequestBytes) {
				try {
					await reader.cancel();
				} catch {
					return { kind: "too-large" };
				}
				return { kind: "too-large" };
			}
			chunks.push(value);
		}
	} catch {
		return { kind: "invalid" };
	} finally {
		reader.releaseLock();
	}

	const bytes = new Uint8Array(totalBytes);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}

	try {
		return {
			kind: "ok",
			text: new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes),
		};
	} catch {
		return { kind: "invalid" };
	}
}

function decodeSignature(signature: string): Uint8Array {
	if (!/^[A-Za-z0-9_-]+$/.test(signature)) {
		return new Uint8Array();
	}

	try {
		const base64 = signature.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
		return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
	} catch {
		return new Uint8Array();
	}
}

async function verifyRequestSignature(
	secret: string,
	timestamp: string,
	requestId: string,
	signature: string,
	body: string,
): Promise<boolean> {
	if (!/^\d{10}$/.test(timestamp) || !replayIdPattern.test(requestId)) {
		return false;
	}

	const requestTime = Number(timestamp);
	const currentTime = Math.floor(Date.now() / 1000);
	if (Math.abs(currentTime - requestTime) > 60) {
		return false;
	}

	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["verify"],
	);
	return crypto.subtle.verify(
		"HMAC",
		key,
		decodeSignature(signature),
		new TextEncoder().encode(`${timestamp}.${requestId}.${body}`),
	);
}

function validateSubmission(value: unknown): ProposalSubmission | null {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		return null;
	}

	const fields = value as Record<string, unknown>;
	const keys = Object.keys(fields);
	const requiredFieldNames = fieldNames.filter((field) => field !== "phone");
	if (
		keys.some((key) => !fieldNames.includes(key as (typeof fieldNames)[number])) ||
		requiredFieldNames.some((field) => !Object.hasOwn(fields, field))
	) {
		return null;
	}

	const strings = {} as Record<(typeof requiredFieldNames)[number], string>;
	for (const field of requiredFieldNames) {
		const fieldValue = fields[field];
		if (typeof fieldValue !== "string") {
			return null;
		}
		strings[field] = fieldValue.trim();
	}

	const phoneValue = fields.phone;
	const phone =
		phoneValue === undefined || phoneValue === null
			? null
			: typeof phoneValue === "string" && /^\+[1-9]\d{6,14}$/.test(phoneValue)
				? phoneValue
				: undefined;
	if (phone === undefined) {
		return null;
	}

	if (
		!strings.name ||
		strings.name.length > 120 ||
		!strings.email ||
		strings.email.length > 254 ||
		!emailPattern.test(strings.email) ||
		!strings.company ||
		strings.company.length > 200 ||
		!replayIdPattern.test(strings.idempotencyKey) ||
		!projectTypes.has(strings.projectType) ||
		strings.description.length === 0 ||
		strings.description.length > 5000 ||
		(strings.budget !== "" && !budgets.has(strings.budget)) ||
		(strings.timeline !== "" && !timelines.has(strings.timeline))
	) {
		return null;
	}

	return {
		name: strings.name,
		email: strings.email.toLowerCase(),
		company: strings.company,
		phone,
		projectType: strings.projectType,
		description: strings.description,
		budget: strings.budget,
		timeline: strings.timeline,
		idempotencyKey: strings.idempotencyKey,
	};
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function createLeadNotification(submission: ProposalSubmission) {
	const details = [
		["Name", submission.name],
		["Email", submission.email],
		["Phone", submission.phone ?? "Not provided"],
		["Company", submission.company],
		["Project type", submission.projectType],
		["Budget", submission.budget || "Not provided"],
		["Timeline", submission.timeline || "Not provided"],
		["Message", submission.description],
	] as const;
	const text = [
		"A new proposal was submitted on Cedar Vertex.",
		"",
		...details.map(([label, value]) => `${label}: ${value}`),
	].join("\n");
	const html = `<!doctype html>
<html lang="en">
	<body style="font-family: Arial, sans-serif; color: #172033; line-height: 1.5;">
		<h1 style="font-size: 20px;">New Cedar Vertex proposal</h1>
		${details
			.map(
				([label, value]) =>
					`<p><strong>${escapeHtml(label)}</strong><br><span style="white-space: pre-wrap;">${escapeHtml(value)}</span></p>`,
			)
			.join("\n")}
	</body>
</html>`;

	return {
		to: "cedarvertex@gmail.com",
		from: "proposals@cedarvertex.com",
		replyTo: submission.email,
		subject: "New Cedar Vertex proposal",
		text,
		html,
	};
}

function emailErrorCode(error: unknown): string {
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		typeof error.code === "string"
	) {
		return error.code;
	}
	return "UNKNOWN";
}

export class LeadReplayGuard extends DurableObject {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS replay_requests (request_id TEXT PRIMARY KEY, expires_at INTEGER NOT NULL)",
		);
	}

	async fetch(request: Request): Promise<Response> {
		if (request.method !== "POST" || new URL(request.url).pathname !== "/consume") {
			return Response.json({ error: "Not found." }, { status: 404 });
		}

		let input: unknown;
		try {
			input = await request.json();
		} catch {
			return Response.json({ error: "Invalid request." }, { status: 400 });
		}
		if (
			typeof input !== "object" ||
			input === null ||
			!("requestId" in input) ||
			typeof input.requestId !== "string" ||
			!replayIdPattern.test(input.requestId) ||
			!("now" in input) ||
			typeof input.now !== "number" ||
			!Number.isSafeInteger(input.now)
		) {
			return Response.json({ error: "Invalid request." }, { status: 400 });
		}

		return Response.json({
			accepted: await this.consume(input.requestId, input.now),
		});
	}

	private async consume(requestId: string, now: number): Promise<boolean> {
		this.ctx.storage.sql.exec(
			"DELETE FROM replay_requests WHERE expires_at <= ?",
			now,
		);
		const expiresAt = now + replayRetentionMs;
		const inserted = this.ctx.storage.sql
			.exec<{ request_id: string }>(
				"INSERT INTO replay_requests (request_id, expires_at) VALUES (?, ?) ON CONFLICT(request_id) DO NOTHING RETURNING request_id",
				requestId,
				expiresAt,
			)
			.toArray();
		if (inserted.length !== 1) {
			return false;
		}

		const scheduledAlarm = await this.ctx.storage.getAlarm();
		if (scheduledAlarm === null || scheduledAlarm > expiresAt) {
			await this.ctx.storage.setAlarm(expiresAt);
		}
		return true;
	}

	async alarm(): Promise<void> {
		const now = Date.now();
		this.ctx.storage.sql.exec(
			"DELETE FROM replay_requests WHERE expires_at <= ?",
			now,
		);
		const nextExpiry = this.ctx.storage.sql
			.exec<{ expires_at: number }>(
				"SELECT MIN(expires_at) AS expires_at FROM replay_requests",
			)
			.toArray()[0]?.expires_at;
		if (nextExpiry !== null && nextExpiry !== undefined) {
			await this.ctx.storage.setAlarm(Math.max(nextExpiry, now + 1));
		}
	}
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		if (url.pathname !== submissionPath) {
			return jsonResponse({ error: "Not found." }, 404);
		}
		if (request.method !== "POST") {
			return jsonResponse({ error: "Method not allowed." }, 405, {
				Allow: "POST",
			});
		}

		const expectedSecret = env.PROPOSAL_SHARED_SECRET;
		if (typeof expectedSecret !== "string" || expectedSecret.length < 32) {
			return jsonResponse({ error: "Service unavailable." }, 503);
		}

		const contentType = request.headers
			.get("content-type")
			?.split(";", 1)[0]
			.trim()
			.toLowerCase();
		if (contentType !== "application/json") {
			return jsonResponse({ error: "Unsupported media type." }, 415);
		}

		const body = await readLimitedBody(request);
		if (body.kind === "too-large") {
			return jsonResponse({ error: "Request too large." }, 413);
		}
		if (body.kind === "invalid") {
			return jsonResponse({ error: "Invalid request." }, 400);
		}

		const timestamp = request.headers.get("x-proposal-timestamp") ?? "";
		const requestId = request.headers.get("x-proposal-request-id") ?? "";
		const signature = request.headers.get("x-proposal-signature") ?? "";
		if (
			!(await verifyRequestSignature(
				expectedSecret,
				timestamp,
				requestId,
				signature,
				body.text,
			))
		) {
			return jsonResponse({ error: "Unauthorized." }, 401);
		}

		let input: unknown;
		try {
			input = JSON.parse(body.text);
		} catch {
			return jsonResponse({ error: "Invalid request." }, 400);
		}

		const submission = validateSubmission(input);
		if (!submission) {
			return jsonResponse({ error: "Invalid proposal." }, 422);
		}

		let isNewRequest: boolean;
		try {
			const shard = requestId.slice(0, 2).toLowerCase();
			const guardResponse = await env.LEAD_REPLAY_GUARD.getByName(
				`lead-replay-${shard}`,
			).fetch(
				new Request("https://replay-guard/consume", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ requestId, now: Date.now() }),
				}),
			);
			if (!guardResponse.ok) {
				throw new Error("Replay guard request failed.");
			}
			const guardResult: unknown = await guardResponse.json();
			if (
				typeof guardResult !== "object" ||
				guardResult === null ||
				!("accepted" in guardResult) ||
				typeof guardResult.accepted !== "boolean"
			) {
				throw new Error("Replay guard response was invalid.");
			}
			isNewRequest = guardResult.accepted;
		} catch {
			console.error(JSON.stringify({ event: "lead_replay_guard_failed" }));
			return jsonResponse({ error: "Service unavailable." }, 503);
		}
		if (!isNewRequest) {
			return jsonResponse({ error: "Request already processed." }, 409);
		}

		try {
			const result = await saveLeadIdempotently(env.DB, {
				name: submission.name,
				email: submission.email,
				company: submission.company,
				phone: submission.phone,
				service: submission.projectType,
				budget: submission.budget,
				message: submission.description,
				timeline: submission.timeline,
				idempotencyKey: submission.idempotencyKey,
			});
			if (result === "inserted") {
				try {
					const email = await env.EMAIL.send(
						createLeadNotification(submission),
					);
					console.log(
						JSON.stringify({
							event: "lead_notification_sent",
							messageId: email.messageId,
						}),
					);
				} catch (error) {
					// The lead is already saved. Keep submission successful and log the email failure.
					console.error(
						JSON.stringify({
							event: "lead_notification_failed",
							code: emailErrorCode(error),
						}),
					);
				}
			}
			const response = getLeadSaveResponse(result);
			return jsonResponse(response.body, response.status);
		} catch {
			console.error(JSON.stringify({ event: "lead_insert_failed" }));
			return jsonResponse({ error: "Unable to save proposal." }, 500);
		}
	},
} satisfies ExportedHandler;
