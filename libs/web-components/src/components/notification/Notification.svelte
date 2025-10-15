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
  const [EmphasisTypes, validateEmphasis] = typeValidator(
    "Notification emphasis",
    ["high", "low"] as const,
    false,
  );

  // Type
  type NotificationType = (typeof Types)[number];
  type AriaLiveType = (typeof AriaLiveTypes)[number];
  type EmphasisType = (typeof EmphasisTypes)[number];

  export let type: NotificationType = "";
  export let maxcontentwidth = "100%";
  export let arialive: AriaLiveType = "polite";
  export let testid: string = "";
  export let version: "1" | "2" = "1";
  export let emphasis: EmphasisType = "high";
  export let compact: boolean = false;

  let show = true;

  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "important"
        ? "alert-circle"
        : type === "information" || type === "event"
          ? "information-circle"
          : "";

  $: iconInverted =
    type === "important" ? "false" : emphasis === "high" ? "true" : "false";

  $: iconTheme = emphasis === "low" ? "filled" : "outline";

  onMount(() => {
    validateAriaLiveType(arialive);
    validateEmphasis(emphasis);
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
  <div
    id="container"
    data-testid={testid}
    class:v2={version === "2"}
    class:compact={version === "2" && compact}
  >
    <div
      transition:fade
      class="notification {type} {emphasis}"
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
            inverted={iconInverted}
            theme={iconTheme}
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
              inverted={iconInverted}
              theme="filled"
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

  /* V2: Improved vertical alignment with icon */
  .v2 .content {
    margin-top: 4px;
  }

  :global(::slotted(a)) {
    color: unset !important;
    outline: unset !important;
  }
  :global(::slotted(a:focus)) {
    outline: auto !important;
    border-radius: var(--goa-border-radius-xs);
  }
  .notification.important :global(::slotted(a:focus)) {
    outline: unset !important;
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-black);
    border-radius: var(--goa-border-radius-xs);
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
    border-radius: var(--goa-border-radius-xs);
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

  /* V2 Styling */

  /* Compact mode spacing */
  .v2.compact .notification {
    padding-top: var(--goa-notification-banner-padding-tb-compact);
    padding-bottom: var(--goa-notification-banner-padding-tb-compact);
  }

  .v2.compact .content-container {
    gap: var(--goa-notification-banner-gap-compact);
  }

  @container self (--not-mobile) {
    .v2.compact .notification {
      padding-left: var(--goa-notification-banner-padding-lr-medium-screen-compact);
      padding-right: var(--goa-notification-banner-padding-lr-medium-screen-compact);
    }
  }

  @container self (--desktop) {
    .v2.compact .notification {
      padding-left: var(--goa-notification-banner-padding-lr-large-screen-compact);
      padding-right: var(--goa-notification-banner-padding-lr-large-screen-compact);
    }
  }

  /* V2 emphasis-based colors - Information */
  .v2 .notification.information.high {
    background-color: var(--goa-notification-banner-information-high-color-bg);
    color: var(--goa-notification-banner-information-high-color-text);
  }

  .v2 .notification.information.low {
    background-color: var(--goa-notification-banner-information-low-color-bg);
    color: var(--goa-notification-banner-information-low-color-text);
    border: var(--goa-border-width-s) solid var(--goa-notification-banner-information-low-color-border);
  }

  /* V2 emphasis-based colors - Important */
  .v2 .notification.important.high {
    background-color: var(--goa-notification-banner-important-high-color-bg);
    color: var(--goa-notification-banner-important-high-color-text);
  }

  .v2 .notification.important.low {
    background-color: var(--goa-notification-banner-important-low-color-bg);
    color: var(--goa-notification-banner-important-low-color-text);
    border: var(--goa-border-width-s) solid var(--goa-notification-banner-important-low-color-border);
  }

  /* V2 emphasis-based colors - Emergency */
  .v2 .notification.emergency.high {
    background-color: var(--goa-notification-banner-emergency-high-color-bg);
    color: var(--goa-notification-banner-emergency-high-color-text);
  }

  .v2 .notification.emergency.low {
    background-color: var(--goa-notification-banner-emergency-low-color-bg);
    color: var(--goa-notification-banner-emergency-low-color-text);
    border: var(--goa-border-width-s) solid var(--goa-notification-banner-emergency-low-color-border);
  }

  /* V2 close button icon colors */
  .v2 .notification.information.high .close button goa-icon {
    color: var(--goa-notification-banner-information-high-color-text);
  }

  .v2 .notification.information.low .close button goa-icon {
    color: var(--goa-color-info-dark);
  }

  .v2 .notification.important.high .close button goa-icon {
    color: var(--goa-notification-banner-important-high-color-text);
  }

  .v2 .notification.important.low .close button goa-icon {
    color: var(--goa-color-important-text-dark);
  }

  .v2 .notification.emergency.high .close button goa-icon {
    color: var(--goa-notification-banner-emergency-high-color-text);
  }

  .v2 .notification.emergency.low .close button goa-icon {
    color: var(--goa-color-emergency-dark);
  }

  /* V2 close button hover and focus background colors */
  .v2 .notification.information.high .close button:hover,
  .v2 .notification.information.high .close button:focus-visible {
    background-color: var(--goa-notification-banner-information-high-close-bg-hover);
  }

  .v2 .notification.information.low .close button:hover,
  .v2 .notification.information.low .close button:focus-visible {
    background-color: var(--goa-notification-banner-information-low-close-bg-hover);
  }

  .v2 .notification.important.high .close button:hover,
  .v2 .notification.important.high .close button:focus-visible {
    background-color: var(--goa-notification-banner-important-high-close-bg-hover);
  }

  .v2 .notification.important.low .close button:hover,
  .v2 .notification.important.low .close button:focus-visible {
    background-color: var(--goa-notification-banner-important-low-close-bg-hover);
  }

  .v2 .notification.emergency.high .close button:hover,
  .v2 .notification.emergency.high .close button:focus-visible {
    background-color: var(--goa-notification-banner-emergency-high-close-bg-hover);
  }

  .v2 .notification.emergency.low .close button:hover,
  .v2 .notification.emergency.low .close button:focus-visible {
    background-color: var(--goa-notification-banner-emergency-low-close-bg-hover);
  }

  /* V2 contrast-based focus borders */
  .v2 .notification.information.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-information-high-focus-border);
  }

  .v2 .notification.information.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-information-low-focus-border);
  }

  .v2 .notification.important.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-important-high-focus-border);
  }

  .v2 .notification.important.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-important-low-focus-border);
  }

  .v2 .notification.emergency.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-emergency-high-focus-border);
  }

  .v2 .notification.emergency.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-emergency-low-focus-border);
  }

  /* V2 link focus states */
  .v2 .notification.important.high :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-important-high-focus-border);
  }

  .v2 .notification.important.low :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-important-low-focus-border);
  }

  .v2 .notification.information.high :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-information-high-focus-border);
  }

  .v2 .notification.information.low :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-information-low-focus-border);
  }

  .v2 .notification.emergency.high :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-emergency-high-focus-border);
  }

  .v2 .notification.emergency.low :global(::slotted(a:focus)) {
    box-shadow: var(--goa-notification-banner-emergency-low-focus-border);
  }
</style>
