<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { tick } from "svelte";

  import { getContext, ContextStore } from "../../common/context-store";

  // public
  export let name: string = "";
  export let value: string = "";
  export let label: string = "";

  // private
  let ctx: ContextStore;

  let isBound = false;
  $: {
    (async () => {
      await tick();
      if (!isBound) {
        isBound = true;
        ctx = getContext(name);
        ctx.notify({ type: "bind", name, label, value });
      }
    })();
  }
</script>
