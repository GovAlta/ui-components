<svelte:options customElement={{
  tag: "goa-form-item",
}} />

<!-- Script -->
<script lang="ts" context="module">
  export type FormItemChannelProps = {
    el: HTMLElement;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import {
    receive,
    generateRandomId,
    typeValidator,
    announceToScreenReader,
  } from "../../common/utils";

  // Validators
  const [REQUIREMENT_TYPES, validateRequirementType] = typeValidator(
    "Requirement type",
    ["optional", "required"],
    false,
  );
  const [LABEL_SIZE_TYPES, validateLabelSize] = typeValidator(
    "Label size type",
    ["compact", "regular", "large"],
    false,
  );
  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);
  const [INPUT_TYPES, validateType] = typeValidator(
    "Input type",
    ["", "text-input", "textarea", "checkbox-list", "radio-group"],
    false,
  );

  type RequirementType = (typeof REQUIREMENT_TYPES)[number];
  type LabelSizeType = (typeof LABEL_SIZE_TYPES)[number];
  type VersionType = (typeof Version)[number];
  type InputType = (typeof INPUT_TYPES)[number];

  // Margin
  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  // Optional
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Creates a label for the form item. */
  export let label: string = "";
  /** Sets the label size. 'compact' for dense layouts, 'regular' for standard, 'large' for emphasis. */
  export let labelsize: LabelSizeType = "regular";
  /** Help text displayed under the form field to provide additional explanation. */
  export let helptext: string = "";
  /** Error text displayed under the form field. Leave blank to indicate a valid field. */
  export let error: string = "";
  /** Marks the field with an optional or required label indicator. */
  export let requirement: RequirementType = "";
  /** Sets the maximum width of the form item. */
  export let maxwidth: string = "none";
  /** @internal Design system version for styling. */
  export let version: VersionType = "1";
  /** Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. */
  export let type: InputType = "";

  let _rootEl: HTMLElement;
  let _inputEl: HTMLElement;
  let _errorId = `error-${generateRandomId()}`;
  let _helpTextId = `helptext-${generateRandomId()}`;
  let _hasError = false;

  // Computed: Error icon size based on form item size
  // Compact: xsmall (16px), Regular/Large: small (18px)
  $: errorIconSize = labelsize === 'compact' ? 'xsmall' : 'small';

  onMount(() => {
    validateRequirementType(requirement);
    validateLabelSize(labelsize);
    validateVersion(version);
    validateType(type);

    _rootEl?.addEventListener("error::change", handleErrorChange);
    _rootEl?.addEventListener("help-text::announce", handleAnnounceHelperText);
  });

  function handleErrorChange(e: Event) {
    const ce = e as CustomEvent<{ isError: boolean }>;
    if (_hasError !== ce.detail.isError) {
      _hasError = ce.detail.isError;
      updateAriaDescribedBy();
    }
  }

  function handleAnnounceHelperText() {
    const message = _hasError ? error || helptext : helptext;
    if (message) {
      announceToScreenReader(message);
    }
  }

  function updateAriaDescribedBy() {
    if (!_inputEl) return;

    let describedBy = [];
    if (_hasError || $$slots.error) describedBy.push(_errorId);
    if (helptext || $$slots.helptext) describedBy.push(_helpTextId);

    if (describedBy.length > 0) {
      _inputEl.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      _inputEl.setAttribute("aria-describedby", "");
    }
  }
</script>

<!-- HTML -->
<div
  class:v2={version === "2"}
  class={`${labelsize}${type ? ' ' + type : ''}`}
  data-testid={testid}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  bind:this={_rootEl}
>
  {#if label}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class={`label ${labelsize}`}>
      {label}
      {#if requirement && REQUIREMENT_TYPES.includes(requirement)}
        <em>({requirement})</em>
      {/if}
    </label>
  {/if}

  <slot />

  {#if ($$slots.error || error) || ($$slots.helptext || helptext)}
    <div class={`messages-container ${labelsize}`}>
      {#if $$slots.error || error}
        <div class="error-msg" id={_errorId} role="alert">
          <goa-icon type="warning" size={errorIconSize} theme="filled" />
          <div class="error-text">
            <slot name="error">
              {error}
            </slot>
          </div>
        </div>
      {/if}

      {#if $$slots.helptext || helptext}
        <div class="help-msg" id={_helpTextId}>
          <slot name="helptext">
            {helptext}
          </slot>
        </div>
      {/if}
    </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  * {
    box-sizing: border-box;
  }

  .label {
    display: block;
    font: var(--goa-form-item-label-typography);
    padding-bottom: var(--goa-form-item-label-padding-bottom);
  }

  .label.large {
    font: var(--goa-form-item-label-large-typography);
    padding-bottom: var(--goa-form-item-label-large-padding-bottom);
  }

  /* V2 ONLY: Compact size variant */
  .v2.compact .label {
    font: var(--goa-form-item-label-compact-typography);
    padding-bottom: var(--goa-form-item-label-compact-padding-bottom);
  }

  .label em {
    font: var(--goa-form-item-optional-label-typography);
    color: var(--goa-form-item-optional-label-color);
    margin-left: var(--goa-space-2xs); /* Space between label and requirement */
  }

  /* Messages container - spacing from input */
  /* V1: Always 12px (--goa-form-item-message-margin-top) */
  /* V2: Size and input-type specific spacing */

  .large .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-large, var(--goa-form-item-message-margin-top, 0.75rem)); /* V2: 16px, V1: 12px */
  }

  .regular .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-regular, var(--goa-form-item-message-margin-top, 0.75rem)); /* V2: 12px, V1: 12px */
  }

  /* V2 ONLY: Compact size messages container spacing */
  .v2.compact .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-compact, 0.5rem); /* V2: 8px */
  }

  /* InputType overrides: checkbox-list, radio-group for adjusted sizing */
  .large.checkbox-list .messages-container,
  .large.radio-group .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-selection-large, var(--goa-form-item-message-margin-top, 0.75rem)); /* V2: 20px, V1: 12px */
  }

  .regular.checkbox-list .messages-container,
  .regular.radio-group .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-selection-regular, var(--goa-form-item-message-margin-top, 0.75rem)); /* V2: 16px, V1: 12px */
  }

  /* V2 ONLY: Compact size inputType pattern overrides for adjusted sizing */
  .v2.compact.checkbox-list .messages-container,
  .v2.compact.radio-group .messages-container {
    margin-top: var(--goa-form-item-message-margin-top-selection-compact, 0.75rem); /* V2: 12px */
  }

  /* V2: Flex layout for error + helper stacking */
  .v2 .messages-container {
    display: flex;
    flex-direction: column;
    gap: var(--goa-form-item-message-stack-gap);
  }

  .v2 .messages-container.compact {
    gap: var(--goa-form-item-message-stack-gap-compact);
  }

  /* Error message */
  .error-msg {
    display: flex;
    align-items: flex-start;
    gap: var(--goa-form-item-message-gap);
    font: var(--goa-form-item-message-typography);
    color: var(--goa-form-item-error-message-color);
  }

  /* V2 ONLY: Compact icon gap */
  .v2.compact .error-msg {
    gap: var(--goa-form-item-message-gap-compact);
  }

  /* Error text alignment - 1px margin-top for regular/large to align with icon */
  .error-text {
    margin-top: 0.0625rem; /* 1px */
  }

  /* V2 ONLY: Compact error text alignment (icon and text align naturally) */
  .v2.compact .error-text {
    margin-top: 0;
  }

  /* Helper message */
  .help-msg {
    font: var(--goa-form-item-message-typography);
    color: var(--goa-form-item-help-message-color);
  }

  /* V1: Gap between error and helper when both present (sibling selector) */
  /* Uses space.xs (8px) for proper vertical stacking */
  .error-msg + .help-msg {
    margin-top: var(--goa-form-item-message-stack-gap, var(--goa-space-xs, 0.5rem));
  }

  /* V2: Remove sibling margin (flex gap handles spacing) */
  .v2 .error-msg + .help-msg {
    margin-top: 0;
  }
</style>
