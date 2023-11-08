const sveltePreprocess = require("svelte-preprocess");
const autoprefixer = require("autoprefixer");
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
  plugins: [
  ],
};


