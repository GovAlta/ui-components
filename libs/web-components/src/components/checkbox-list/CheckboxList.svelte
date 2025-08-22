<svelte:options customElement="goa-checkbox-list" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { receive, relay, toBoolean } from "../../common/utils";
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
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let description: string = "";
  export let maxwidth: string = "none";
  // New lowercase attributes (preferred)
  export let showselectall: string | undefined = undefined;
  export let selectalltext: string | undefined = undefined;
  // New selection prop (preferred) - accepts stringified JSON array or array via property
  export let selectedvalues: string | string[] | undefined = undefined;

  // Deprecated camelCase attributes (kept for backward compatibility)
  export let showSelectAll: string | undefined = undefined;
  export let selectAllText: string | undefined = undefined;
  // Deprecated selection camelCase prop (property only)
  export let selectedValues: string[] | undefined = undefined;

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // Private state
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
  let _isInitialized = false;

  function syncAllCheckboxValues() {
    try {
      // Only use child record list - no DOM scanning fallback
      const newValues = Array.from(new Set(_childRecords.map((r) => r.name)));
      if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
        _allCheckboxValues = newValues;
      }
    } catch (error) {
      console.error("Error syncing checkbox values:", error);
    }
  }

  // Reactive bindings
  $: isDisabled = toBoolean(disabled);
  // Canonicalized props: prefer lowercase attributes, fallback to deprecated ones, then defaults
  $: _showSelectAll = showselectall ?? showSelectAll ?? "false";
  $: _selectAllText = selectalltext ?? selectAllText ?? "Select All";
  $: showSelectAllCheckbox = toBoolean(_showSelectAll);
  $: {
    _error = toBoolean(error);
    if (_error !== _prevError) {
      try {
        _rootEl?.dispatchEvent(
          new CustomEvent("error::change", {
            detail: { isError: _error },
            bubbles: true,
            composed: true,
          }),
        );
        _prevError = _error;
        updateChildCheckboxesError();
      } catch (error) {
        console.error("Error dispatching error change:", error);
      }
    }
  }

  // When the disabled state changes on the list, sync it to all child checkboxes
  $: if (_isInitialized && (isDisabled || !isDisabled)) {
    // reference isDisabled in the condition to make this block reactive on its changes
    updateChildCheckboxesState();
  }

  // Helper to coerce incoming selection to an array
  function coerceSelectedValues(input: unknown): string[] {
    try {
      if (Array.isArray(input))
        return input.filter((v) => typeof v === "string") as string[];
      if (typeof input === "string") {
        const s = input.trim();
        if (!s) return [];
        // Expect JSON array string; ignore legacy comma-separated strings
        try {
          const parsed = JSON.parse(s);
          return Array.isArray(parsed)
            ? (parsed as string[]).filter((v) => typeof v === "string")
            : [];
        } catch (_) {
          return [];
        }
      }
    } catch (error) {
      console.error("Error coercing selected values:", error);
    }
    return [];
  }

  // Consolidated reactive block: parse selected values and compute aggregate selection state
  $: {
    let parseError = false;
    try {
      const source = selectedvalues ?? selectedValues;
      _selectedValues = coerceSelectedValues(source);
    } catch (error) {
      parseError = true;
      console.error("Error parsing initial selected values:", error);
      _selectedValues = [];
    }

    if (_isInitialized) {
      // Keep checkbox value inventory current before computing aggregate state
      try {
        syncAllCheckboxValues();
      } catch (error) {
        if (!parseError) console.error("Error syncing checkbox values:", error);
      }

      const total = _allCheckboxValues.length;
      const selectedCount = _selectedValues.filter((v) =>
        _allCheckboxValues.includes(v),
      ).length;
      _allSelected = total > 0 && selectedCount === total;
      _someSelected = selectedCount > 0 && selectedCount < total;

      if (_selectAllEl) {
        try {
          _selectAllEl.setAttribute("checked", _allSelected ? "true" : "false");
          _selectAllEl.setAttribute(
            "indeterminate",
            _someSelected ? "true" : "false",
          );
        } catch (error) {
          console.error("Error updating select all checkbox:", error);
        }
      }
    }
  }

  onMount(() => {
    try {
      addRelayListener();
      addSlotEventListeners();
      sendMountedMessage();

      _observer = new MutationObserver(() => {
        try {
          syncAllCheckboxValues();
          updateChildCheckboxesState();
        } catch (error) {
          console.error("Error in mutation observer:", error);
        }
      });

      if (_slotEl) {
        _observer.observe(_slotEl, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["name", "value"],
        });
      }

      // Initialize after a tick to ensure DOM is ready
      setTimeout(() => {
        _isInitialized = true;
        syncAllCheckboxValues();
        updateChildCheckboxesState();
      }, 0);
    } catch (error) {
      console.error("Error during checkbox list mount:", error);
    }

    return () => {
      try {
        if (_observer) {
          _observer.disconnect();
          _observer = null;
        }
      } catch (error) {
        console.error("Error during checkbox list cleanup:", error);
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
    // Accept array (preferred) or stringified JSON array; ignore legacy comma-separated strings
    _selectedValues = coerceSelectedValues(
      detail.value as unknown as string[] | string,
    );
    updateChildCheckboxesState();
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: { name, selectedValues: _selectedValues },
        bubbles: true,
        composed: true,
      }),
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
    if (!_slotEl) {
      console.warn("no slot found");
      return;
    }

    _slotEl.addEventListener("_change", (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      e.stopPropagation();

      if (_suppressChildChange) return;

      // Skip select all checkbox events
      if (_selectAllEl) {
        const path = (customEvent as any).composedPath?.() || [];
        if (path.includes(_selectAllEl)) return;
        if (detail?.name === _selectAllEl.getAttribute("name")) return;
      }

      if (detail && detail.value !== undefined) {
        handleChildCheckboxChange(detail);
      }
    });
  }

  function handleChildCheckboxChange(detail: any) {
    try {
      const checkboxName = detail.name;
      if (_selectAllEl && checkboxName === _selectAllEl.getAttribute("name"))
        return;

      //const isChecked = typeof detail.checked === "boolean" ? detail.checked : !!detail.value;
      const isChecked = detail.checked;
      let newSelectedValues = [..._selectedValues];

      if (isChecked) {
        if (!newSelectedValues.includes(checkboxName))
          newSelectedValues.push(checkboxName);
      } else {
        newSelectedValues = newSelectedValues.filter((v) => v !== checkboxName);
      }

      _selectedValues = newSelectedValues;

      _rootEl?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name, selectedValues: newSelectedValues },
          bubbles: true,
          composed: true,
        }),
      );
    } catch (error) {
      console.error("Error handling child checkbox change:", error);
    }
  }

  function updateChildCheckboxesState() {
    _suppressChildChange = true;
    // Only update child records - no host checkbox scanning
    for (const rec of _childRecords) {
      updateChildCheckboxState(rec.el, rec.name);
    }
    _suppressChildChange = false;
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
      if (isDisabled) host.setAttribute("disabled", "true");
      else host.removeAttribute("disabled");
    }
  }

  function updateChildCheckboxesError() {
    for (const rec of _childRecords) {
      if (_error) relay(rec.el, FieldsetSetErrorMsg, { error: "true" });
      else relay(rec.el, FieldsetResetErrorsMsg);
    }
  }

  function handleSelectAllChange(e: CustomEvent) {
    const isChecked = e.detail.checked;
    syncAllCheckboxValues();
    // Removed DOM scanning fallback - relies purely on child records
    _selectedValues = isChecked ? [..._allCheckboxValues] : [];
    updateChildCheckboxesState();
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: { name, selectedValues: _selectedValues },
        bubbles: true,
        composed: true,
      }),
    );
  }

  function onFocus() {
    _rootEl?.dispatchEvent(
      new CustomEvent("help-text::announce", {
        bubbles: true,
        composed: true,
      }),
    );
  }
</script>

<!-- View -->
<div
  bind:this={_rootEl}
  class="root"
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

  <div bind:this={_slotEl} class="checkbox-container">
    {#if showSelectAllCheckbox}
      <goa-checkbox
        bind:this={_selectAllEl}
        name={`${name}_select_all`}
        text={_selectAllText}
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
</style>
