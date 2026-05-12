<svelte:options
  customElement={{
    tag: "goa-dropdown-item",
  }}
/>

<script lang="ts" context="module">
  import { FilterOption } from "../../common/filtering";
  export type DropdownItemMountType = "append" | "prepend" | "reset";
  export type DropdownItemMountedRelayDetail = {
    el: HTMLElement;
    filter: string;
    value: string;
    label: string;
    hasSlotContent: boolean;
    mountType: DropdownItemMountType;
  };
  export type DropdownItemDestroyRelayDetail = {
    value: string;
  };
  export const DropdownItemMountedMsg = "dropdown-item:mounted";
  export const DropdownItemDestroyMsg = "dropdown-item:destroyed";

  export type Option = FilterOption & {
    mountType: DropdownItemMountType;
  };
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { receive, relay } from "../../common/utils";

  // Props

  /** Additional text used to match this item in typeahead search, alongside the label. Defaults to the slotted content's text. */
  export let filter: string = "";
  /** Display label for the dropdown item. */
  export let label: string = "";
  /** The value submitted when this item is selected. */
  export let value: string = "";
  /** Controls how the item is registered with the parent dropdown. */
  export let mount: DropdownItemMountType = "reset";

  let _rootEl: HTMLElement;
  let _parentEl: HTMLElement;

  onMount(() => {
    addMessageListener();

    const slotText = getSlotText();
    const hasSlotContent = slotText !== "" || hasSlottedElements();

    relay<DropdownItemMountedRelayDetail>(
      _rootEl,
      DropdownItemMountedMsg,
      {
        el: _rootEl,
        filter: filter || (hasSlotContent ? slotText : ""),
        value,
        label,
        hasSlotContent,
        mountType: mount,
      },
      { bubbles: true, timeout: 10 },
    );
  });

  // Use the slotted content's text as the default filter value. Separate text
  // nodes with spaces so words in adjacent elements do not run together.
  function getSlotText(): string {
    const parts: string[] = [];
    const collectText = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent ?? "").trim();
        if (text !== "") {
          parts.push(text);
        }
        return;
      }
      node.childNodes.forEach(collectText);
    };
    getSlottedNodes().forEach(collectText);
    return parts.join(" ").replace(/\s+/g, " ");
  }

  function hasSlottedElements(): boolean {
    return getSlottedNodes().some(
      (node) => node.nodeType === Node.ELEMENT_NODE,
    );
  }

  function getSlottedNodes(): Node[] {
    const slotEl = _rootEl.querySelector("slot");
    if (slotEl) {
      return slotEl.assignedNodes({ flatten: true });
    }
    // for unit tests only: without a shadow DOM slotted content is rendered
    // directly within the root element
    return Array.from(_rootEl.childNodes);
  }

  function addMessageListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case "dropdown:bind":
          _parentEl = (data as { el: HTMLElement }).el;
          break;
      }
    });
  }

  onDestroy(() => {
    relay<DropdownItemDestroyRelayDetail>(
      _parentEl,
      DropdownItemDestroyMsg,
      { value },
      { bubbles: true },
    );
  });
</script>

<span bind:this={_rootEl}>
  <slot />
</span>
