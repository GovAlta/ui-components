<svelte:options customElement="goa-form-item" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator } from "../../common/utils";

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

  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Optional
  export let label: string = "";
  export let labelsize: LabelSizeType = "regular";
  export let helptext: string = "";
  export let error: string = "";
  export let requirement: RequirementType = "";
  export let id: string = "";

  onMount(() => {
    validateRequirementType(requirement);
    validateLabelSize(labelsize);
  });
</script>

<!-- HTML -->
<div data-testid={testid} style={calculateMargin(mt, mr, mb, ml)}>
  {#if label}
    <div class={`label ${labelsize}`} {id}>
      {label}
      {#if requirement && REQUIREMENT_TYPES.includes(requirement)}
        <em>({requirement})</em>
      {/if}
    </div>
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
  }

  * {
    box-sizing: border-box;
  }

  .label {
    display: block;
    font: var(--goa-typography-heading-s);
    padding-bottom: var(--goa-space-xs);
  }

  .label.large {
    font: var(--goa-typography-heading-l);
    padding-bottom: var(--goa-space-s);
  }

  .label em {
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-greyscale-700);
  }

  .error-msg {
    display: flex;
    align-items: flex-start;
    gap: var(--goa-space-2xs);
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-interactive-error);
    margin-top: var(--goa-space-s);
  }

  .error-msg goa-icon {
    transform: translateY(calc(var(--goa-space-2xs) * -1));
  }

  .help-msg {
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-text-default);
    margin-top: var(--goa-space-s);
  }

  .error-msg + .help-msg {
    margin-top: var(--goa-space-xs);
  }
</style>
