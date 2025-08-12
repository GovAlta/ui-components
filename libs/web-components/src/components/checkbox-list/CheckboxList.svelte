<svelte:options customElement="goa-checkbox-list" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { dispatch, receive, relay, toBoolean } from "../../common/utils";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountRelayDetail,
    FormFieldMountMsg,
    FieldsetResetFieldsMsg,
    FieldsetErrorRelayDetail,
  } from "../../types/relay-types";

  // Required
  export let name: string;

  // Optional values
  export let value: string = ""; // comma-separated values
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let description: string = "";
  export let orientation: string = "vertical"; // "vertical" | "horizontal"
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private
  let _rootEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _selectedValues: string[] = [];
  let _error: boolean;
  let _prevError: boolean;
  let _childCheckboxes: HTMLElement[] = [];

  // Binding
  $: isDisabled = toBoolean(disabled);
  $: {
    _error = toBoolean(error);
    if (_error !== _prevError) {
      dispatch(
        _rootEl,
        "error::change",
        { isError: _error },
        { bubbles: true },
      );
      _prevError = _error;

      // Propagate error state to child checkboxes
      updateChildCheckboxesError();
    }
  }
  $: isHorizontal = orientation === "horizontal";

  // Parse value into array
  $: {
    _selectedValues = value ? value.split(",").map(v => v.trim()).filter(Boolean) : [];
  }

  onMount(() => {
    addRelayListener();
    addSlotEventListeners();
    sendMountedMessage();

    // Initial scan for existing checkboxes
    scanForChildCheckboxes();
    updateChildCheckboxesState();
  });

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: "" });
          break;
        case FormFieldMountMsg:
          onChildCheckboxMount(data as FormFieldMountRelayDetail);
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    value = detail.value || "";
    updateChildCheckboxesState();
    dispatch(_rootEl, "_change", {
      name,
      value,
      selectedValues: _selectedValues
    }, { bubbles: true });
  }

  function sendMountedMessage() {
    if (!name) return;

    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onChildCheckboxMount(detail: FormFieldMountRelayDetail) {
    // Only handle direct child checkboxes (not nested ones)
    if (detail.el.parentElement === _slotEl || detail.el.closest('goa-checkboxlist') === _rootEl) {
      if (!_childCheckboxes.includes(detail.el)) {
        _childCheckboxes = [..._childCheckboxes, detail.el];
        updateChildCheckboxState(detail.el);
      }
    }
  }

  function addSlotEventListeners() {
    if (!_slotEl) return;

    // Listen for checkbox changes from child components
    _slotEl.addEventListener("_change", (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;

      // Stop propagation to prevent bubbling to parent
      e.stopPropagation();

      if (detail && detail.value !== undefined) {
        handleChildCheckboxChange(detail);
      }
    });

    // Use MutationObserver to detect new checkboxes added dynamically
    const observer = new MutationObserver(() => {
      scanForChildCheckboxes();
      updateChildCheckboxesState();
    });

    observer.observe(_slotEl, {
      childList: true,
      subtree: true
    });
  }

  function scanForChildCheckboxes() {
    if (!_slotEl) return;

    const checkboxes = _slotEl.querySelectorAll('goa-checkbox');
    _childCheckboxes = Array.from(checkboxes) as HTMLElement[];
  }

  function handleChildCheckboxChange(detail: any) {
    const isChecked = detail.checked;
    const checkboxName = detail.name;

    // For checkbox list, we should use the name as the value identifier
    // since the checkbox component has issues with value handling
    const checkboxValue = checkboxName;

    console.log("Child checkbox change:", { detail, checkboxValue, isChecked, checkboxName });

    let newSelectedValues = [..._selectedValues];

    if (isChecked) {
      if (!newSelectedValues.includes(checkboxValue)) {
        newSelectedValues.push(checkboxValue);
      }
    } else {
      newSelectedValues = newSelectedValues.filter(v => v !== checkboxValue);
    }

    const newValue = newSelectedValues.join(",");
    value = newValue;
    _selectedValues = newSelectedValues;

    dispatch(_rootEl, "_change", {
      name,
      value: newValue,
      selectedValues: newSelectedValues
    }, { bubbles: true });
  }

  function updateChildCheckboxesState() {
    _childCheckboxes.forEach(checkbox => {
      updateChildCheckboxState(checkbox);
    });
  }

  function updateChildCheckboxState(checkbox: HTMLElement) {
    // Use the name attribute as the identifier for checkbox list items
    const checkboxValue = checkbox.getAttribute('name') || checkbox.getAttribute('value') || '';
    console.log("Updating checkbox state:", {
      element: checkbox,
      name: checkbox.getAttribute('name'),
      value: checkbox.getAttribute('value'),
      checkboxValue
    });

    if (checkboxValue) {
      const shouldBeChecked = _selectedValues.includes(checkboxValue);
      checkbox.setAttribute('checked', shouldBeChecked ? 'true' : 'false');
    }

    // Apply disabled state
    if (isDisabled) {
      checkbox.setAttribute('disabled', 'true');
    } else {
      checkbox.removeAttribute('disabled');
    }
  }

  function updateChildCheckboxesError() {
    _childCheckboxes.forEach(checkbox => {
      checkbox.setAttribute('error', _error ? 'true' : 'false');
    });
  }

  function onFocus() {
    dispatch(_rootEl, "help-text::announce", undefined, { bubbles: true });
  }
</script>

<!-- View -->
<div
  bind:this={_rootEl}
  class="root"
  class:horizontal={isHorizontal}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  role="group"
  aria-label={arialabel || name}
  aria-describedby={description ? `${name}_description` : null}
  data-testid={testid}
  on:focus={onFocus}
>
  {#if $$slots.description || description}
    <div class="description" id={`${name}_description`} data-testid="description">
      <slot name="description" />
      {description}
    </div>
  {/if}

  <div
    bind:this={_slotEl}
    class="checkbox-container"
    class:horizontal={isHorizontal}
  >
    <slot />
  </div>
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: block;
  }

  .root {
    display: block;
    width: 100%;
  }

  .description {
    font: var(--goa-checkbox-description-font-size);
    margin-bottom: var(--goa-space-s);
    color: var(--goa-checkbox-color-label);
  }

  .checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .checkbox-container.horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--goa-space-m);
  }

  /* Ensure child checkboxes have proper spacing in vertical layout */
  .checkbox-container:not(.horizontal) :global(goa-checkbox:not(:last-child)) {
    margin-bottom: var(--goa-space-xs);
  }

  /* Remove bottom margin from last checkbox in horizontal layout */
  .checkbox-container.horizontal :global(goa-checkbox) {
    margin-bottom: 0;
  }

  /* Responsive behavior for horizontal layout */
  @media (max-width: 768px) {
    .checkbox-container.horizontal {
      flex-direction: column;
      gap: 0;
    }

    .checkbox-container.horizontal :global(goa-checkbox:not(:last-child)) {
      margin-bottom: var(--goa-space-xs);
    }
  }
</style>