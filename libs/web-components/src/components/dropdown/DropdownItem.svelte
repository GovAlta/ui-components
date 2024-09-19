<svelte:options
  customElement={{
    tag: "goa-dropdown-item",
  }}
/>

<script lang="ts" context="module">
  export type DropdownItemMountType = "append" | "prepend" | "reset";

  export type Option = {
    label: string;
    value: string;
    filter: string;
    mountType: DropdownItemMountType;
    parent: string;
  };
</script>

<script lang="ts">
  import { onMount, afterUpdate } from "svelte";

  // Props
  export let filter: string = "";
  export let label: string = "";
  export let value: string = "";
  export let mount: DropdownItemMountType = "append";
  export let parent: string = "";

  let _rootEl: HTMLElement;
  let _prevParent: string = "";
  let _isInitialMount: boolean = true;

  onMount(() => {
    setTimeout(() => {
      dispatchMounted(mount);
      _isInitialMount = false;
    }, 10);
  });

  afterUpdate(() => {
    if (!_isInitialMount && parent !== _prevParent) {
      _prevParent = parent;
      dispatchMounted("reset");
    }
  });

  function dispatchMounted(ddMountType: DropdownItemMountType) {
    _rootEl?.dispatchEvent(
      new CustomEvent<Option>("dropdown-item:mounted", {
        composed: true,
        bubbles: true,
        detail: {
          filter,
          value,
          label,
          mountType: ddMountType,
          parent: parent,
        },
      }),
    );
  }
</script>

<span id="{parent}-{value}" bind:this={_rootEl} />
