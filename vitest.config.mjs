import { defineConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
      include: /\.svelte$/,
      compilerOptions: {
        customElement: true,
      },
    }),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    exclude: ["**/node_modules", "playground", "libs/web-components/node_modules"],
    alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../coverage/<project-root>',
      provider: 'v8',
    },
  },
});
