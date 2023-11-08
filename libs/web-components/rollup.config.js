import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
import preprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import autoprefixer from "autoprefixer";

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    file: "../../dist/libs/web-components/web-components.es.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true }),
    svelte({
      include: /\.svelte$/,
      exclude: /^(\.test)\.svelte$/,
      preprocess: preprocess({
        sourceMap: true,
        postcss: {
          plugins: [
            postcssReplace([
              {
                pattern: /\(--mobile\)/g,
                data: {
                  replaceAll: "(max-width: 623px)"
                },
              },
              {
                pattern: /\(--not-mobile\)/g,
                data: {
                  replaceAll: "(min-width: 624px)",
                }
              },
              {
                pattern: /\(--tablet\)/,
                data: {
                  replaceAll: "(min-width: 624px) and (max-width: 1023px)",
                }
              },
              {
                pattern: /\(--not-tablet\)/,
                data: {
                  replaceAll: "(max-width: 623px) or (min-width: 1024px)",
                }
              },
              {
                pattern: /\(--desktop\)/,
                data: {
                  replaceAll: "(min-width: 1024px)",
                }
              },
              {
                pattern: /\(--not-desktop\)/,
                data: {
                  replaceAll: "(max-width: 1023px)",
                }
              },
            ]),
            autoprefixer(),
          ],
        },
      }),
      settings: {
        "svelte3/compiler-options": {
          generate: false,
          customElement: true,
        },
      },
      compilerOptions: {
        customElement: true,
      },
    }),
    css({ output: "index.css" }),
    resolve(),
    terser(),
    summary(),
  ],
  watch: {
    clearScreen: true,
    include: ["src/**/*.ts", "src/**/*.svelte", "src/**/*.css"],
  },
};
