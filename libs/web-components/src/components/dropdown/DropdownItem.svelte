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

  // Hooks
  onMount(async () => {
    if (!name) {
      console.error("goa-dropdown-item: missing the required `name` attribute. It must match the parent's name attribute")
      return;
    }

    ctx = await getContext(name);
    ctx.notify({
      type: BIND,
      name,
      label,
      value,
    });
  });

</script>
