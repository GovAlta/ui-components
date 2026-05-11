<svelte:options customElement="goa-dropdown-multiselect" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { dispatch, toBoolean } from "../../common/utils";

  // CheckboxList props

  /** @required The name for the checkbox list group. Used as group identifier in change events. */
  export let name: string;
  /** Array of currently selected checkbox values. */
  export let value: string[] = [];
  /** Disables the trigger button and all checkboxes. */
  export let disabled: string = "false";
  /** Shows an error state on the trigger and all checkboxes. */
  export let error: string = "false";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the maximum width of the checkbox list inside the popover. */
  export let maxwidth: string = "none";
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. */
  export let size: "default" | "compact" = "default";
  /** Sets the placeholder text shown in the trigger when no values are selected. */
  export let placeholder: string = "";

  // Popover props (prefixed)

  /** Provides control to where the popover content is positioned. */
  export let popoverposition: "above" | "below" | "right" | "auto" = "auto";
  /** Sets the maximum width of the popover container. */
  export let popovermaxwidth: string = "320px";
  /** Sets the minimum width of the popover container. */
  export let popoverminwidth: string = "";
  /** Sets if the popover has padding. Use false when content needs to be flush with boundaries. */
  export let popoverpadded: string = "true";
  /** Sets a fixed width for the popover container. */
  export let popoverwidth: string = "";

  // Margins
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Private state
  let _rootEl: HTMLElement;
  let _checkboxListEl: HTMLElement;
  let _popoverEl: HTMLElement;
  let _isOpen = false;
  let _displayText = "";
  // Snapshot of value at creation time — never updated reactively, so that
  // React echoing value back does NOT flow into goa-checkbox-list and trigger
  // its relay-based sync (which would re-fire _change and loop indefinitely).
  let _initialValue = value;

  let _selectedValues = new Set<string>(value);

  $: isDisabled = toBoolean(disabled);
  $: isError = toBoolean(error);

  onMount(async () => {
    // Set up event listeners immediately so they are ready before any events fire.
    _checkboxListEl?.addEventListener("_change", handleCheckboxListChange);

    _popoverEl?.addEventListener("_open", () => {
      _isOpen = true;
      dispatch(_rootEl, "_popoveropen", {}, { bubbles: true });
    });

    _popoverEl?.addEventListener("_close", () => {
      _isOpen = false;
      dispatch(_rootEl, "_popoverclose", {}, { bubbles: true });
    });

    // After a tick the slotted checkboxes are available to read labels from.
    await tick();

    if (value && value.length > 0) {
      _displayText = buildDisplayText(value);
    }
  });

  function buildDisplayText(selectedValues: string[]): string {
    const root = _rootEl?.getRootNode() as ShadowRoot;
    const slotEl = root?.querySelector?.(
      "slot:not([name])",
    ) as HTMLSlotElement | null;
    const checkboxes = (slotEl?.assignedElements() || []) as HTMLElement[];
    const labelMap = new Map<string, string>();
    for (const checkbox of checkboxes) {
      const checkboxName = checkbox.getAttribute("name") || "";
      const label = checkbox.getAttribute("text") || checkboxName;
      if (checkboxName) labelMap.set(checkboxName, label);
    }
    return selectedValues.map((v) => labelMap.get(v) || v).join(", ");
  }

  function handleCheckboxListChange(e: Event) {
    const customEvent = e as CustomEvent;
    e.stopPropagation();
    console.log(
      "[handleCheckboxListChange] customEvent.detail:",
      customEvent.detail,
      _selectedValues,
    );
    const { value: newValue, labels } = customEvent.detail;
    _selectedValues = new Set(newValue);
    const displayLabels: string[] =
      labels && labels.length > 0 ? labels : newValue;
    _displayText = displayLabels.join(", ");
    dispatch(
      _rootEl,
      "_change",
      { name, value: newValue, labels: displayLabels },
      { bubbles: true },
    );
  }
</script>

<!-- View -->
<div
  bind:this={_rootEl}
  data-testid={testid}
  class="dropdown-multiselect"
  style={calculateMargin(mt, mr, mb, ml)}
>
  <goa-popover
    bind:this={_popoverEl}
    position={popoverposition}
    maxwidth={popovermaxwidth}
    minwidth={popoverminwidth}
    padded={popoverpadded}
    width={popoverwidth}
    {disabled}
  >
    <div
      slot="target"
      class="trigger"
      class:trigger--disabled={isDisabled}
      class:trigger--error={isError}
      class:trigger--open={_isOpen}
    >
      <span
        class="trigger-text"
        class:trigger-text--placeholder={!_displayText}
      >
        {_displayText || placeholder}
      </span>
      <goa-icon
        type={_isOpen ? "chevron-up" : "chevron-down"}
        class="trigger-icon"
      />
    </div>

    <goa-checkbox-list
      bind:this={_checkboxListEl}
      {name}
      value={_selectedValues.size > 0 ? Array.from(_selectedValues) : []}
      {disabled}
      {error}
      {maxwidth}
      {size}
      version="2"
    >
      <slot />
    </goa-checkbox-list>
  </goa-popover>
</div>

<!-- Styles -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    display: block;
  }

  .dropdown-multiselect {
    display: block;
    width: 100%;
  }

  .trigger {
    box-sizing: border-box;
    transition: var(--goa-dropdown-transition);
    box-shadow: var(--goa-dropdown-border);
    border-radius: var(--goa-dropdown-border-radius);
    display: inline-flex;
    align-items: center;
    background-color: var(--goa-dropdown-color-bg);
    cursor: pointer;
    width: 100%;
    padding: var(--goa-dropdown-padding);
    gap: var(--goa-space-xs);
  }

  .trigger:hover {
    box-shadow: var(--goa-dropdown-border-hover);
  }

  .trigger--error,
  .trigger--error:hover {
    box-shadow: var(--goa-dropdown-border-error);
  }

  .trigger--disabled,
  .trigger--disabled:hover {
    background-color: var(--goa-dropdown-color-bg-disabled);
    box-shadow: var(--goa-dropdown-border-disabled);
    cursor: default;
  }

  .trigger-text {
    flex: 1;
    font: var(--goa-dropdown-typography);
    color: var(--goa-dropdown-color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trigger-text--placeholder {
    color: var(--goa-dropdown-color-text-placeholder);
  }

  .trigger--disabled .trigger-text {
    color: var(--goa-dropdown-color-text-disabled);
  }

  .trigger-icon {
    flex-shrink: 0;
    padding-right: var(--goa-dropdown-space-icon-text);
  }
</style>
