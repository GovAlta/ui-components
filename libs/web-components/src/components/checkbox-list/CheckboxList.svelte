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
  let _observer: MutationObserver | null = null;

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

  // Improved synchronization function
  function syncAllCheckboxValues() {
    // Method 1: Use child records if available
    if (_childRecords.length > 0) {
      const newValues = Array.from(new Set(_childRecords.map((r) => r.name)));
      // Only update if values actually changed
      if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
        _allCheckboxValues = newValues;
      }
      return;
    }

    // Method 2: Fallback to DOM scanning
    const hosts = getHostCheckboxes();
    const names = hosts
      .map((h) => h.getAttribute("name") || "")
      .filter(Boolean);

    if (names.length) {
      const newValues = Array.from(new Set(names));
      if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
        _allCheckboxValues = newValues;
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

  // Select All state - with explicit synchronization
  $: {
    syncAllCheckboxValues();

    const total = _allCheckboxValues.length;
    const selectedCount = _selectedValues.filter((v) =>
      _allCheckboxValues.includes(v),
    ).length;

    _allSelected = total > 0 && selectedCount === total;
    _someSelected = selectedCount > 0 && selectedCount < total;

    // Critical fix: Explicitly update Select All element
    if (_selectAllEl) {
      _selectAllEl.setAttribute("checked", _allSelected ? "true" : "false");
      _selectAllEl.setAttribute(
        "indeterminate",
        _someSelected ? "true" : "false",
      );
    }
  }

  onMount(() => {
    addRelayListener();
    addSlotEventListeners();
    sendMountedMessage();

    // Add MutationObserver for dynamic content
    _observer = new MutationObserver(() => {
      syncAllCheckboxValues();
      updateChildCheckboxesState();
    });

    if (_slotEl) {
      _observer.observe(_slotEl, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["name", "value"],
      });
    }

    // Initial sync
    setTimeout(() => {
      syncAllCheckboxValues();
      updateChildCheckboxesState();
    }, 0);

    // Cleanup observer on destroy
    return () => {
      if (_observer) {
        _observer.disconnect();
        _observer = null;
      }
    };
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
    const host = (detail.el.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    if (!host) return;

    const inThisList = host.closest("goa-checkbox-list") === _rootEl;
    if (!inThisList) return;

    if (_selectAllEl && host === _selectAllEl) return;

    const existing = _childRecords.find(
      (r) => r.el === detail.el || r.name === detail.name,
    );

    if (!existing) {
      _childRecords = [..._childRecords, { el: detail.el, name: detail.name }];
      syncAllCheckboxValues();
      updateChildCheckboxState(detail.el, detail.name);
    }
  }

  function addSlotEventListeners() {
    if (!_slotEl) return;

    _slotEl.addEventListener("_change", (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      e.stopPropagation();

      if (_selectAllEl) {
        const path = (customEvent as any).composedPath?.() || [];
        if (path.includes(_selectAllEl)) return;
        if (detail?.name === _selectAllEl.getAttribute("name")) return;
      }

      if (_suppressChildChange) return;

      if (detail && detail.value !== undefined) {
        handleChildCheckboxChange(detail);
      }
    });
  }

  function handleChildCheckboxChange(detail: any) {
    const checkboxName = detail.name;
    if (_selectAllEl && checkboxName === _selectAllEl.getAttribute("name")) {
      return;
    }

    const isChecked =
      typeof detail.checked === "boolean" ? detail.checked : !!detail.value;

    let newSelectedValues = [..._selectedValues];

    if (isChecked) {
      if (!newSelectedValues.includes(checkboxName)) {
        newSelectedValues.push(checkboxName);
      }
    } else {
      newSelectedValues = newSelectedValues.filter((v) => v !== checkboxName);
    }

    value = newSelectedValues.join(",");
    _selectedValues = newSelectedValues;

    dispatch(
      _rootEl,
      "_change",
      {
        name,
        value: value,
        selectedValues: newSelectedValues,
      },
      { bubbles: true },
    );
  }

  function updateChildCheckboxesState() {
    _suppressChildChange = true;

    if (_childRecords.length > 0) {
      for (const rec of _childRecords) {
        updateChildCheckboxState(rec.el, rec.name);
      }
    }

    updateHostCheckboxesState();
    _suppressChildChange = false;
  }

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
      relay<FieldsetSetValueRelayDetail>(childEl, FieldsetSetValueMsg, {
        name,
        value: shouldBeChecked ? "checked" : "",
      });
    }

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
    syncAllCheckboxValues();

    _selectedValues = isChecked ? [..._allCheckboxValues] : [];
    value = _selectedValues.join(",");

    updateChildCheckboxesState();

    // Dispatch change event
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
