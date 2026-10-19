import { bindings, defineConfig, exports } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "cedar-vertex-lead-submission",
		compatibilityDate: "2026-10-19",
		entrypoint,
		exports: {
			LeadReplayGuard: exports.durableObject({ storage: "sqlite" }),
		},
		env: {
			DB: bindings.d1({
				id: "4c43d48a-f2f2-4ce3-9807-96c9e5f76814",
				name: "cedar-vertex-leads",
				dev: { remote: false },
			}),
			LEAD_REPLAY_GUARD: bindings.durableObject({
				worker: "cedar-vertex-lead-submission",
				exportName: "LeadReplayGuard",
			}),
			PROPOSAL_SHARED_SECRET: bindings.secret(),
		},
		observability: {
			enabled: true,
			logs: { enabled: true, headSamplingRate: 0.1 },
			traces: { enabled: false },
		},
	},
});
