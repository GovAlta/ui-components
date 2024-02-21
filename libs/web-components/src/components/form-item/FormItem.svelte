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
  {#if error}
    <div class="error-msg">
      <goa-icon type="warning" size="small" theme="filled" mt="2xs" />
      {error}
    </div>
  {/if}
  {#if helptext}
    <div class="help-msg">{helptext}</div>
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
    font-weight: var(--goa-font-weight-bold);
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    padding-bottom: 0.5rem;
  }

  .label.large {
    font: var(--goa-typography-heading-l);
  }

  .label em {
    color: var(--goa-color-greyscale-700);
    font-weight: var(--goa-font-weight-regular);
    font-size: var(--goa-font-size-2);
    line-height: var(--goa-line-height-1);
    font-style: normal;
  }

  .form-item-input {
    margin-bottom: 0.25rem;
  }

  .help-msg {
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-text-default);
  }

  .error-msg {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.25rem;
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-interactive-error);
    margin-bottom: 0.25rem;
  }
</style>
