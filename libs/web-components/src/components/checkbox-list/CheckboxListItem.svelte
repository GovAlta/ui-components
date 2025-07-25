<svelte:options customElement="goa-checkbox-list-item" />

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { relay } from "../../common/utils";
  import {
    CheckboxListItemMountedRelayDetail,
    CheckboxListItemDestroyRelayDetail,
    CheckboxListItemMountedMsg,
    CheckboxListItemDestroyMsg,
  } from "../../types/relay-types";

  // Props
  export let value: string;
  export let text: string = "";
  export let disabled: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";

  // Private
  let _rootEl: HTMLElement;
  let _parentEl: HTMLElement;
  let _finalText: string;

  onMount(async () => {
    // Wait for DOM to be ready
    await tick();

    // Get the display text - prioritize the text prop over slot content
    if (text) {
      _finalText = text;
    } else {
      // Try to get text from slot content
      const slotContent = _rootEl.textContent?.trim();
      _finalText = slotContent || value;
    }

    console.log("CheckboxListItem mounted:", { value, text, _finalText, disabled });

    // Send mounted message to parent
    sendMountedMessage();

    // Listen for binding message from parent
    _rootEl.addEventListener("checkbox-list:bind", onParentBind);
  });

  onDestroy(() => {
    // Notify parent that this item is being destroyed
    if (_parentEl) {
      relay<CheckboxListItemDestroyRelayDetail>(
        _parentEl,
        CheckboxListItemDestroyMsg,
        { value },
      );
    }
  });

  function sendMountedMessage() {
    const mountData = {
      value: value || "",
      text: _finalText || value || "",
      disabled: disabled === "true",
      el: _rootEl,
      mountType: "append" as const,
    };

    console.log("Sending mount message:", mountData);

    relay<CheckboxListItemMountedRelayDetail>(
      _rootEl,
      CheckboxListItemMountedMsg,
      mountData,
      { bubbles: true, timeout: 10 },
    );
  }

  function onParentBind(event: CustomEvent) {
    _parentEl = event.detail.el;
    console.log("CheckboxListItem bound to parent");
  }
</script>

<!-- This component is hidden as it only provides data to the parent -->
<div
  bind:this={_rootEl}
  style="display: none;"
  data-testid={testid}
  data-value={value}
  data-text={_finalText}
  data-disabled={disabled}
  data-aria-label={arialabel}
>
  <slot />
</div>