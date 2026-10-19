import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		cloudflare({
			persistState: {
				path: fileURLToPath(new URL("./.wrangler/state", import.meta.url)),
			},
		}),
	],
});
