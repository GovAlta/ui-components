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
  export let testid: string = "";

  function closeDrawer() {
    open = false;

  }

  function openDrawer() {
    open = true;
  }
</script>

<button on:click={openDrawer} data-testid="open">Open</button>

<Drawer {open} {testid} {position}  {heading} {maxsize} on:_close={closeDrawer}>
  {content}
  <div slot="actions">{actions}</div>
</Drawer>
