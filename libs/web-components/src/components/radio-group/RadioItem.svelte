<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { onMount } from "svelte";
  import { getContext, ContextStore } from '../../common/context-store';
  import { BIND } from "./types";

  export let value: string;
  export let label: string;
  export let name: string;

  let ctx: ContextStore;

  onMount(async () => {
    if (!name) {
      console.error("goa-radio-item: missing the required `name` attribute. It must match the parent's name attribute.")
      return;
    }

    ctx = await getContext(name);
    ctx.notify({
      type: BIND,
      value,
      label,
    });
  });
</script>
