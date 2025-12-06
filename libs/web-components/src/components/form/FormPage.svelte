<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      id: { type: "String", reflect: true },
      error: { type: "String", reflect: true },
      editting: { type: "Boolean", attribute: "data-pf-editting", reflect: true },
      buttonText: { type: "String", attribute: "button-text" },
      buttonVisibility: { type: "String", attribute: "button-visibility" },
      subHeading: { type: "String", attribute: "sub-heading" },
      sectionTitle: { type: "String", attribute: "section-title" },
      backUrl: { attribute: "back-url", type: "String" },
      summaryHeading: { attribute: "summary-heading", type: "String" },
    }
  }}
/>

<script lang="ts">
  import { Spacing } from "../../common/styling";
  import {  relay } from "../../common/utils";

  export let buttonText: string = "";

  // common with fieldset
  export let id: string = "";
  export let error: string = "";
  export let editting: boolean;
  export let heading: string = "";
  export let summaryHeading: string = "";
  export let subHeading: string = "";
  export let sectionTitle: string = "";
  export let backUrl: string = "";
  export let type: "step" | "summary" | "multistep" = "step";
  export let buttonVisibility: "visible" | "hidden" = "visible";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "3xl";
  export let ml: Spacing = null;
  export let active: boolean = false;

  // Private

  let _rootEl: HTMLElement;
  let _formEl: HTMLElement;
  let _active: boolean = false;

  function handleBack() {

  }

  function dispatchCancel() {
    relay(_rootEl, "form-page:cancel", id, { bubbles: true });
  }

  function dispatchContinue() {
    relay(_rootEl, "form-page:continue", id, { bubbles: true });
  }

</script>

<div bind:this={_rootEl}>
  {#if !editting}
    <goa-link-button
      leadingicon="chevron-back"
      mb="2xl"
      on:_click={handleBack}
    >
      Back
    </goa-link-button>
  {/if}

  {#if sectionTitle}
    <goa-text size="body-l" mt="none" mb="xs" color="secondary">{sectionTitle}</goa-text>
  {/if}
  {#if heading}
    <goa-text as="h2" size="heading-l" mt="none" mb={subHeading ? "none" : "m"}>{heading}</goa-text>
  {/if}
  {#if subHeading}
    <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{subHeading}</goa-text>
  {/if}

  {#if error}
    <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{error}</goa-text>
  {/if}

  <section bind:this={_formEl}>
    <slot />
  </section>

  <goa-block mt="2xl">
    {#if editting}
      <goa-button on:_click={() => dispatchCancel()} type="secondary">
        Cancel
      </goa-button>
    {/if}
    <goa-button on:_click={() => dispatchContinue()} type="primary">
      {buttonText || "Continue"}
    </goa-button>
  </goa-block>
</div>
