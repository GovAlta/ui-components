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
  export let showSelectAll: string = "false";
  export let selectAllText: string = "Select All";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private
  let _rootEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _selectAllEl: HTMLElement;
  let _selectedValues: string[] = [];
  let _error: boolean;
  let _prevError: boolean;
  type ChildRecord = { el: HTMLElement; name: string };
  let _childRecords: ChildRecord[] = [];
  let _allCheckboxValues: string[] = [];
  let _allSelected = false;
  let _someSelected = false;
  let _suppressChildChange = false;

  function getHostCheckboxes(): HTMLElement[] {
    if (!_slotEl) return [];
    const slotEl = _slotEl.querySelector("slot") as HTMLSlotElement | null;
    const assigned = (slotEl?.assignedElements() || []) as Element[];
    return assigned
      .map((el) => el.querySelector("goa-checkbox") as HTMLElement | null)
      .filter(
        (el): el is HTMLElement =>
          !!el && (!_selectAllEl || el !== _selectAllEl),
      );
  }

  // Function to ensure _allCheckboxValues is populated
  function ensureAllCheckboxValues() {
    if (_allCheckboxValues.length === 0 && _slotEl) {
      const slotEl = _slotEl.querySelector("slot") as HTMLSlotElement | null;
      const assigned = (slotEl?.assignedElements() || []) as Element[];
      const hosts = assigned
        .map((el) => el.querySelector("goa-checkbox"))
        .filter(
          (h): h is HTMLElement => !!h && (!_selectAllEl || h !== _selectAllEl),
        );
      const names = hosts
        .map((h) => h.getAttribute("name") || "")
        .filter(Boolean);
      if (names.length) {
        _allCheckboxValues = Array.from(new Set(names));
      }
    }
  }

  // Binding
  $: isDisabled = toBoolean(disabled);
  $: showSelectAllCheckbox = toBoolean(showSelectAll);
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
    _selectedValues = value
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];
  }

  // Select All state - ensure we have values before calculating
  $: {
    ensureAllCheckboxValues();
    const total = _allCheckboxValues.length;
    const selectedCount = _selectedValues.filter((v) =>
      _allCheckboxValues.includes(v),
    ).length;
    _allSelected = total > 0 && selectedCount === total;
    _someSelected = selectedCount > 0 && selectedCount < total;
  }

  onMount(() => {
    addRelayListener();
    addSlotEventListeners();
    sendMountedMessage();

    // Initial sync for any already-mounted children
    setTimeout(() => {
      ensureAllCheckboxValues();
      updateChildCheckboxesState();
    }, 0);
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
    value =
      detail.value !== undefined && detail.value !== null
        ? String(detail.value)
        : "";
    updateChildCheckboxesState();
    dispatch(
      _rootEl,
      "_change",
      {
        name,
        value,
        selectedValues: _selectedValues,
      },
      { bubbles: true },
    );
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
    // detail.el is the child's internal root node (message endpoint)
    const host = (detail.el.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    if (!host) return;
    // Only children within this list's subtree
    const inThisList = host.closest("goa-checkbox-list") === _rootEl;
    if (!inThisList) return;
    // Exclude the Select All checkbox host
    if (_selectAllEl && host === _selectAllEl) return;

    const existing = _childRecords.find(
      (r) => r.el === detail.el || r.name === detail.name,
    );
    if (!existing) {
      _childRecords = [..._childRecords, { el: detail.el, name: detail.name }];
      // de-duplicate and refresh values
      _allCheckboxValues = Array.from(
        new Set(_childRecords.map((r) => r.name)),
      );
      updateChildCheckboxState(detail.el, detail.name);
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

      // Ignore events from the Select All checkbox; it has its own handler
      if (_selectAllEl) {
        const path = (customEvent as any).composedPath?.() || [];
        if (path.includes(_selectAllEl)) {
          return;
        }
        if (detail?.name && detail.name === _selectAllEl.getAttribute("name")) {
          return;
        }
      }

      // Ignore programmatic updates during batch operations
      if (_suppressChildChange) return;

      if (detail && detail.value !== undefined) {
        handleChildCheckboxChange(detail);
      }
    });

    // Children report themselves via FormFieldMount; no DOM observer needed
  }

  function handleChildCheckboxChange(detail: any) {
    const checkboxName = detail.name;
    // Ignore select-all events defensively
    if (_selectAllEl && checkboxName === _selectAllEl.getAttribute("name")) {
      return;
    }

    // Ensure we have the current list of values before processing
    ensureAllCheckboxValues();

    // Support both user interaction (checked boolean) and programmatic relay (value string)
    const isChecked =
      typeof detail.checked === "boolean" ? detail.checked : !!detail.value;

    // For checkbox list, we should use the name as the value identifier
    // since the checkbox component has issues with value handling
    const checkboxValue = checkboxName;

    // console.debug("Child checkbox change:", { detail, checkboxValue, isChecked, checkboxName });

    let newSelectedValues = [..._selectedValues];

    if (isChecked) {
      if (!newSelectedValues.includes(checkboxValue)) {
        newSelectedValues.push(checkboxValue);
      }
    } else {
      newSelectedValues = newSelectedValues.filter((v) => v !== checkboxValue);
    }

    const newValue = newSelectedValues.join(",");
    value = newValue;
    _selectedValues = newSelectedValues;

    dispatch(
      _rootEl,
      "_change",
      {
        name,
        value: newValue,
        selectedValues: newSelectedValues,
      },
      { bubbles: true },
    );
  }

  function updateChildCheckboxesState() {
    _suppressChildChange = true;
    // Always update mounted children via relay
    if (_childRecords.length > 0) {
      for (const rec of _childRecords) {
        updateChildCheckboxState(rec.el, rec.name);
      }
    }

    // Also update host attributes (shim) so UI is immediately in sync
    updateHostCheckboxesState();
    _suppressChildChange = false;
  }

  // Shim: ensure host elements reflect the current selection/disabled state
  function updateHostCheckboxesState() {
    const hosts = getHostCheckboxes();
    hosts.forEach((host) => {
      const name = host.getAttribute("name") || "";
      const shouldBeChecked = _selectedValues.includes(name);
      host.setAttribute("checked", shouldBeChecked ? "true" : "false");
      if (isDisabled) {
        host.setAttribute("disabled", "true");
      } else {
        host.removeAttribute("disabled");
      }
    });
  }

  function updateChildCheckboxState(childEl: HTMLElement, childName?: string) {
    const name =
      childName || _childRecords.find((r) => r.el === childEl)?.name || "";
    if (name) {
      const shouldBeChecked = _selectedValues.includes(name);
      // Programmatic update via relay to the child's internal endpoint
      relay<FieldsetSetValueRelayDetail>(childEl, FieldsetSetValueMsg, {
        name,
        value: shouldBeChecked ? "checked" : "",
      });
    }

    // Apply disabled state on the host custom element
    const host = (childEl.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    if (host) {
      if (isDisabled) {
        host.setAttribute("disabled", "true");
      } else {
        host.removeAttribute("disabled");
      }
    }
  }

  function updateChildCheckboxesError() {
    for (const rec of _childRecords) {
      if (_error) {
        relay(rec.el, FieldsetSetErrorMsg, { error: "true" });
      } else {
        relay(rec.el, FieldsetResetErrorsMsg);
      }
    }
  }

  function handleSelectAllChange(e: CustomEvent) {
    const isChecked = e.detail.checked;

    // Ensure we have a current list of item names
    ensureAllCheckboxValues();

    if (isChecked) {
      // Select all checkboxes
      _selectedValues = [..._allCheckboxValues];
    } else {
      // Deselect all checkboxes
      _selectedValues = [];
    }

    const newValue = _selectedValues.join(",");
    value = newValue;

    // Update all child checkboxes (suppressed to avoid event echo)
    updateChildCheckboxesState();

    // Dispatch change event
    dispatch(
      _rootEl,
      "_change",
      {
        name,
        value: newValue,
        selectedValues: _selectedValues,
      },
      { bubbles: true },
    );
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
    <div
      class="description"
      id={`${name}_description`}
      data-testid="description"
    >
      <slot name="description" />
      {description}
    </div>
  {/if}

  <div
    bind:this={_slotEl}
    class="checkbox-container"
    class:horizontal={isHorizontal}
  >
    {#if showSelectAllCheckbox}
      <goa-checkbox
        bind:this={_selectAllEl}
        name={`${name}_select_all`}
        text={selectAllText}
        checked={_allSelected ? "true" : "false"}
        indeterminate={_someSelected ? "true" : "false"}
        on:_change={handleSelectAllChange}
      />
    {/if}
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
