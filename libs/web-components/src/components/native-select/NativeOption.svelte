<svelte:options tag="goa-option" />

<script lang="ts">
  import { tick } from "svelte";
  import { ContextStore, getContext } from "../../common/context-store";

  export let name: string;
  export let value: string;
  export let label: string = "";

  let _ctx: ContextStore;
  let _bound = false;
  $: {
    (async () => {
      await tick();
      if (name && !_bound) {
        _bound = true;
        _ctx = getContext(name);
        _ctx.notify({ type: "bind", name, value, label });
      }
    })();
  }
</script>
