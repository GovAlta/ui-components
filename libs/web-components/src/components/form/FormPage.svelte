<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      id: { type: "String", reflect: true },
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
  import { relay } from "../../common/utils";
  import { ExternalContinueRelayDetail } from "../../types/relay-types";

  export let buttonText: string = "";

  // common with fieldset
  export let id: string = "";
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

  let _senderEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _fieldsetEl: HTMLElement;
  let _active: boolean = false;
  let _editting: string = "";  // the id of the form page that is currently being editted

  function handleBack() {

  }

  function dispatchContinue() {
    relay(_rootEl, "_continue", id, { bubbles: true });
  }

</script>

<section bind:this={_senderEl}>
  <div bind:this={_rootEl}>
    <goa-link-button
      leadingicon="chevron-back"
      mb="2xl"
      on:_click={handleBack}
    >
      Back
    </goa-link-button>

    {#if sectionTitle}
      <goa-text size="body-l" mt="none" mb="xs" color="secondary">{sectionTitle}</goa-text>
    {/if}
    {#if heading}
      <goa-text as="h2" size="heading-l" mt="none" mb={subHeading ? "none" : "m"}>{heading}</goa-text>
    {/if}
    {#if subHeading}
      <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{subHeading}</goa-text>
    {/if}

    <slot />

    {#if type !== "multistep"}
      <goa-block mt="2xl">
        {#if type === "summary"}
          <goa-button on:_click={() => dispatchContinue()} type="primary">
            {buttonText || "Confirm"}
          </goa-button>
        {:else}
          {#if buttonVisibility === "visible"}
            <goa-button on:_click={() => dispatchContinue()} type="primary">
              {buttonText || "Continue"}
            </goa-button>
          {/if}
        {/if}
      </goa-block>
    {/if}
  </div>
</section>
