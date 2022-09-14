<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { getContext, ContextStore } from "../../common/context-store";

  export let value: string;
  export let label: string;
  export let name: string;

  let ctx: ContextStore;

  let isBound = false;
  $: {
    if (name && !isBound) {
      isBound = true;
      ctx = getContext(name);
      ctx.notify({ type: "bind", value, label });
    }
  }
</script>
