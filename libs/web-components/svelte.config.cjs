const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  compilerOptions: {
    customElement: true
  },
  preprocess: sveltePreprocess(),
};
