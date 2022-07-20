const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  settings: {
    'svelte3/compiler-options': {
      generate: false,
      customElement: true
    },
  },
  compilerOptions: {
    customElement: true
  },
  preprocess: sveltePreprocess(),
};
