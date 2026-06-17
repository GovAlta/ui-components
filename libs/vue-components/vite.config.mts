/// <reference types='vitest' />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import * as path from "path";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/libs/vue-components",

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith("goa-"),
        },
      },
    }),
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
      aliasesExclude: [/^@abgov\/ui-components-common$/],
    }),
  ],

  resolve: {
    extensions: [".mjs", ".js", ".ts", ".vue", ".json"],
  },

  build: {
    outDir: "../../dist/libs/vue-components",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: false,
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: { index: "src/index.ts" },
      name: "vue-components",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/libs/vue-components",
      provider: "v8",
    },
  },
});
