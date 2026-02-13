<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      id: { type: "String", reflect: true },
      error: { type: "String", reflect: true },
      errors: { type: "String", reflect: true },
      editting: { type: "Boolean", attribute: "data-pf-editting", reflect: true },
      buttonText: { type: "String", attribute: "button-text" },
      subHeading: { type: "String", attribute: "sub-heading" },
      sectionTitle: { type: "String", attribute: "section-title" },
      backVisibility: { attribute: "back-visibility", type: "String" },
      errorSummaryPosition: { attribute: "error-summary-position", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { relay, dispatch } from "../../common/utils";

  // TODO: rename this form to goa-pf-page

  export let id: string = "";
  export let buttonText: string = "";
  export let error: string = "";
  export let errors: string = ""; // JSON string of Record<string, string> - field name to error message
  export let editting: boolean;
  export let heading: string = "";
  export let subHeading: string = "";
  export let sectionTitle: string = "";
  export let backVisibility: "visible" | "hidden" = "visible";
  export let errorSummaryPosition: "top" | "bottom" | "none" = "top";

  let _rootEl: HTMLElement;
  let _senderEl: HTMLElement;

  // Parse errors JSON into a structured object
  $: parsedErrors = parseErrors(errors);
  $: hasErrors = Object.keys(parsedErrors).length > 0;

  function parseErrors(errorsJson: string): Record<string, string> {
    if (!errorsJson) return {};
    try {
      return JSON.parse(errorsJson);
    } catch {
      return {};
    }
  }

  onMount(() => {
    addSubformInterceptors();
  })

  // Need to add the form page's id to any events dispatched form a subform
  function addSubformInterceptors() {
    const addIdToEvent = (e: Event) => {
      const _id = (e as CustomEvent).detail;
      const detail = { pageId: id, _id };

      e.stopPropagation();
      dispatch(_senderEl, e.type, detail, { bubbles: true });
    }

    _rootEl.addEventListener("pf:subform:add", addIdToEvent);
    _rootEl.addEventListener("pf:subform:edit", addIdToEvent);
    _rootEl.addEventListener("pf:subform:save", addIdToEvent);
    _rootEl.addEventListener("pf:subform:delete", addIdToEvent);
    _rootEl.addEventListener("pf:subform:cancel", addIdToEvent);
  }

  function dispatchCancel() {
    relay(_rootEl, "form-page:cancel", id, { bubbles: true });
  }

  function dispatchContinue() {
    relay(_rootEl, "form-page:continue", id, { bubbles: true });
  }
</script>

<div bind:this={_senderEl} />
<section bind:this={_rootEl}>
  {#if !editting && backVisibility === "visible"}
    <goa-link-button leadingicon="chevron-back" mb="2xl" action="form-page:back">
      Back
    </goa-link-button>
  {/if}

  {#if sectionTitle}
    <goa-text size="body-l" mt="none" mb="xs" color="secondary">{sectionTitle}</goa-text>
  {/if}
  {#if heading}
    <goa-text as="h2" size="heading-l" mt="none" mb="xl"
      >{heading}</goa-text
    >
  {/if}
  {#if subHeading}
    <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{subHeading}</goa-text>
  {/if}

  {#if error}
    <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{error}</goa-text>
  {/if}

  <!-- Slot for additional content (description text, instructions) that appears before the error summary -->
  <slot name="description" />

  {#if hasErrors && errorSummaryPosition === "top"}
    <goa-callout type="emergency" emphasis="low" heading="There is a problem" mb="xl" version="2">
      <ul style="margin: 0; padding-left: var(--goa-space-l);">
        {#each Object.entries(parsedErrors) as [_fieldName, errorMsg]}
          <li>{errorMsg}</li>
        {/each}
      </ul>
    </goa-callout>
  {/if}

  <slot />

  {#if hasErrors && errorSummaryPosition === "bottom"}
    <goa-callout type="emergency" emphasis="low" heading="There is a problem" mb="xl" version="2">
      <ul style="margin: 0; padding-left: var(--goa-space-l);">
        {#each Object.entries(parsedErrors) as [_fieldName, errorMsg]}
          <li>{errorMsg}</li>
        {/each}
      </ul>
    </goa-callout>
  {/if}

  <goa-block mt="xl">
    {#if editting}
      <goa-button on:_click={dispatchCancel} type="secondary">
        Cancel
      </goa-button>
    {/if}
    <goa-button on:_click={dispatchContinue} type="primary">
      {buttonText || "Continue"}
    </goa-button>
  </goa-block>
</section>
