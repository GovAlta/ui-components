const sveltePreprocess = require("svelte-preprocess");
const postcssGlobalData = require("@csstools/postcss-global-data");
const autoprefixer = require("autoprefixer");
const postcssCustomMedia = require("postcss-custom-media");

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
        postcssCustomMedia(),
        autoprefixer(),
      ],
    },
  }),
};
