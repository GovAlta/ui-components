<svelte:options customElement="goa-notification" />

<!-- Script -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Notification type",
    ["emergency", "important", "information", "event"] as const,
    true,
  );
  const [AriaLiveTypes, validateAriaLiveType] = typeValidator(
    "Aria-Live type",
    ["assertive", "off", "polite"] as const,
    true,
  );

  // Type
  type NotificationType = (typeof Types)[number];
  type AriaLiveType = (typeof AriaLiveTypes)[number];

  export let type: NotificationType = "";
  export let maxcontentwidth = "100%";
  export let arialive: AriaLiveType = "polite";
  export let testid: string = "";

  let show = true;
  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "important"
        ? "alert-circle"
        : type === "information"
          ? "information-circle"
          : type === "event"
            ? "calendar"
            : "";

  onMount(() => {
    validateAriaLiveType(arialive);
    setTimeout(() => validateType(type), 1);
  });

  function close(e: Event) {
    show = false;
    e.target?.dispatchEvent(new CustomEvent("_dismiss", { composed: true }));
    e.stopPropagation();
  }
</script>

<!-- HTML -->
{#if show}
  <div id="container" data-testid={testid}>
    <div
      transition:fade
      class="notification {type}"
      style={`--max-content-width: ${maxcontentwidth}`}
    >
      <div
        class="content-container"
        role="alert"
        aria-live={arialive}
        aria-atomic="true"
      >
        <div class="icon">
          <goa-icon
            type={iconType}
            inverted={type === "important" ? "false" : "true"}
          />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="close">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <button class={type} on:click={close}>
            <goa-icon
              type="close"
              inverted={type === "important" ? "false" : "true"}
            />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Style -->
<style>
  :host {
  /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-notification-banner-text-size: var(--goa-typography-body-m);
    --goa-notification-banner-padding-tb: var(--goa-space-l);
    --goa-notification-banner-padding-lr-small-screen: var(--goa-space-m);
    --goa-notification-banner-padding-lr-medium-screen: var(--goa-space-l);
    --goa-notification-banner-padding-lr-large-screen: var(--goa-space-3xl);
    --goa-notification-banner-gap: var(--goa-space-m);

    --goa-notification-banner-information-color-bg: var(--goa-color-info-default);
    --goa-notification-banner-information-color-text: var(--goa-color-text-light);
    --goa-notification-banner-important-color-bg: var(--goa-color-warning-default);
    --goa-notification-banner-important-color-text: var(--goa-color-text-default);
    --goa-notification-banner-emergency-color-bg: var(--goa-color-emergency-default);
    --goa-notification-banner-emergency-color-text: var(--goa-color-text-light);
    --goa-notification-banner-event-color-bg: var(--goa-color-info-default);
    --goa-notification-banner-event-color-text: var(--goa-color-text-light);

    /* Other tokens that are not used yet, but would be nice to have to control */
    --goa-notification-banner-size-icon: var(--goa-icon-size-4);
    --goa-notification-banner-information-color-icon: var(--goa-color-greyscale-white);
    --goa-notification-banner-important-color-icon: var(--goa-color-greyscale-black);
    --goa-notification-banner-emergency-color-icon: var(--goa-color-greyscale-white);
    --goa-notification-banner-event-color-icon: var(--goa-color-greyscale-white);

    --goa-notification-banner-custom-color-bg: var(--goa-color-info-default);
    --goa-notification-banner-custom-color-text: var(--goa-color-text-light);
    --goa-notification-banner-custom-color-icon: var(--goa-color-greyscale-white);

  /*  ------------------------------------------------------- */


    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  #container {
    container: self / inline-size;
  }

  /* Screen sizes */

  .notification {
    padding: var(--goa-notification-banner-padding-tb) var(--goa-notification-banner-padding-lr-small-screen);
    display: flex;
  }

  @container self (--not-mobile) {
    .notification {
      padding: var(--goa-notification-banner-padding-tb) var(--goa-notification-banner-padding-lr-medium-screen);
    }
  }

  @container self (--desktop) {
    .notification {
      padding: var(--goa-notification-banner-padding-tb) var(--goa-notification-banner-padding-lr-large-screen);
    }
  }

  /* Types */

  .emergency {
    background-color: var(--goa-notification-banner-emergency-color-bg);
    color: var(--goa-notification-banner-emergency-color-text);
  }

  .important {
    background-color: var(--goa-notification-banner-important-color-bg);
    color: var(--goa-notification-banner-important-color-text);
  }

  .information {
    background-color: var(--goa-notification-banner-information-color-bg);
    color: var(--goa-notification-banner-information-color-text);
  }

  .event {
    background-color: var(--goa-notification-banner-event-color-bg);
    color: var(--goa-notification-banner-event-color-text);
  }

  .icon {
    flex: 0 0 auto;
    margin-top: 3px; /* vertically centering the icon */
  }

  .content-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    gap: var(--goa-notification-banner-gap);
    margin: 0 auto;
    max-width: min(var(--max-content-width), 100%);
  }

  .content {
    flex: 1 1 auto;
    font: var(--goa-notification-banner-text-size);
  }

  :global(::slotted(a)) {
    color: unset !important;
    outline: unset !important;
  }
  :global(::slotted(a:focus)) {
    outline: auto !important;
    border-radius: var(--goa-border-radius-m);
  }
  .notification.important :global(::slotted(a:focus)) {
    outline: unset !important;
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-black);
    border-radius: var(--goa-border-radius-m);
  }

  /*Close Buttons*/
  .close {
    flex: 0 0 auto;
  }
  .close button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: var(--goa-space-2xs);
    margin: 0;
    outline: none;
    border-radius: var(--goa-border-radius-m);
    display: inline-flex;
    transition: transform 100ms ease-in-out;
  }
  .close button:active {
    transform: translateY(2px);
  }

  /*Information Close Button*/
  .close button.information:hover,
  .close button.information:focus-visible {
    background-color: var(--goa-color-info-dark);
  }
  .close button.information:focus-visible {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }

  /*Event Close Button*/
  .close button.event:hover,
  .close button.event:focus-visible {
    background-color: var(--goa-color-info-dark);
  }
  .close button.event:focus-visible {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }

  /*Important close button*/
  .close button.important:hover,
  .close button.important:focus-visible {
    background-color: var(--goa-color-warning-dark);
  }
  .close button.important:focus-visible {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-black);
  }

  /*Emergency close button*/
  .close button.emergency:hover,
  .close button.emergency:focus-visible {
    background-color: var(--goa-color-emergency-dark);
  }
  .close button.emergency:focus-visible {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }
</style>
