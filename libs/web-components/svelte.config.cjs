const sveltePreprocess = require("svelte-preprocess");
const postcssGlobalData = require("@csstools/postcss-global-data");
const autoprefixer = require("autoprefixer");
const postcssCustomMedia = require("postcss-custom-media");
const postcssReplace = require("postcss-replace");

module.exports = {
  settings: {
    "svelte3/compiler-options": {
      generate: false,
      customElement: true,
    },
  },
  compilerOptions: {
    customElement: true,
  },
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [
        postcssGlobalData({
          files: ["libs/web-components/src/assets/css/breakpoints.css"],
        }),
        postcssGlobalData({
          files: ["./src/assets/css/breakpoints.css"],
        }),
        postcssReplace({
          pattern: /\(--container-mobile\)/g,
          data: {
            replaceAll: "(max-width: 623px)"
          },
        }),
        postcssReplace({
          pattern: /\(--container-not-mobile\)/g,
          data: {
            replaceAll: "(min-width: 624px)",
          }
        }),
        postcssReplace({
          pattern: /\(--container-tablet\)/,
          data: {
            replaceAll: "(min-width: 624px) and (max-width: 1023px)",
          }
        }),
        postcssReplace({
          pattern: /\(--container-not-tablet\)/,
          data: {
            replaceAll: "(max-width: 623px) or (min-width: 1024px)",
          }
        }),
        postcssReplace({
          pattern: /\(--container-desktop\)/,
          data: {
            replaceAll: "(min-width: 1024px)",
          }
        }),
        postcssReplace({
          pattern: /\(--container-not-desktop\)/,
          data: {
            replaceAll: "(max-width: 1023px)",
          }
        }),
        postcssCustomMedia(),
        autoprefixer(),
      ],
    },
  }),
  plugins: [
  ],
};


