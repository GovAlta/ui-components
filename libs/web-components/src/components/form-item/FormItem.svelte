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
  import {
    receive,
    relay,
    generateRandomId,
    typeValidator,
  } from "../../common/utils";
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
  export let id: string = ""; // @deprecated: no longer used

  let _rootEl: HTMLElement;
  let inputEl: HTMLElement;
  let errorId = `error-${generateRandomId()}`;
  let helpTextId = `helptext-${generateRandomId()}`;
  let hasError = false;
  let announcer: HTMLElement;

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
    _rootEl?.addEventListener("input:mounted", handleInputMounted);
    _rootEl?.addEventListener("errorChange", handleErrorChange);
    _rootEl?.addEventListener("announce-helper-text", handleAnnounceHelperText);
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

  function handleErrorChange(e: Event) {
    const ce = e as CustomEvent<{ isError: boolean }>;
    if (hasError !== ce.detail.isError) {
      hasError = ce.detail.isError;
      updateAriaDescribedBy();
    }
  }

  function handleAnnounceHelperText() {
    if (hasError) {
      announceOnFocus(helptext);
      announceOnFocus(error);
    } else if (helptext) {
      announceOnFocus(helptext);
    }
  }

  function announceOnFocus(text: string) {
    const announcer = document.createElement("div");
    announcer.className = "sr-only";
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    document.body.appendChild(announcer);

    setTimeout(() => {
      announcer.textContent = text;
    }, 100);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 3000);
  }

  function updateAriaDescribedBy() {
    if (!inputEl) return;

    let describedBy = [];
    if (hasError || $$slots.error) describedBy.push(errorId);
    if (helptext || $$slots.helptext) describedBy.push(helpTextId);

    if (describedBy.length > 0) {
      inputEl.setAttribute("aria-describedby", describedBy.join(" "));
    } else {
      inputEl.setAttribute("aria-describedby", "");
    }
  }

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
    <!-- svelte-ignore a11y-label-has-associated-control -->
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
