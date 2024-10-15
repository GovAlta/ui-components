<svelte:options customElement="test-goa-drawer" />

<script lang="ts">
  import Drawer from "./Drawer.svelte";
  import { DrawerPosition, DrawerSize } from "../../common/types";

  export let open: boolean = false;
  export let position: DrawerPosition = undefined;
  export let heading: string = "";
  export let maxsize: DrawerSize = undefined;
  export let content: string = "";
  export let actions: string = "";

  function toggleDrawer() {
    open = !open;
  }
</script>

<button on:click={toggleDrawer} data-testid="open">Open</button>

<Drawer {open} {position} {heading} {maxsize}>
  {content}
  <div slot="actions">{actions}</div>
</Drawer>
