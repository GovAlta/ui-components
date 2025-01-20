<svelte:options customElement={{
  tag: "goa-public-subform-index",
  props: {
    actionButtonText: { type: "String", attribute: "action-button-text" },
    continueButtonText: { type: "String", attribute: "continue-button-text" },
    continueButtonVisibility: { type: "String", attribute: "continue-button-visibility" },
  }
}} />

<script lang="ts">
  import { receive, relay } from "../../common/utils";
  import {
    SubFormBindMsg, SubFormBindRelayDetail,
    SubFormIndexContinueToParentMsg,
    SubFormIndexContinueToSubFormMsg,
  } from "../../types/relay-types";
  import { onMount } from "svelte";

  export let actionButtonText: string;
  export let continueButtonText: string;
  export let continueButtonVisibility: "visible" | "hidden" = "hidden";

  let _el: HTMLElement;
  let _subformEl: HTMLElement;

  onMount(() => {
    receiveMsgs();
  })

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

  function continueToParent(e: Event) {
    e.stopPropagation();
    relay(_subformEl, SubFormIndexContinueToParentMsg, null, { bubbles: true });
  }

  function continueToSubform(e: Event) {
    e.stopPropagation();
    relay(_subformEl, SubFormIndexContinueToSubFormMsg, null, { bubbles: true });
  }
</script>

<div data-bind bind:this={_el}>
  <slot />
  <goa-block direction="column" gap="3xl">
    <goa-button type="secondary" on:_click={continueToSubform}>{actionButtonText}</goa-button>
    {#if continueButtonVisibility === "visible"}
      <goa-button type="primary" on:_click={continueToParent}>{continueButtonText}</goa-button>
    {/if}
  </goa-block>
</div>
