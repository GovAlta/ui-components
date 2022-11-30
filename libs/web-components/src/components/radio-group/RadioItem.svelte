<svelte:options tag="goa-radio-item" />

<script lang="ts">
  import { tick } from "svelte";

  import { getContext, ContextStore } from "../../common/context-store";

  export let value: string;
  export let label: string;
  export let name: string;

  let ctx: ContextStore;

  let isBound = false;
  $: {
    (async () => {
      await tick();
      if (!isBound) {
        isBound = true;
        ctx = getContext(name);
        ctx.notify({ type: "bind", value, label });
      }
    })();
  }
</script>
