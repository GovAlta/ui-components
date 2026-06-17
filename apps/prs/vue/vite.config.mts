/// <reference types='vitest' />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  base: process.env.PREVIEW_BASE_VUE || "/",
  cacheDir: "../../../node_modules/.vite/playground/vue",

  server: {
    port: 4203,
    host: "0.0.0.0",
  },

  preview: {
    port: 4302,
    host: "localhost",
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("goa-"),
        },
      },
    }),
    nxViteTsPaths(),
  ],

  build: {
    outDir: "../../../dist/apps/prs/vue",
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
