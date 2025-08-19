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
  // child checkbox margin overrides (applied programmatically to slotted child checkboxes when present)
  export let mlchild: Spacing = null;
  export let mrchild: Spacing = null;
  export let mtchild: Spacing = null;
  export let mbchild: Spacing = null;

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

  function getHostCheckboxes(): HTMLElement[] {
    if (!_slotEl) return [];
    const slotEl = _slotEl.querySelector("slot") as HTMLSlotElement | null;
    const assigned = (slotEl?.assignedElements() || []) as Element[];
    return assigned
      .map((el) => {
        if (
          el instanceof HTMLElement &&
          el.tagName.toLowerCase() === "goa-checkbox"
        ) {
          return el as HTMLElement;
        }
        return el.querySelector("goa-checkbox") as HTMLElement | null;
      })
      .filter(
        (el): el is HTMLElement =>
          !!el && (!_selectAllEl || el !== _selectAllEl),
      );
  }

  function getHostIdentifier(host: HTMLElement): string {
    try {
      let id = host.getAttribute("name") || (host as any).name || "";
      if (!id) id = host.getAttribute("value") || (host as any).value || "";
      if (!id) id = host.getAttribute("text") || (host as any).text || "";
      return id || "";
    } catch (error) {
      console.error("Error getting host identifier:", error);
      return "";
    }
  }

  function syncAllCheckboxValues() {
    try {
      // Use child record list if populated (more reliable)
      if (_childRecords.length > 0) {
        const newValues = Array.from(new Set(_childRecords.map((r) => r.name)));
        if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
          _allCheckboxValues = newValues;
        }
        return;
      }

      // Fallback to DOM scanning
      const hosts = getHostCheckboxes();
      let identifiers = hosts.map((h) => getHostIdentifier(h)).filter(Boolean);

      if (!identifiers.length) {
        identifiers = hosts
          .map((h) => {
            try {
              return h.getAttribute("value") || (h as any).value || "";
            } catch {
              return "";
            }
          })
          .filter(Boolean);
      }

      if (identifiers.length) {
        const newValues = Array.from(new Set(identifiers));
        if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
          _allCheckboxValues = newValues;
        }
      }
    } catch (error) {
      console.error("Error syncing checkbox values:", error);
    }
  }

  // Reactive bindings
  $: isDisabled = toBoolean(disabled);
  $: showSelectAllCheckbox = toBoolean(showSelectAll);
  $: {
    _error = toBoolean(error);
    if (_error !== _prevError) {
      try {
        dispatch(
          _rootEl,
          "error::change",
          { isError: _error },
          { bubbles: true },
        );
        _prevError = _error;
        updateChildCheckboxesError();
      } catch (error) {
        console.error("Error dispatching error change:", error);
      }
    }
  }
  $: isHorizontal = orientation === "horizontal";
  // Apply child margins via setting margin attributes on each child checkbox (works with slotted Angular wrappers)
  $: if ((mlchild || mrchild || mtchild || mbchild) && !isHorizontal) {
    applyChildMargins();
  }
  // Consolidated reactive block: parse selected values and compute aggregate selection state
  $: {
    let parseError = false;
    try {
      _selectedValues = value
        ? value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : [];
    } catch (error) {
      parseError = true;
      console.error("Error parsing selected values:", error);
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
    value =
      detail.value !== undefined && detail.value !== null
        ? String(detail.value)
        : "";
    updateChildCheckboxesState();
    dispatch(
      _rootEl,
      "_change",
      { name, value, selectedValues: _selectedValues },
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
    try {
      _slotEl.addEventListener("_change", (e: Event) => {
        try {
          const customEvent = e as CustomEvent;
          const detail = customEvent.detail;
          e.stopPropagation();

          // Skip select all checkbox events
          if (_selectAllEl) {
            const path = (customEvent as any).composedPath?.() || [];
            if (path.includes(_selectAllEl)) return;
            if (detail?.name === _selectAllEl.getAttribute("name")) return;
          }

          if (_suppressChildChange) return;

          if (detail && detail.value !== undefined) {
            handleChildCheckboxChange(detail);
          }
        } catch (error) {
          console.error("Error handling child checkbox change:", error);
        }
      });
    } catch (error) {
      console.error("Error adding slot event listeners:", error);
    }
  }

  function handleChildCheckboxChange(detail: any) {
    try {
      const checkboxName = detail.name;
      if (_selectAllEl && checkboxName === _selectAllEl.getAttribute("name"))
        return;

      const isChecked =
        typeof detail.checked === "boolean" ? detail.checked : !!detail.value;
      let newSelectedValues = [..._selectedValues];

      if (isChecked) {
        if (!newSelectedValues.includes(checkboxName))
          newSelectedValues.push(checkboxName);
      } else {
        newSelectedValues = newSelectedValues.filter((v) => v !== checkboxName);
      }

      value = newSelectedValues.join(",");
      _selectedValues = newSelectedValues;

      dispatch(
        _rootEl,
        "_change",
        { name, value, selectedValues: newSelectedValues },
        { bubbles: true },
      );
    } catch (error) {
      console.error("Error handling child checkbox change:", error);
    }
  }

  function updateChildCheckboxesState() {
    _suppressChildChange = true;
    if (_childRecords.length > 0) {
      for (const rec of _childRecords)
        updateChildCheckboxState(rec.el, rec.name);
    }
    updateHostCheckboxesState();
    _suppressChildChange = false;
  }

  function updateHostCheckboxesState() {
    const hosts = getHostCheckboxes();
    hosts.forEach((host) => {
      const name = getHostIdentifier(host);
      const shouldBeChecked = _selectedValues.includes(name);
      host.setAttribute("checked", shouldBeChecked ? "true" : "false");
      if (isDisabled) host.setAttribute("disabled", "true");
      else host.removeAttribute("disabled");
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

  function applyChildMargins() {
    try {
      const hosts = getHostCheckboxes();
      hosts.forEach((host) => {
        if (_selectAllEl && host === _selectAllEl) return; // skip select-all
        if (mlchild && !host.hasAttribute("ml")) host.setAttribute("ml", mlchild as string);
        if (mrchild && !host.hasAttribute("mr")) host.setAttribute("mr", mrchild as string);
        if (mtchild && !host.hasAttribute("mt")) host.setAttribute("mt", mtchild as string);
        if (mbchild && !host.hasAttribute("mb")) host.setAttribute("mb", mbchild as string);
      });
    } catch (error) {
      console.error("Error applying child margins:", error);
    }
  }

  function handleSelectAllChange(e: CustomEvent) {
    const isChecked = e.detail.checked;
    syncAllCheckboxValues();
    if (_allCheckboxValues.length === 0 && _slotEl) {
      const direct = Array.from(
        _slotEl.querySelectorAll("goa-checkbox[name], goa-checkbox[value]"),
      ) as HTMLElement[];
      const alt = Array.from(
        new Set(
          direct
            .map((h) => h.getAttribute("name") || h.getAttribute("value") || "")
            .filter(Boolean),
        ),
      );
      if (alt.length) _allCheckboxValues = alt;
    }
    _selectedValues = isChecked ? [..._allCheckboxValues] : [];
    value = _selectedValues.join(",");
    updateChildCheckboxesState();
    dispatch(
      _rootEl,
      "_change",
      { name, value, selectedValues: _selectedValues },
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
    class={`checkbox-container ${isHorizontal ? "horizontal" : ""}`.trim()}
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
  /* .checkbox-container:not(.horizontal) :global(goa-checkbox:not(:last-child)) {
    margin-bottom: var(--goa-space-xs);
  } */

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
