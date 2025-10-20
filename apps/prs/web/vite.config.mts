/// <reference types='vitest' />
import { defineConfig } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/prs-web",

  server: {
    port: 4202,
    host: "0.0.0.0",
    // Enable SPA fallback for client-side routing
    historyApiFallback: true,
  },

  preview: {
    port: 4300,
    host: "localhost",
    // Enable SPA fallback in preview mode too
    historyApiFallback: true,
  },

  plugins: [nxViteTsPaths(), svelte()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/prs-web",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
