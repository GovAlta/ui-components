<svelte:options customElement={{
  tag: "goa-checkbox-list",
  props: {
    value: { reflect: true },
  }
}} />

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
  import { dispatch, toBoolean } from "../../common/utils";

  /** The name for the checkbox list group. Used as group identifier in change events. */
  export let name: string;

  /** Array of currently selected checkbox values. */
  export let value: string[] = [];
  /** Disables all checkboxes in the list. */
  export let disabled: string = "false";
  /** Shows an error state on all checkboxes in the list. */
  export let error: string = "false";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the maximum width of the checkbox list container. */
  export let maxwidth: string = "none";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
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
  $: updateState(value, error);

  onMount(async () => {
    await tick();

    // Initialize Set with current value
    syncSelectedValuesSet(value);

    addSlotEventListeners();

    // Initialize after a tick to ensure DOM is ready
    _isInitialized = true;

    bindReset(_rootEl);
  });

  function bindReset(el: HTMLElement) {
    el.addEventListener("goa:reset", () => {
      _selectedValues = new Set<string>();
      dispatch(el, "_change", { name, value }, { bubbles: true })  ;
    });
    dispatch(el, "goa:bind", el, { bubbles: true });
  }

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
    }

    // Sync Set when value changes externally (not from internal changes)
    syncSelectedValuesSet(newValue);

    // Sync checkbox values if initialized
    if (_isInitialized) {
      try {
        // updateChildCheckboxesState();
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
