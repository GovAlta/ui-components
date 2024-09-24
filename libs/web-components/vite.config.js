/// <reference types='vitest' />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as path from "path";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";
import { postcssReplace } from "./utils/postcss-replace";

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/libs/web-components",

  css: {
    postcss: {
      plugins: [
        postcssReplace({
          pattern: /\(--tablet\)/g,
          replaceWith: "(min-width: 624px) and (max-width: 1023px)",
        }),
        postcssReplace({
          pattern: /\(--mobile\)/g,
          replaceWith: "(max-width: 623px)"
        }),
        postcssReplace({
          pattern: /\(--mobile\)/g,
          replaceWith: "(max-width: 623px)"
        }),
        postcssReplace({
          pattern: /\(--mobile\)/g,
          replaceWith: "(max-width: 623px)"
        }),
        postcssReplace({
          pattern: /\(--mobile\)/g,
          replaceWith: "(max-width: 623px)"
        }),
        postcssReplace({
          pattern: /\(--not-mobile\)/g,
          replaceWith: "(min-width: 624px)",
        }),
        postcssReplace({
          pattern: /\(--not-tablet\)/g,
          replaceWith: "(max-width: 623px) or (min-width: 1024px)",
        }),
        postcssReplace({
          pattern: /\(--desktop\)/g,
          replaceWith: "(min-width: 1024px)",
        }),
        postcssReplace({
          pattern: /\(--not-desktop\)/g,
          replaceWith: "(max-width: 1023px)",
        }),
        autoprefixer(),
      ]
    }
  },

  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsConfigFilePath: path.join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),
    svelte({
      include: /\.svelte$/,
      compilerOptions: {
        customElement: true,
      },
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: "../../dist/libs/web-components",
    sourcemap: true,
    minify: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "src/index.ts",
      name: "web-components",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) => {
          if (info.name === "style.css") {
            return "index.css";
          }
          return info.name;
        }
      },
      external: [],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/libs/web-components",
      provider: "v8",
    },
  },
}));
