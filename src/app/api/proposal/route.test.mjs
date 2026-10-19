import assert from "node:assert/strict";
import { test } from "node:test";
import { POST } from "./route.ts";

const testSecret = crypto.randomUUID().repeat(2);
const submission = {
  name: "Local Test",
  email: "local-test@example.com",
  company: "Local Test Company",
  projectType: "Website",
  description: "Local-only test request",
  budget: "",
  timeline: "",
  idempotencyKey: "6a805ea4-d315-4924-86ea-4e4a98de39dd",
};

function setTestEnvironment() {
  process.env.PROPOSAL_WORKER_URL = "https://worker.example/submit";
  process.env.PROPOSAL_WORKER_SECRET = testSecret;
  process.env.NODE_ENV = "test";
}

function restoreEnvironment(originals) {
  for (const [key, value] of Object.entries(originals)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function createRequest(ip) {
  return new Request("https://cedarvertex.test/api/proposal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": `${ip}, 192.0.2.1`,
    },
    body: JSON.stringify(submission),
  });
}

test("signs request and idempotency identifiers and rejects redirects", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  let capturedUrl;
  let capturedInit;

  setTestEnvironment();
  globalThis.fetch = async (input, init) => {
    capturedUrl = input;
    capturedInit = init;
    return Response.json({ success: true }, { status: 201 });
  };

  try {
    const response = await POST(createRequest("198.51.100.41"));
    assert.equal(response.status, 201);
    assert.equal(String(capturedUrl), "https://worker.example/submit");
    assert.equal(capturedInit.redirect, "error");
    assert.equal(capturedInit.method, "POST");

    const headers = new Headers(capturedInit.headers);
    const timestamp = headers.get("x-proposal-timestamp");
    const requestId = headers.get("x-proposal-request-id");
    const signature = headers.get("x-proposal-signature");
    assert.match(timestamp ?? "", /^\d{10}$/);
    assert.match(
      requestId ?? "",
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    assert.ok(signature);

    const serializedBody = JSON.stringify(submission);
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(testSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const signatureBytes = Uint8Array.from(
      atob(signature.replace(/-/g, "+").replace(/_/g, "/")),
      (character) => character.charCodeAt(0),
    );
    assert.equal(
      await crypto.subtle.verify(
        "HMAC",
        key,
        signatureBytes,
        new TextEncoder().encode(
          `${timestamp}.${requestId}.${serializedBody}`,
        ),
      ),
      true,
    );
    assert.equal(capturedInit.body, serializedBody);
    assert.equal(JSON.parse(capturedInit.body).idempotencyKey, submission.idempotencyKey);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("rejects malformed idempotency keys before forwarding", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  let forwardedRequests = 0;

  setTestEnvironment();
  globalThis.fetch = async () => {
    forwardedRequests += 1;
    return Response.json({ success: true }, { status: 201 });
  };

  try {
    const response = await POST(
      new Request("https://cedarvertex.test/api/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "198.51.100.43",
        },
        body: JSON.stringify({ ...submission, idempotencyKey: "invalid" }),
      }),
    );
    assert.equal(response.status, 422);
    assert.equal(forwardedRequests, 0);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("rejects invalid, unexpected, oversized, and non-JSON input before forwarding", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  let forwardedRequests = 0;

  setTestEnvironment();
  globalThis.fetch = async () => {
    forwardedRequests += 1;
    return Response.json({ success: true }, { status: 201 });
  };

  try {
    const cases = [
      {
        body: JSON.stringify({ ...submission, name: "" }),
        contentType: "application/json",
        ip: "198.51.100.51",
        expectedStatus: 422,
      },
      {
        body: JSON.stringify({ ...submission, email: "invalid" }),
        contentType: "application/json",
        ip: "198.51.100.52",
        expectedStatus: 422,
      },
      {
        body: JSON.stringify({ ...submission, name: 12 }),
        contentType: "application/json",
        ip: "198.51.100.53",
        expectedStatus: 422,
      },
      {
        body: JSON.stringify({ ...submission, extra: "field" }),
        contentType: "application/json",
        ip: "198.51.100.54",
        expectedStatus: 422,
      },
      {
        body: JSON.stringify({
          ...submission,
          description: "x".repeat(9 * 1024),
        }),
        contentType: "application/json",
        ip: "198.51.100.55",
        expectedStatus: 413,
      },
      {
        body: JSON.stringify(submission),
        contentType: "text/plain",
        ip: "198.51.100.56",
        expectedStatus: 415,
      },
    ];

    for (const { body, contentType, ip, expectedStatus } of cases) {
      const response = await POST(
        new Request("https://cedarvertex.test/api/proposal", {
          method: "POST",
          headers: {
            "Content-Type": contentType,
            "X-Forwarded-For": ip,
          },
          body,
        }),
      );
      assert.equal(response.status, expectedStatus);
    }
    assert.equal(forwardedRequests, 0);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("returns unavailable when forwarding configuration is missing", async () => {
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  setTestEnvironment();
  delete process.env.PROPOSAL_WORKER_URL;

  try {
    const response = await POST(createRequest("198.51.100.57"));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      error: "Proposal service is unavailable.",
    });
  } finally {
    restoreEnvironment(originals);
  }
});

test("preserves the submission key across retries with fresh replay identifiers", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  const forwarded = [];

  setTestEnvironment();
  globalThis.fetch = async (input, init) => {
    forwarded.push({ input, init });
    return Response.json({ success: true }, { status: 201 });
  };

  try {
    const first = await POST(createRequest("198.51.100.44"));
    const retry = await POST(createRequest("198.51.100.44"));

    assert.equal(first.status, 201);
    assert.equal(retry.status, 201);
    assert.equal(forwarded.length, 2);

    const firstBody = JSON.parse(forwarded[0].init.body);
    const retryBody = JSON.parse(forwarded[1].init.body);
    const firstHeaders = new Headers(forwarded[0].init.headers);
    const retryHeaders = new Headers(forwarded[1].init.headers);
    assert.equal(firstBody.idempotencyKey, retryBody.idempotencyKey);
    assert.notEqual(
      firstHeaders.get("x-proposal-request-id"),
      retryHeaders.get("x-proposal-request-id"),
    );
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("does not report success when the Worker does not confirm the save", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };

  setTestEnvironment();
  globalThis.fetch = async () =>
    Response.json({ error: "Conflict." }, { status: 409 });

  try {
    const response = await POST(createRequest("198.51.100.45"));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "Unable to save your proposal. Please try again.",
    });
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("returns a safe error when forwarding times out or fails", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };

  setTestEnvironment();
  globalThis.fetch = async () => {
    throw new DOMException("upstream timeout", "TimeoutError");
  };

  try {
    const response = await POST(createRequest("198.51.100.58"));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "Unable to save your proposal. Please try again.",
    });
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});

test("limits requests per client in the current process", async () => {
  const originalFetch = globalThis.fetch;
  const originals = {
    PROPOSAL_WORKER_URL: process.env.PROPOSAL_WORKER_URL,
    PROPOSAL_WORKER_SECRET: process.env.PROPOSAL_WORKER_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };
  let forwardedRequests = 0;

  setTestEnvironment();
  globalThis.fetch = async () => {
    forwardedRequests += 1;
    return Response.json({ success: true }, { status: 201 });
  };

  try {
    const results = [];
    for (let index = 0; index < 11; index += 1) {
      results.push(await POST(createRequest("198.51.100.42")));
    }

    assert.deepEqual(
      results.map((response) => response.status),
      [...Array(10).fill(201), 429],
    );
    assert.equal(forwardedRequests, 10);
    assert.ok(Number(results[10].headers.get("retry-after")) > 0);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnvironment(originals);
  }
});
