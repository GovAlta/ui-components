<svelte:options customElement="goa-checkbox-list" />

<script lang="ts">
  /**
   * - Manages a selected values array and synchronizes state down to child checkboxes.
   * - Relays form-related events (mount, set value, set/reset error, reset fields) to and from children.
   *
   * Approach
   * - Children register themselves via a FormFieldMount event; we track them in _childRecords.
   * - All value and error changes flow through a small relay bus (receive/relay helpers).
   * - Support both slotted goa-checkbox elements and direct child component instances.
   */
  import { onMount, tick } from "svelte";
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

  export let name: string;

  export let value: string[] = [];
  export let disabled: string = "false";
  export let error: string = "false";
  export let testid: string = "";
  export let maxwidth: string = "none";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  type ChildRecord = { el: HTMLElement; name: string; label?: string };

  // Private state
  let _rootEl: HTMLElement;
  let _slotEl: HTMLElement;
  let _error: boolean;
  let _childRecords: ChildRecord[] = [];
  let _isInitialized = false;
  let _selectedValues = new Set<string>(); // Component-level Set for efficient operations

  // Reactive bindings
  $: isDisabled = toBoolean(disabled);
  $: updateState(value, error);

  onMount(async () => {
    await tick();

    // Initialize Set with current value
    syncSelectedValuesSet(value);

    addRelayListener();
    addSlotEventListeners();
    sendMountedMessage();

    // Initialize after a tick to ensure DOM is ready
    _isInitialized = true;
    updateChildCheckboxesState();
  });

  /**
   * Keep the internal Set synchronized with the external value array
   */
  function syncSelectedValuesSet(valueArray: string[]) {
    _selectedValues.clear();
    if (valueArray && Array.isArray(valueArray)) {
      valueArray.forEach((val) => _selectedValues.add(val));
    }
  }

  /**
   * Synchronize component when external props change.
   * - Emits error change events and propagates to children
   * - Syncs checkbox values after initialization
   */
  function updateState(newValue: string[], newError: string) {
    // Ensure value is always an array
    if (!Array.isArray(newValue)) {
      value = [];
    }

    // Handle error state changes
    const currentError = toBoolean(newError);
    if (currentError !== _error) {
      _rootEl?.dispatchEvent(
        new CustomEvent("error::change", {
          detail: { isError: currentError },
          bubbles: true,
          composed: true,
        }),
      );
      _error = currentError;
      updateChildCheckboxesError();
    }

    // Sync Set when value changes externally (not from internal changes)
    syncSelectedValuesSet(newValue);

    // Sync checkbox values if initialized
    if (_isInitialized) {
      try {
        updateChildCheckboxesState();
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

  /**
   * Determines a child's identifier by trying expected attributes.
   * Priority: name -> value
   */
  function getCheckboxIdentifier(el: HTMLElement): string {
    let id = el.getAttribute("name") || (el as any).name || "";
    if (!id) id = el.getAttribute("value") || (el as any).value || "";
    return id;
  }

  /**
   * Extract label text from a checkbox element, checking both attribute and shadow DOM.
   */
  function getCheckboxLabel(
    checkboxEl: HTMLElement,
    fallbackName: string,
  ): string {
    const textAttr = checkboxEl.getAttribute("text");
    const shadowText = (checkboxEl as any)?.shadowRoot
      ?.querySelector?.(".text")
      ?.textContent?.trim();
    return textAttr || shadowText || fallbackName;
  }

  /**
   * Resolve a display label for a checkbox by its name for (public form summary)
   * Falls back to the name if no text label is found.
   */
  function getLabelByName(name: string): string {
    const rec = _childRecords.find((r) => r.name === name);

    // rec is null, so >>> fallback: try to find the checkbox element in the slot
    if (!rec) {
      const slottedCheckboxes = getSlottedCheckboxes();
      const checkbox = slottedCheckboxes.find(
        (el) => getCheckboxIdentifier(el) === name,
      );
      if (checkbox) {
        return getCheckboxLabel(checkbox, name);
      }
      return name;
    }

    // rec is not null, so check label
    if (rec.label) {
      return rec.label;
    }

    // rec is not null but has no label, so >>> Fallback: try to get text attribute from host element
    const checkboxElement = (rec.el.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;
    const label = checkboxElement
      ? getCheckboxLabel(checkboxElement, name)
      : name;
    return label;
  }

  /** Join selected labels for summary display (used to populate valueLabel in public form). */
  function getSelectedLabels(values: string[]): string[] {
    if (!values || values.length === 0) return [];
    const labels = values.map((v) => getLabelByName(v));
    return labels;
  }

  /**
   * Listen for relay-bus actions and route to handlers.
   * This wires the component into the fieldset/form
   */
  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
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

  /**
   * Handle an external request to set this list's value.
   * Pushes state to children and emits a local _change for upstream listeners.
   */
  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    value = Array.isArray(detail.value) ? detail.value : [];
    // Sync Set when value is set programmatically
    syncSelectedValuesSet(value);
    updateChildCheckboxesState();
    // dispatch _change .... including labels so Fieldset can store valueLabel
    // and the Form Summary can render text.
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: { name, value, labels: getSelectedLabels(value) },
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

  /**
   * Register a newly mounted child checkbox that belongs to this list.
   * Also synchronizes its state and applies child-level styles.
   */
  function onChildCheckboxMount(detail: FormFieldMountRelayDetail) {
    const checkboxElement = (detail.el.getRootNode() as any)?.host;
    if (!checkboxElement || checkboxElement.tagName.toLowerCase() !== "goa-checkbox") {
      return;
    }

    // Capture label
    const label = getCheckboxLabel(checkboxElement, detail.name);
    _childRecords = [
      ..._childRecords,
      { el: detail.el, name: detail.name, label },
    ];
    updateChildCheckboxState(detail.el, detail.name);
  }

  /**
   * Listen for _change events from slotted children and update the selected values array.
   * Stops propagation to keep changes local and relays a consolidated _change from the group.
   */
  function addSlotEventListeners() {
    if (!_slotEl) return;

    _slotEl.addEventListener("_change", (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      e.stopPropagation();

      if (detail && detail.value !== undefined) {
        handleChildCheckboxChange(detail);
      }
    });
  }

  // Update the selected values array when an individual child changes.
  // Use the component-level Set then sync back to array.
  function handleChildCheckboxChange(detail: any) {
    const checkboxName = detail.name;

    if (detail.checked) {
      _selectedValues.add(checkboxName);
    } else {
      _selectedValues.delete(checkboxName);
    }

    // Convert Set back to array and update the reactive value
    const newSelectedValues = Array.from(_selectedValues);
    value = newSelectedValues;

    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        detail: {
          name,
          value: newSelectedValues,
          labels: getSelectedLabels(newSelectedValues),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Push the current selected values and disabled state to all known children.
   * Uses a suppression flag to avoid feedback loops while syncing.
   */
  function updateChildCheckboxesState() {
    if (_childRecords.length > 0) {
      for (const rec of _childRecords)
        updateChildCheckboxState(rec.el, rec.name);
    }
    updateSlottedCheckboxesState();
  }

  /**
   * As a fallback, also sync any direct slotted checkbox we can access.
   * This handles cases where children are plain elements rather than relayed components.
   */
  function updateSlottedCheckboxesState() {
    const checkboxElements = getSlottedCheckboxes();
    checkboxElements.forEach((element) => {
      const checkboxName = getCheckboxIdentifier(element);
      const shouldBeChecked = _selectedValues.has(checkboxName);
      element.setAttribute("checked", shouldBeChecked ? "true" : "false");
      if (isDisabled) element.setAttribute("disabled", "true");
      else element.removeAttribute("disabled");

      // propagate error state down to children
      if (_error) element.setAttribute("error", "true");
      else element.removeAttribute("error");
    });
  }

  /** Sync a single child checkbox with the parent state and disabled flag. */
  function updateChildCheckboxState(
    childEl: HTMLElement,
    checkboxVal?: string,
  ) {
    if (checkboxVal) {
      const shouldBeChecked = _selectedValues.has(checkboxVal);
      relay<FieldsetSetValueRelayDetail>(childEl, FieldsetSetValueMsg, {
        name: checkboxVal,
        value: shouldBeChecked ? checkboxVal : "", // Any non-empty string will work e.g. "checked", true", etc, but we chose the checkbox's value
      });
    }

    const containerElement = (childEl.getRootNode() as any)?.host as
      | HTMLElement
      | undefined;

    if (containerElement) {
      if (isDisabled) {
        containerElement.setAttribute("disabled", "true");
      } else {
        containerElement.removeAttribute("disabled");
      }
    }
  }

  /** Propagate error state to all children via the relay bus. */
  function updateChildCheckboxesError() {
    for (const rec of _childRecords) {
      if (_error) {
        relay(rec.el, FieldsetSetErrorMsg, { error: "true" });
      } else {
        relay(rec.el, FieldsetResetErrorsMsg);
      }
    }

    updateSlottedCheckboxesState();
  }

  // Announce help text for screen readers when the group receives focus.
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
  aria-label={name}
  data-testid={testid}
  on:focus={onFocus}
>
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

  .checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
</style>
