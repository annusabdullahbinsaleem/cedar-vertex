const maxRequestBytes = 8 * 1024;
const maxWorkerResponseBytes = 1024;
const workerTimeoutMs = 5000;
const secretMinLength = 32;
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 10;
const maxTrackedRateLimitKeys = 4096;
const fieldNames = [
  "name",
  "email",
  "company",
  "projectType",
  "description",
  "budget",
  "timeline",
  "idempotencyKey",
] as const;
const idempotencyKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
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

type RateLimitEntry = {
  windowStartedAt: number;
  requestCount: number;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();
let lastRateLimitCleanupAt = 0;

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

function checkRateLimit(request: Request): number | null {
  const now = Date.now();
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey =
    forwardedFor?.split(",", 1)[0].trim().slice(0, 64) || "unknown";

  if (
    now - lastRateLimitCleanupAt >= rateLimitWindowMs ||
    rateLimitEntries.size >= maxTrackedRateLimitKeys
  ) {
    for (const [key, entry] of rateLimitEntries) {
      if (entry.windowStartedAt + rateLimitWindowMs <= now) {
        rateLimitEntries.delete(key);
      }
    }
    lastRateLimitCleanupAt = now;
  }

  let entry = rateLimitEntries.get(clientKey);
  if (!entry) {
    if (rateLimitEntries.size >= maxTrackedRateLimitKeys) {
      return Math.ceil(rateLimitWindowMs / 1000);
    }
    entry = { windowStartedAt: now, requestCount: 0 };
    rateLimitEntries.set(clientKey, entry);
  }

  entry.requestCount = Math.min(entry.requestCount + 1, rateLimitMaxRequests + 1);
  if (entry.requestCount <= rateLimitMaxRequests) {
    return null;
  }

  return Math.max(
    1,
    Math.ceil((entry.windowStartedAt + rateLimitWindowMs - now) / 1000),
  );
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

function validateSubmission(value: unknown): ProposalSubmission | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const fields = value as Record<string, unknown>;
  const keys = Object.keys(fields);
  if (
    keys.length !== fieldNames.length ||
    keys.some((key) => !fieldNames.includes(key as (typeof fieldNames)[number]))
  ) {
    return null;
  }

  const strings = {} as Record<(typeof fieldNames)[number], string>;
  for (const field of fieldNames) {
    const fieldValue = fields[field];
    if (typeof fieldValue !== "string") {
      return null;
    }
    strings[field] = fieldValue.trim();
  }

  if (
    !strings.name ||
    strings.name.length > 120 ||
    !strings.email ||
    strings.email.length > 254 ||
    !emailPattern.test(strings.email) ||
    !strings.company ||
    strings.company.length > 200 ||
    !idempotencyKeyPattern.test(strings.idempotencyKey) ||
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
    projectType: strings.projectType,
    description: strings.description,
    budget: strings.budget,
    timeline: strings.timeline,
    idempotencyKey: strings.idempotencyKey,
  };
}

function getWorkerUrl(): URL | null {
  const configuredUrl = process.env.PROPOSAL_WORKER_URL;
  if (!configuredUrl) {
    return null;
  }

  try {
    const url = new URL(configuredUrl);
    const isLocalHttp =
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);

    if (
      (url.protocol !== "https:" && !isLocalHttp) ||
      url.pathname !== "/submit" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

async function signWorkerRequest(
  secret: string,
  timestamp: string,
  requestId: string,
  body: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`${timestamp}.${requestId}.${body}`),
    ),
  );
  let binary = "";
  for (const byte of signature) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

type WorkerResponseFailure =
  | "invalid_json"
  | "missing_success"
  | "non_201"
  | "oversized_body"
  | "unexpected_content_type"
  | "unreadable_body";
type WorkerBodyFailure = Exclude<
  WorkerResponseFailure,
  "non_201" | "unexpected_content_type"
>;

async function readWorkerResponse(
  response: Response,
): Promise<WorkerBodyFailure | null> {
  if (!response.body) {
    return "unreadable_body";
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      totalBytes += value.byteLength;
      if (totalBytes > maxWorkerResponseBytes) {
        try {
          await reader.cancel();
        } catch {
          return "oversized_body";
        }
        return "oversized_body";
      }
      chunks.push(value);
    }
  } catch {
    return "unreadable_body";
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
    const payload: unknown = JSON.parse(
      new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes),
    );
    if (
      typeof payload === "object" &&
      payload !== null &&
      "success" in payload &&
      payload.success === true
    ) {
      return null;
    }
    return "missing_success";
  } catch {
    return "invalid_json";
  }
}

export async function POST(request: Request): Promise<Response> {
  const retryAfter = checkRateLimit(request);
  if (retryAfter !== null) {
    return jsonResponse(
      { error: "Too many proposals. Please try again later." },
      429,
      { "Retry-After": String(retryAfter) },
    );
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

  const workerUrl = getWorkerUrl();
  const workerSecret = process.env.PROPOSAL_WORKER_SECRET;
  if (!workerUrl || !workerSecret || workerSecret.length < secretMinLength) {
    return jsonResponse({ error: "Proposal service is unavailable." }, 503);
  }

  const serializedSubmission = JSON.stringify(submission);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const requestId = crypto.randomUUID();
  let workerResponse: Response;
  try {
    const signature = await signWorkerRequest(
      workerSecret,
      timestamp,
      requestId,
      serializedSubmission,
    );
    workerResponse = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Proposal-Timestamp": timestamp,
        "X-Proposal-Request-Id": requestId,
        "X-Proposal-Signature": signature,
      },
      body: serializedSubmission,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(workerTimeoutMs),
    });
  } catch {
    console.error("Proposal Worker request failed.");
    return jsonResponse({ error: "Unable to save your proposal. Please try again." }, 502);
  }

  let workerResponseFailure: WorkerResponseFailure | null = null;
  if (workerResponse.status !== 201) {
    workerResponseFailure = "non_201";
  } else if (
    workerResponse.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !==
    "application/json"
  ) {
    workerResponseFailure = "unexpected_content_type";
  } else {
    workerResponseFailure = await readWorkerResponse(workerResponse);
  }

  if (workerResponseFailure !== null) {
    console.error(
      JSON.stringify({
        event: "proposal_worker_response_rejected",
        reason: workerResponseFailure,
        status: workerResponse.status,
        requestId,
      }),
    );
    return jsonResponse({ error: "Unable to save your proposal. Please try again." }, 502);
  }

  return jsonResponse({ success: true }, 201);
}
