<svelte:options customElement="goa-form-item" />

<!-- Script -->

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { receive, relay, typeValidator } from "../../common/utils";
  import {
    FieldsetErrorRelayDetail,
    FieldsetResetErrorsMsg,
    FieldsetSetErrorMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FormItemMountMsg,
    FormItemMountRelayDetail,
  } from "../../types/relay-types";

  // Validators
  const [REQUIREMENT_TYPES, validateRequirementType] = typeValidator(
    "Requirement type",
    ["optional", "required"],
    false,
  );
  const [LABEL_SIZE_TYPES, validateLabelSize] = typeValidator(
    "Label size type",
    ["regular", "large"],
    false,
  );

  type RequirementType = (typeof REQUIREMENT_TYPES)[number];
  type LabelSizeType = (typeof LABEL_SIZE_TYPES)[number];

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Optional
  export let testid: string = "";
  export let label: string = "";
  export let labelsize: LabelSizeType = "regular";
  export let helptext: string = "";
  export let error: string = "";
  export let requirement: RequirementType = "";
  export let maxwidth: string = "none";
  export let id: string = "";

  let _rootEl: HTMLElement;

  onMount(() => {
    validateRequirementType(requirement);
    validateLabelSize(labelsize);
    bindElement();

    receive(_rootEl, (action, data) => {
      // console.log(`  RECEIVE(FormItem => ${action}):`, data);
      switch (action) {
        case FormFieldMountMsg:
          onInputMount(data as FormFieldMountRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          onSetError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "";
          break;
      }
    });
  });

  function onSetError(d: FieldsetErrorRelayDetail) {
    error = (d as Record<string, string>)["error"];
  }

  // Allows binding to Fieldset components
  function bindElement() {
    relay<FormItemMountRelayDetail>(
      _rootEl,
      FormItemMountMsg,
      { id, label, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function onInputMount(props: FormFieldMountRelayDetail) {
    const { el } = props;

    // Check if aria-label is present and has a value in the child element
    const ariaLabel = el.getAttribute("aria-label");
    if (!ariaLabel || ariaLabel.trim() === "") {
      el.setAttribute("aria-label", label);
    }
  }
</script>

<!-- HTML -->
<div
  data-testid={testid}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    max-width: ${maxwidth};
  `}
  bind:this={_rootEl}
>
  {#if label}
    <label class={`label ${labelsize}`}>
      {label}
      {#if requirement && REQUIREMENT_TYPES.includes(requirement)}
        <em>({requirement})</em>
      {/if}
    </label>
  {/if}
  <div class="form-item-input">
    <slot />
  </div>

  {#if $$slots.error || error}
    <div class="error-msg">
      <goa-icon type="warning" size="small" theme="filled" mt="2xs" />
      <slot name="error">
        {error}
      </slot>
    </div>
  {/if}

  {#if $$slots.helptext || helptext}
    <div class="help-msg">
      <slot name="helptext">
        {helptext}
      </slot>
    </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);

    /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-form-item-label-typography: var(--goa-typography-heading-s);
    --goa-form-item-label-padding-bottom: var(--goa-space-s);

    --goa-form-item-label-large-typography: var(--goa-typography-heading-l);
    --goa-form-item-label-large-padding-bottom: var(--goa-space-m);

    --goa-form-item-optional-label-typography: var(--goa-typography-body-xs);
    --goa-form-item-optional-label-color: var(--goa-color-greyscale-700);

    --goa-form-item-message-typography: var(--goa-typography-body-xs);
    --goa-form-item-message-margin-top: var(--goa-space-s);
    --goa-form-item-message-gap: var(--goa-space-2xs);

    --goa-form-item-error-message-color: var(--goa-color-interactive-error);
    --goa-form-item-help-message-color: var(--goa-color-text-default);

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

  .label em {
    font: var(--goa-form-item-optional-label-typography);
    color: var(--goa-form-item-optional-label-color);
    margin-left: var(--goa-space-2xs); /* Space between label and requirement */
  }

  .error-msg {
    display: flex;
    align-items: flex-start;
    gap: var(--goa-space-2xs);
    font: var(--goa-form-item-message-typography);
    color: var(--goa-form-item-error-message-color);
    margin-top: var(--goa-form-item-message-margin-top);
  }

  .error-msg goa-icon {
    transform: translateY(calc(var(--goa-space-2xs) * -1));
  }

  .help-msg {
    font: var(--goa-form-item-message-typography);
    color: var(--goa-form-item-help-message-color);
    margin-top: var(--goa-form-item-message-margin-top);
  }

  .error-msg + .help-msg {
    margin-top: var(--goa-form-item-message-gap);
  }
</style>
