import sveltePreprocess from "svelte-preprocess";

export default {
  compilerOptions: {
    customElement: true
  },
  preprocess: sveltePreprocess(),
};
