import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
import preprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from 'rollup-plugin-css-only';

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    format: "es", // es, iife, umd
    // name: "app",
    file: "../../dist/libs/web-components/web-components.es.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true }),
    svelte({
      include: /\.svelte$/,
      exclude: /^(\.test)\.svelte$/,
      preprocess: preprocess({ sourceMap: true }),
      settings: {
        'svelte3/compiler-options': {
          generate: false,
          customElement: true
        },
      },
      compilerOptions: {
        customElement: true,
      },
    }),
		css({output: 'index.css' }),
    resolve(),
    terser(),
    summary(),
  ],
  watch: {
    clearScreen: true,
    include: ["src/**/*.ts", "src/**/*.svelte"],
  },
};
