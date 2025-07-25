<svelte:options customElement="goa-checkbox-list-item" />

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { relay, receive } from "../../common/utils";
  import {
    CheckboxListItemMountedRelayDetail,
    CheckboxListItemDestroyRelayDetail,
    CheckboxListItemMountedMsg,
    CheckboxListItemDestroyMsg,
    CheckboxListItemSetValueMsg,
    CheckboxListItemSetErrorMsg,
    CheckboxListItemResetErrorsMsg,
    CheckboxListItemResetFieldsMsg,
    CheckboxListItemSetValueRelayDetail,
    CheckboxListItemSetErrorRelayDetail,
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
  let _error: boolean = false;

  onMount(async () => {
    // Wait for DOM to be ready
    await tick();

    // Get the display text - prioritize the text prop over slot content
    if (text) {
      _finalText = text;
    } else {
      const slotContent = _rootEl.textContent?.trim();
      _finalText = slotContent || value;
    }

    sendMountedMessage();
    _rootEl.addEventListener("checkbox-list:bind", onParentBind);
    addRelayListener();
  });

  onDestroy(() => {
    if (_parentEl) {
      relay<CheckboxListItemDestroyRelayDetail>(
        _parentEl,
        CheckboxListItemDestroyMsg,
        { value },
      );
    }
  });

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case CheckboxListItemSetValueMsg:
          onSetValue(data as CheckboxListItemSetValueRelayDetail);
          break;
        case CheckboxListItemSetErrorMsg:
          onSetError(data as CheckboxListItemSetErrorRelayDetail);
          break;
        case CheckboxListItemResetErrorsMsg:
          onResetErrors();
          break;
        case CheckboxListItemResetFieldsMsg:
          onResetFields();
          break;
      }
    });
  }

  function onSetValue(detail: CheckboxListItemSetValueRelayDetail) {
    const event = new CustomEvent("_checkboxListItemChange", {
      detail: { value: detail.value, checked: detail.checked },
      bubbles: true,
    });
    _rootEl.dispatchEvent(event);
  }

  function onSetError(detail: CheckboxListItemSetErrorRelayDetail) {
    _error = !!detail.error;
    const event = new CustomEvent("error::change", {
      detail: { isError: _error },
      bubbles: true,
    });
    _rootEl.dispatchEvent(event);
  }

  function onResetErrors() {
    _error = false;
    const event = new CustomEvent("error::change", {
      detail: { isError: _error },
      bubbles: true,
    });
    _rootEl.dispatchEvent(event);
  }

  function onResetFields() {
    const event = new CustomEvent("_checkboxListItemReset", {
      detail: { value },
      bubbles: true,
    });
    _rootEl.dispatchEvent(event);
  }

  function sendMountedMessage() {
    const mountData = {
      value: value || "",
      text: _finalText || value || "",
      disabled: disabled === "true",
      el: _rootEl,
      mountType: "append" as const,
    };

    relay<CheckboxListItemMountedRelayDetail>(
      _rootEl,
      CheckboxListItemMountedMsg,
      mountData,
      { bubbles: true, timeout: 10 },
    );
  }

  function onParentBind(event: CustomEvent) {
    _parentEl = event.detail.el;
  }
</script>

<!-- hidden as it only provides data to the parent -->
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
