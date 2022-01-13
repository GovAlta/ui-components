import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
import preprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    format: "es", // es, iife, umd
    name: "app",
    file: "./build/bundle.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true}),
    svelte({
      // compile only *.wc.svelte files as web components
      include: /\.wc\.svelte$/,
      preprocess: preprocess({ sourceMap: true}),
      compilerOptions: {
        dev: true,
        customElement: true,
      },
    }),
    svelte({
      exclude: /\.wc\.svelte$/,
      compilerOptions: {
        // enable run-time checks when not in production
        dev: true,
      },
    }),
    css({
      include: "**/*.css",
      output: "bundle.css",
    }),
    resolve(),
    terser(),
    summary(),
  ],
};
