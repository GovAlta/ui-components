import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
import preprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    format: "es", // es, iife, umd
    name: "app",
    file: "../../dist/libs/web-components/web-components.es.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true }),
    svelte({
      include: /\.svelte$/,
      exclude: /^(App|\.*test)\.svelte$/,
      preprocess: preprocess({ sourceMap: true }),
      compilerOptions: {
        dev: true,
        customElement: true,
      },
    }),
    svelte({
      include: /App\.svelte/,
      compilerOptions: {
        // enable run-time checks when not in production
        dev: true,
      },
    }),
    resolve(),
    // terser(),
    summary(),
  ],
  watch: {
    clearScreen: true,
    include: ["src/**/*.ts", "src/**/*.svelte"],
  },
};
