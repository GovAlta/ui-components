<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { getContext, ContextStore } from '../../common/context-store';
  import { onMount } from "svelte";
  import { BIND } from "./types";

  // public
  export let name: string = "";
  export let value: string = "";
  export let label: string = "";

  // private
  let ctx: ContextStore;

  onMount(() => {
    const maxAttempts = 10;
    let attempts = 0; 
    const fn = setInterval(() => {
      if (name && value) {
        ctx = getContext(name);
        if (!ctx) {
          return;
        }
        ctx.notify({
          type: BIND,
          name,
          label,
          value,
        });
        clearInterval(fn);
      }
      if (attempts > maxAttempts) {
        console.error("goa-dropdown-item: missing the required `name` attribute. It must match the parent's name attribute")
        clearInterval(fn);
      }
    }, 10);
  })

</script>
