<svelte:options tag="goa-modal" />

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { toBoolean, typeValidator } from "../../common/utils";
  import { onMount } from "svelte";

  const [CALLOUT_VARIANT, validateCalloutVariant] = typeValidator("Callout variant", [
    "emergency",
    "important",
    "information",
    "success",
    "event",
  ]);

  const [Transitions, validateTransition] = typeValidator("Modal transition",
    ["fast", "slow", "none"]
  );

  type CalloutVariant = typeof CALLOUT_VARIANT[number];
  type Transition = typeof Transitions[number];

  export let heading: string = "";
  export let closable: string = "false";
  export let open: string = "false";
  export let transition: Transition = "none";
  export let width: string = "";
  export let calloutvariant: CalloutVariant = null;

  const isScrollable = true;

  $: isClosable = toBoolean(closable);
  $: isOpen = toBoolean(open);

  $: _transitionTime = transition === "none" ? 0 : transition === "slow" ? 400 : 200;

  $: iconType =
    calloutvariant === "emergency"
      ? "warning"
      : calloutvariant === "important"
      ? "alert-circle"
      : calloutvariant === "information"
      ? "information-circle"
      : calloutvariant === "success"
      ? "checkmark-circle"
      : calloutvariant === "event"
      ? "calendar"
      : "";

  function close(e: Event) {
    if (!isClosable) {
      return;
    }
    e.target.dispatchEvent(new CustomEvent("_close", { composed: true }));
    e.stopPropagation();
  }

  onMount(() => {
    validateCalloutVariant(calloutvariant);
    validateTransition(transition);
  });
</script>

{#if isOpen}
  <goa-focus-trap active={open}>
    <div
      use:noscroll={{ enable: isOpen }}
      in:fade={{ duration: _transitionTime }}
      out:fade={{ delay: _transitionTime, duration: _transitionTime }}
      data-testid="modal"
      class="modal"
      style="{width && `--width: ${width};`};"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div data-testid="modal-overlay" class="modal-overlay" on:click={close} />
      <div
        in:fly={{ duration: _transitionTime, y: 200 }}
        out:fly={{ delay: _transitionTime, duration: _transitionTime, y: -100 }}
        class="modal-pane"
      >
        {#if calloutvariant !== null}
          <div class="callout-bar {calloutvariant}">
            <goa-icon
              type={iconType}
              inverted={calloutvariant === "important" ? "false" : "true"}
            />
          </div>
        {/if}
        <div class="content">
          {#if heading}
            <div data-testid="modal-title" class="modal-title">{heading}</div>
          {/if}
          {#if isClosable}
            <div class="modal-close">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <goa-icon-button
                data-testid="modal-close-button"
                icon="close"
                on:click={close}
                variant="nocolor"
              />
            </div>
          {/if}
          <div data-testid="modal-content" class="modal-content">
            {#if isScrollable}
              <goa-scrollable direction="vertical" height="50">
                <slot />
              </goa-scrollable>
            {:else}
              <div style="margin: 2rem">
                <slot />
              </div>
            {/if}
            <slot />
          </div>
          <div class="modal-actions" data-testid="modal-actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </goa-focus-trap>
{/if}

<!-- ======================================================================= -->
<!-- Css -->

<!-- ======================================================================= -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .modal {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    z-index: 100;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .emergency {
    background-color: var(--goa-color-emergency-default);
  }
  .important {
    background-color: var(--goa-color-warning-default);
  }
  .information {
    background-color: var(--goa-color-info-default);
  }
  .event {
    background-color: var(--goa-color-info-default);
  }
  .success {
    background-color: var(--goa-color-success-default);
  }

  .callout-bar {
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 2rem;
    border-radius: 4px 0px 0px 4px;
  }
  .content {
    flex: 1 1 auto;
    width: 100%;
    margin: 2rem 2rem;
  }

  .modal-pane {
    position: relative;
    background-color: #fff;
    z-index: 1001;
    width: 90%;
    display: flex;
    margin: 1rem;
    box-shadow: var(--goa-shadow-modal);
    border-radius: 4px;
    max-height: 90%;
    border: 1px solid var(--goa-color-greyscale-700);
  }

  @media (min-width: 640px) {
    .modal-pane {
      width: var(--width, 60ch);
      max-height: 80%;
    }
  }

  .modal-actions ::slotted(div) {
    margin: 1.5rem 0 0;
  }

  .modal-content ::slotted(:last-child) {
    margin-bottom: 0 !important;
  }

  .modal-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }

  .modal-title {
    font-size: var(--goa-font-size-7);
    margin: 0 0 1.5rem;
    margin-right: 40px; /*  close icon spacing */
    flex: 0 0 auto;
  }

  .modal-content {
    line-height: 1.75rem;
  }
</style>
