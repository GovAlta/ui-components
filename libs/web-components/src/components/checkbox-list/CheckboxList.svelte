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
  export let value: string[] = []; // selected checkbox names
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let arialabel: string = "";
  export let description: string = "";
  export let maxwidth: string = "none";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  // margin left for child checkboxes
  export let childml: Spacing = null;

  // Private state
  let _rootEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _error: boolean;
  let _prevError: boolean;
  type ChildRecord = { el: HTMLElement; name: string };
  let _childRecords: ChildRecord[] = [];
  let _allCheckboxValues: string[] = [];
  let _suppressChildChange = false;
  let _isInitialized = false;

  // Reactive bindings
  $: isDisabled = toBoolean(disabled);
  $: updateState(value, error);

  onMount(() => {
    addRelayListener();
    addSlotEventListeners();
    sendMountedMessage();

    // Initialize after a tick to ensure DOM is ready
    setTimeout(() => {
      _isInitialized = true;
      // Only sync if we actually have child records, otherwise wait for them to mount
      if (_childRecords.length > 0) {
        syncAllCheckboxValues();
      }
      updateChildCheckboxesState();
    }, 0);
  });

  function updateState(newValue: string[], newError: string) {
    // Ensure value is always an array
    if (!Array.isArray(newValue)) {
      value = [];
    }

    // Handle error state changes
    const currentError = toBoolean(newError);
    if (currentError !== _prevError) {
      _rootEl?.dispatchEvent(
        new CustomEvent("error::change", {
          detail: { isError: currentError },
          bubbles: true,
          composed: true,
        }),
      );
      _prevError = currentError;
      _error = currentError;
      updateChildCheckboxesError();
    }

    // Sync checkbox values if initialized
    if (_isInitialized) {
      try {
        syncAllCheckboxValues();
      } catch (error) {
        console.error("Error syncing checkbox values:", error);
      }
    }
  }

  function getSlottedCheckboxes(): HTMLElement[] {
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
      .filter((el): el is HTMLElement => !!el);
  }

  function getCheckboxIdentifier(el: HTMLElement): string {
    let id = el.getAttribute("name") || (el as any).name || "";
    if (!id) id = el.getAttribute("value") || (el as any).value || "";
    if (!id) id = el.getAttribute("text") || (el as any).text || "";
    return id || "";
  }

  function syncAllCheckboxValues() {
    // Use child record list (reliable method)
    if (_childRecords.length > 0) {
      const newValues = Array.from(new Set(_childRecords.map((r) => r.name)));
      if (JSON.stringify(_allCheckboxValues) !== JSON.stringify(newValues)) {
        _allCheckboxValues = newValues;
      }
    }
    // No fallback needed - child records are the authoritative source
  }

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
          onSetValue({ name, value: [] });
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
    value = Array.isArray(detail.value) ? detail.value : [];
    updateChildCheckboxesState();
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: { name, value },
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
    const checkboxElement = (detail.el.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    if (!checkboxElement) return;
    const inThisList = checkboxElement.closest("goa-checkbox-list") === _rootEl;
    if (!inThisList) return;
    const existing = _childRecords.find(
      (r) => r.el === detail.el || r.name === detail.name,
    );
    if (!existing) {
      _childRecords = [..._childRecords, { el: detail.el, name: detail.name }];
      syncAllCheckboxValues();
      updateChildCheckboxState(detail.el, detail.name);
      // Apply childml margin to the checkbox container
      applyChildMargin(checkboxElement);
    }
  }

  function applyChildMargin(checkboxElement: HTMLElement) {
    if (childml) {
      // Apply the margin-left style to the checkbox element
      const marginStyle = calculateMargin(null, null, null, childml);
      if (marginStyle) {
        const existingStyle = checkboxElement.getAttribute("style") || "";
        checkboxElement.setAttribute(
          "style",
          existingStyle + " " + marginStyle,
        );
      }
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
    const checkboxName = detail.name;

    const isChecked =
      typeof detail.checked === "boolean" ? detail.checked : !!detail.value;
    let newSelectedValues = [...value];

    if (isChecked) {
      if (!newSelectedValues.includes(checkboxName))
        newSelectedValues.push(checkboxName);
    } else {
      newSelectedValues = newSelectedValues.filter((v) => v !== checkboxName);
    }

    value = newSelectedValues;

    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: { name, value: newSelectedValues },
        bubbles: true,
        composed: true,
      }),
    );
  }

  function updateChildCheckboxesState() {
    _suppressChildChange = true;
    if (_childRecords.length > 0) {
      for (const rec of _childRecords)
        updateChildCheckboxState(rec.el, rec.name);
    }
    updateSlottedCheckboxesState();
    _suppressChildChange = false;
  }

  function updateSlottedCheckboxesState() {
    const checkboxElements = getSlottedCheckboxes();
    checkboxElements.forEach((element) => {
      const name = getCheckboxIdentifier(element);
      const shouldBeChecked = value.includes(name);
      element.setAttribute("checked", shouldBeChecked ? "true" : "false");
      if (isDisabled) element.setAttribute("disabled", "true");
      else element.removeAttribute("disabled");
      // Apply childml margin to host checkboxes as well
      applyChildMargin(element);
    });
  }

  function updateChildCheckboxState(childEl: HTMLElement, childName?: string) {
    const name =
      childName || _childRecords.find((r) => r.el === childEl)?.name || "";
    if (name) {
      const shouldBeChecked = value.includes(name);
      relay<FieldsetSetValueRelayDetail>(childEl, FieldsetSetValueMsg, {
        name,
        value: shouldBeChecked ? "checked" : "",
      });
    }
    const containerElement = (childEl.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    if (containerElement) {
      if (isDisabled) containerElement.setAttribute("disabled", "true");
      else containerElement.removeAttribute("disabled");
      // Apply childml margin to the container element
      applyChildMargin(containerElement);
    }
  }

  function updateChildCheckboxesError() {
    for (const rec of _childRecords) {
      if (_error) relay(rec.el, FieldsetSetErrorMsg, { error: "true" });
      else relay(rec.el, FieldsetResetErrorsMsg);
    }
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
