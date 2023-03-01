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
  input: "playground/src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "playground/public/build/bundle.js",
  },
  plugins: [
    commonjs(),
    typescript({ sourceMap: true}),
    svelte({
      include: /\.svelte$/,
      exclude: /(App)\.svelte/,
      preprocess: preprocess({ sourceMap: true }),
      compilerOptions: {
        dev: true,
        customElement: true,
      },
    }),
    svelte({
      include: /App\.svelte$/,
      preprocess: preprocess({ sourceMap: true }),
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
    livereload("playground/public"),
  ],
  watch: {
    clearScreen: false,
  },
};

