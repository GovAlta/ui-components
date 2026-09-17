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

  /** Define the context and colour of the notification. */
  export let type: NotificationType = "";
  /** Maximum width of the content area. */
  export let maxcontentwidth = "100%";
  /** Indicates how assistive technology should handle updates to the live region. */
  export let arialive: AriaLiveType = "polite";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the visual prominence. 'high' for full background, 'filled' for medium. */
  export let emphasis: EmphasisType = "high";
  /** When true, reduces padding for a more compact notification. */
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
  <div id="container" data-testid={testid} class:compact>
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
          <goa-icon type={iconType} inverted={iconInverted} theme={iconTheme} />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="close">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <button class={type} on:click={close}>
            <goa-icon type="close" inverted={iconInverted} theme="filled" />
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
    padding: var(--goa-notification-banner-padding-tb)
      var(--goa-notification-banner-padding-lr-small-screen);
    display: flex;
  }

  @container self (--not-mobile) {
    .notification {
      padding: var(--goa-notification-banner-padding-tb)
        var(--goa-notification-banner-padding-lr-medium-screen);
    }
  }

  @container self (--desktop) {
    .notification {
      padding: var(--goa-notification-banner-padding-tb)
        var(--goa-notification-banner-padding-lr-large-screen);
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
    margin-top: 2px;
  }

  :global(::slotted(a)) {
    color: unset !important;
    outline: unset !important;
  }
  :global(::slotted(a:focus-visible)) {
    outline: auto !important;
    border-radius: var(--goa-border-radius-xs);
  }
  .notification.important :global(::slotted(a:focus-visible)) {
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

  /* Compact mode spacing */
  .compact .notification {
    padding-top: var(--goa-notification-banner-padding-tb-compact);
    padding-bottom: var(--goa-notification-banner-padding-tb-compact);
  }

  .compact .content-container {
    gap: var(--goa-notification-banner-gap-compact);
  }

  @container self (--not-mobile) {
    .compact .notification {
      padding-left: var(
        --goa-notification-banner-padding-lr-medium-screen-compact
      );
      padding-right: var(
        --goa-notification-banner-padding-lr-medium-screen-compact
      );
    }
  }

  @container self (--desktop) {
    .compact .notification {
      padding-left: var(
        --goa-notification-banner-padding-lr-large-screen-compact
      );
      padding-right: var(
        --goa-notification-banner-padding-lr-large-screen-compact
      );
    }
  }

  /* Emphasis-based colors - Information */
  .notification.information.high {
    background-color: var(--goa-notification-banner-information-high-color-bg);
    color: var(--goa-notification-banner-information-high-color-text);
  }

  .notification.information.low {
    background-color: var(--goa-notification-banner-information-low-color-bg);
    color: var(--goa-notification-banner-information-low-color-text);
    border: var(--goa-border-width-s) solid
      var(--goa-notification-banner-information-low-color-border);
  }

  /* Emphasis-based colors - Important */
  .notification.important.high {
    background-color: var(--goa-notification-banner-important-high-color-bg);
    color: var(--goa-notification-banner-important-high-color-text);
  }

  .notification.important.low {
    background-color: var(--goa-notification-banner-important-low-color-bg);
    color: var(--goa-notification-banner-important-low-color-text);
    border: var(--goa-border-width-s) solid
      var(--goa-notification-banner-important-low-color-border);
  }

  /* Emphasis-based colors - Emergency */
  .notification.emergency.high {
    background-color: var(--goa-notification-banner-emergency-high-color-bg);
    color: var(--goa-notification-banner-emergency-high-color-text);
  }

  .notification.emergency.low {
    background-color: var(--goa-notification-banner-emergency-low-color-bg);
    color: var(--goa-notification-banner-emergency-low-color-text);
    border: var(--goa-border-width-s) solid
      var(--goa-notification-banner-emergency-low-color-border);
  }

  /* Close button icon colors */
  .notification.information.high .close button goa-icon {
    color: var(--goa-notification-banner-information-high-color-text);
  }

  .notification.information.low .close button goa-icon {
    color: var(--goa-color-info-dark);
  }

  .notification.important.high .close button goa-icon {
    color: var(--goa-notification-banner-important-high-color-text);
  }

  .notification.important.low .close button goa-icon {
    color: var(--goa-color-important-text-dark);
  }

  .notification.emergency.high .close button goa-icon {
    color: var(--goa-notification-banner-emergency-high-color-text);
  }

  .notification.emergency.low .close button goa-icon {
    color: var(--goa-color-emergency-dark);
  }

  /* Close button hover and focus background colors */
  .notification.information.high .close button:hover,
  .notification.information.high .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-information-high-close-bg-hover
    );
  }

  .notification.information.low .close button:hover,
  .notification.information.low .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-information-low-close-bg-hover
    );
  }

  .notification.important.high .close button:hover,
  .notification.important.high .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-important-high-close-bg-hover
    );
  }

  .notification.important.low .close button:hover,
  .notification.important.low .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-important-low-close-bg-hover
    );
  }

  .notification.emergency.high .close button:hover,
  .notification.emergency.high .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-emergency-high-close-bg-hover
    );
  }

  .notification.emergency.low .close button:hover,
  .notification.emergency.low .close button:focus-visible {
    background-color: var(
      --goa-notification-banner-emergency-low-close-bg-hover
    );
  }

  /* Contrast-based focus borders */
  .notification.information.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-information-high-focus-border);
  }

  .notification.information.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-information-low-focus-border);
  }

  .notification.important.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-important-high-focus-border);
  }

  .notification.important.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-important-low-focus-border);
  }

  .notification.emergency.high .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-emergency-high-focus-border);
  }

  .notification.emergency.low .close button:focus-visible {
    box-shadow: var(--goa-notification-banner-emergency-low-focus-border);
  }

  /* Link focus states */
  .notification.important.high :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-important-high-focus-border);
  }

  .notification.important.low :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-important-low-focus-border);
  }

  .notification.information.high :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-information-high-focus-border);
  }

  .notification.information.low :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-information-low-focus-border);
  }

  .notification.emergency.high :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-emergency-high-focus-border);
  }

  .notification.emergency.low :global(::slotted(a:focus-visible)) {
    box-shadow: var(--goa-notification-banner-emergency-low-focus-border);
  }
</style>
