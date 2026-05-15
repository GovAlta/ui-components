/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../../node_modules/.vite/playground/react",

  server: {
    port: 4201,
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

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../../dist/apps/prs/react",
    reportCompressedSize: true,
    minify: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  define: {
    "import.meta.vitest": undefined,
  },
});
