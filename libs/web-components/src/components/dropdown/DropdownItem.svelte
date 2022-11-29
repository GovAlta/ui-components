<svelte:options tag="goa-dropdown-item" />

<script lang="ts">
  import { getContext, ContextStore } from "../../common/context-store";

  // public
  export let name: string = "";
  export let value: string = "";
  export let label: string = "";

  // private
  let ctx: ContextStore;

  let isBound = false;
  $: {
    if (name && !isBound) {
      isBound = true;
      ctx = getContext(name);
      ctx.notify({ type: "bind", name, label, value });
    }
  }
</script>
