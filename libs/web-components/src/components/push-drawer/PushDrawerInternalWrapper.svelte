<script lang="ts">
  import PushDrawerInternal from "./PushDrawerInternal.svelte";

  export let testId: string = "";
  export let open: boolean = false;
  export let heading: string = "Test Heading";
  export let width: string = "999px";

  function closeDrawer() {
    open = false;
  }

  function openDrawer() {
    open = true;
  }
</script>

<button on:click={openDrawer} data-testid="openButton">Open</button>
<button on:click={closeDrawer} data-testid="closeButton">Close</button>

<PushDrawerInternal testid={testId} {open} {width} {heading}>
  <div slot="actions">
    <p>Action 1</p>
    <p>Action 2</p>
  </div>
  <slot />
</PushDrawerInternal>
