/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  base: "/",
  cacheDir: "../../../node_modules/.vite/playground/react-public-form",

  // Vite's default appType "spa" already serves index.html for unknown paths,
  // which is what a one-URL-per-question form needs on a hard refresh or deep link.
  server: {
    port: 4203,
    host: "0.0.0.0",
  },

  preview: {
    port: 4303,
    host: "localhost",
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: "../../../dist/apps/prs/react-public-form",
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
