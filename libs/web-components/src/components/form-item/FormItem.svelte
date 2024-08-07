<svelte:options customElement="goa-form-item" />

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
  import { generateRandomId, typeValidator } from "../../common/utils";

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
  export let maxwidth: string = "none";
  export let id: string = ""; // @deprecated: no longer used

  let _rootEl: HTMLElement;
  let inputEl: HTMLElement;
  let errorId = `error-${generateRandomId()}`;
  let helpTextId = `helptext-${generateRandomId()}`;
  let hasError = false;

  onMount(() => {
    validateRequirementType(requirement);
    validateLabelSize(labelsize);

    _rootEl?.addEventListener("input:mounted", handleInputMounted);
    _rootEl?.addEventListener("errorChange", handleErrorChange);
  });

  function handleInputMounted(e: Event) {
    const ce = e as CustomEvent<FormItemChannelProps>;
    inputEl = ce.detail.el;

    // Check if aria-label is present and has a value in the child element
    const ariaLabel = inputEl.getAttribute("aria-label");
    if (!ariaLabel || ariaLabel.trim() === "") {
      inputEl.setAttribute("aria-label", label);
    }

    // Set aria-required
    inputEl.setAttribute(
      "aria-required",
      requirement === "required" ? "true" : "false",
    );

    updateAriaDescribedBy();
  }

  // function handleErrorChange(e: Event) {
  //   const ce = e as CustomEvent<{isError: boolean}>;
  //   hasError = ce.detail.isError;
  //   updateAriaDescribedBy();
  // }

  function handleErrorChange(e: Event) {
    const ce = e as CustomEvent<{ isError: boolean }>;
    if (hasError !== ce.detail.isError) {
      hasError = ce.detail.isError;
      updateAriaDescribedBy();
    }
  }

  function updateAriaDescribedBy() {
    if (!inputEl) return;

    let describedBy = [];
    if (hasError || $$slots.error) describedBy.push(errorId);
    if (helptext || $$slots.helptext) describedBy.push(helpTextId);

    if (describedBy.length > 0) {
      inputEl.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      //inputEl.removeAttribute("aria-describedby");
      inputEl.setAttribute("aria-describedby", "");
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
    <!-- TODO: polite or assertive ?? -->
    <div class="error-msg" id={errorId} role="alert" aria-live="assertive">
      <goa-icon type="warning" size="small" theme="filled" mt="2xs" />
      <slot name="error">
        {error}
      </slot>
    </div>
  {/if}

  {#if $$slots.helptext || helptext}
    <div class="help-msg" id={helpTextId}>
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
