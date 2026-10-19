ALTER TABLE leads ADD COLUMN idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS leads_idempotency_key_unique
ON leads (idempotency_key);
