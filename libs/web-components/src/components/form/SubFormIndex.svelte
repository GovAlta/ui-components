<svelte:options customElement={{
  tag: "goa-public-subform-index",
  props: {
    actionButtonText: { type: "String", attribute: "action-button-text" },
    buttonVisibility: { type: "String", attribute: "button-visibility" },
    sectionTitle: { type: "String", attribute: "section-title" },
  }
}} />

<script lang="ts">
  import { receive, relay } from "../../common/utils";
  import {
    SubFormBindMsg, SubFormBindRelayDetail,
    SubFormIndexContinueToSubFormMsg,
  } from "../../types/relay-types";
  import { onMount } from "svelte";

  // =====
  // Props
  // =====

  export let heading: string = "";
  export let sectionTitle: string = "";
  export let actionButtonText: string;
  export let buttonVisibility: "visible" | "hidden" = "hidden";

  // =======
  // Private
  // =======

  let _el: HTMLElement;
  let _subformEl: HTMLElement;

  // =====
  // Hooks
  // =====

  onMount(() => {
    receiveMsgs();
  })

  // =========
  // Functions
  // =========

  function receiveMsgs() {
    // For some reason the way that the SubFormIndex exists within the Subform doesn't allow
    // the SubFormIndex from bubbling up messages to the SubForm, but instead can only be
    // received by the subform's parent Form element. So the only way to get around this
    // was to get the parent Subform to send a bind message here.
    receive(_el, (action, data, e) => {
      switch (action) {
        case SubFormBindMsg:
          _subformEl = (data as SubFormBindRelayDetail).el;
          break;
      }
    });
  }

  function continueToSubform(e: Event) {
    e.stopPropagation();
    relay(_subformEl, SubFormIndexContinueToSubFormMsg, null, { bubbles: true });
  }
</script>

<goa-public-form-page
  id="index"
  type="step"
  {heading}
  section-title="{sectionTitle}"
  button-visibility={buttonVisibility}
  active
>
  <div data-bind bind:this={_el}>
    <slot />
    <goa-block direction="column" gap="3xl">
      <goa-button type="secondary" on:_click={continueToSubform}>{actionButtonText}</goa-button>
    </goa-block>
  </div>
</goa-public-form-page>
