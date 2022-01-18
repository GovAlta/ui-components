import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";
import preprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "demo/src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "demo/public/build/bundle.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true}),
    svelte({
      // compile only *.wc.svelte files as web components
      include: /\.wc\.svelte$/,
      exclude: /App\.svelte/,
      preprocess: preprocess({ sourceMap: true }),
      compilerOptions: {
        dev: true,
        customElement: true,
      },
    }),
    svelte({
      include: /App\.svelte$/,
      compilerOptions: {
        dev: true,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),

    serve(),
    livereload("demo/public"),
  ],
  watch: {
    clearScreen: false,
  },
};
