import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import css from "rollup-plugin-css-only";
import preprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import postcssReplace from "postcss-replace";

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        },
      );

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
    typescript({ sourceMap: true }),
    svelte({
      include: /\.svelte$/,
      exclude: /(App)\.svelte/,
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
      // dedupe: ["svelte"],
    }),

    serve(),
    livereload("playground/public"),
  ],
  watch: {
    clearScreen: false,
  },
};
