<svelte:options customElement="goa-callout" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { MOBILE_BP } from "../../common/breakpoints";
  import type { IconTheme } from "../icon/Icon.svelte";

  // Validators

  const [Types, validateType] = typeValidator(
    "Callout type",
    ["emergency", "important", "information", "event", "success"],
    true,
  );
  const [CalloutSizes, validateCalloutSize] = typeValidator("Callout size", [
    "medium",
    "large",
  ]);
  const [CalloutEmphasis, validateCalloutEmphasis] = typeValidator("Callout emphasis", [
    "high",
    "medium", 
    "low",
  ]);
  const [AriaLive, validateAriaLive] = typeValidator("Aria live", [
    "off",
    "assertive",
    "polite",
  ]);

  // Types
  type CalloutType = (typeof Types)[number];
  type CalloutSize = (typeof CalloutSizes)[number];
  type CalloutEmphasisType = (typeof CalloutEmphasis)[number];
  type AriaLiveType = (typeof AriaLive)[number];

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "l";
  export let ml: Spacing = null;

  export let size: CalloutSize = "large";
  export let type: CalloutType;
  export let emphasis: CalloutEmphasisType = "medium";
  export let heading: string = "";
  export let maxwidth: string = "none";
  export let testid: string = "";
  export let arialive: AriaLiveType = "off";
  export let icontheme: IconTheme = "outline";

  // Private

  let screenSize = 0;
  let iconSize = "medium";

  // Reactive

  $: isMediumCallout = screenSize < MOBILE_BP || size === "medium";

  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "important"
        ? "alert-circle"
        : type === "information"
          ? "information-circle"
          : type === "success"
            ? "checkmark-circle"
            : type === "event"
              ? "calendar"
              : "";

  onMount(() => {
    validateCalloutSize(size);
    validateCalloutEmphasis(emphasis);
    validateAriaLive(arialive);

    setTimeout(() => {
      validateType(type);
      if (type === "event") {
        console.warn("Callout type 'event' is deprecated and will be removed in a future version. Please use a different type.");
      }
      iconSize = isMediumCallout ? "small" : "medium";
    });
  });
</script>

<!-- HTML -->
<svelte:window bind:innerWidth={screenSize} />
<div
  role="region"
  style={`
    ${calculateMargin(mt, mr, mb, ml)};
    max-width: ${maxwidth};
  `}
  class="notification {type} emphasis-{emphasis}"
  class:medium={isMediumCallout}
  class:no-heading={!heading}
  data-testid={testid}
  aria-live={arialive}
>
  <span class="icon {type} emphasis-{emphasis}">
    <goa-icon
      type={iconType}
      size={iconSize}
      theme={icontheme}
    />
  </span>
  <span class="content {type} emphasis-{emphasis}">
    {#if heading}
      <h3 class:medium={isMediumCallout} class="emphasis-{emphasis}">{heading}</h3>
    {/if}
    <slot />
  </span>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .notification {
    display: flex;
    align-items: stretch;
    overflow: hidden;
    font: var(--goa-callout-l-text-size);
    border-radius: var(--goa-callout-border-radius);
  }

  h3 {
    font: var(--goa-callout-l-heading-size);
    margin-top: var(--goa-space-none);
    margin-bottom: var(--goa-callout-l-content-gap);
  }

  .icon.information {
    background-color: var(--goa-callout-info-color-bg-statusbar);
  }

  .icon.information > * {
    fill: var(--fill-color, var(--goa-callout-info-icon-color));
    color: var(--fill-color, var(--goa-callout-info-icon-color));
  }
  .icon.important > * {
    fill: var(--fill-color, var(--goa-callout-warning-icon-color));
    color: var(--fill-color, var(--goa-callout-warning-icon-color));
  }
  .icon.success > * {
    fill: var(--fill-color, var(--goa-callout-success-icon-color));
    color: var(--fill-color, var(--goa-callout-success-icon-color));
  }
  .icon.emergency > * {
    fill: var(--fill-color, var(--goa-callout-emergency-icon-color));
    color: var(--fill-color, var(--goa-callout-emergency-icon-color));
  }
  .icon.event > * {
    fill: var(--fill-color, var(--goa-callout-event-icon-color));
    color: var(--fill-color, var(--goa-callout-event-icon-color));
  }

  .icon.important {
    background-color: var(--goa-callout-warning-color-bg-statusbar);
  }
  .icon.success {
    background-color: var(--goa-callout-success-color-bg-statusbar);
  }
  .icon.emergency {
    background-color: var(--goa-callout-emergency-color-bg-statusbar);
  }
  .icon.event {
    background-color: var(--goa-callout-info-color-bg-statusbar);
  }

  .icon {
    text-align: center;
    padding: var(--goa-callout-l-statusbar-padding);
  }

  .content {
    flex: 1 1 auto;
    padding: var(--goa-callout-l-content-padding);
  }

  .content.information {
    background-color: var(--goa-callout-info-color-bg-content);
  }
  .content.important {
    background-color: var(--goa-callout-warning-color-bg-content);
  }
  .content.success {
    background-color: var(--goa-callout-success-color-bg-content);
  }
  .content.emergency {
    background-color: var(--goa-callout-emergency-color-bg-content);
  }
  .content.event {
    background-color: var(--goa-callout-info-color-bg-content);
  }

  
  /* Emphasis level styles */
  .notification.emphasis-high {
    font: var(--goa-callout-high-text-size, var(--goa-callout-l-text-size));
  }
  
  .notification.emphasis-medium {
    font: var(--goa-callout-medium-text-size, var(--goa-callout-l-text-size));
  }
  
  .notification.emphasis-low {
    font: var(--goa-callout-low-text-size, var(--goa-callout-l-text-size));
  }
  
  /* High emphasis styles */
  .notification.emphasis-high .icon {
    padding: var(--goa-callout-high-statusbar-padding, var(--goa-callout-l-statusbar-padding));
  }
  
  .notification.emphasis-high .content {
    padding: var(--goa-callout-high-content-padding, var(--goa-callout-l-content-padding));
  }
  
  .notification.emphasis-high h3 {
    font: var(--goa-callout-high-heading-size, var(--goa-callout-l-heading-size));
    margin-bottom: var(--goa-callout-high-content-gap, var(--goa-callout-l-content-gap));
  }
  
  /* Medium emphasis styles */
  .notification.emphasis-medium .icon {
    padding: var(--goa-callout-medium-statusbar-padding, var(--goa-callout-l-statusbar-padding));
  }
  
  .notification.emphasis-medium .content {
    padding: var(--goa-callout-medium-content-padding, var(--goa-callout-l-content-padding));
  }
  
  .notification.emphasis-medium h3 {
    font: var(--goa-callout-medium-heading-size, var(--goa-callout-l-heading-size));
    margin-bottom: var(--goa-callout-medium-content-gap, var(--goa-callout-l-content-gap));
  }
  
  /* Low emphasis styles */
  .notification.emphasis-low .icon {
    padding: var(--goa-callout-low-statusbar-padding, var(--goa-callout-l-statusbar-padding));
  }
  
  .notification.emphasis-low .content {
    padding: var(--goa-callout-low-content-padding, var(--goa-callout-l-content-padding));
  }
  
  .notification.emphasis-low h3 {
    font: var(--goa-callout-low-heading-size, var(--goa-callout-l-heading-size));
    margin-bottom: var(--goa-callout-low-content-gap, var(--goa-callout-l-content-gap));
  }
  
  /* Low emphasis without heading adjustment */
  .notification.emphasis-low.no-heading .content {
    padding: var(--goa-callout-low-content-padding-no-heading, var(--goa-callout-low-content-padding, var(--goa-callout-l-content-padding)));
  }
  
  .notification.emphasis-low.no-heading .icon {
    padding: var(--goa-callout-low-statusbar-padding-no-heading, var(--goa-callout-low-statusbar-padding, var(--goa-callout-l-statusbar-padding)));
  }
  
  /*Medium callout style*/
  .notification.medium {
    font: var(--goa-callout-m-text-size);
  }
  h3.medium {
    font: var(--goa-callout-m-heading-size);
    margin-bottom: var(--goa-callout-m-content-gap);
  }
  .notification.medium .content {
    padding: var(--goa-callout-m-content-padding);
    margin-top: calc(-1 * var(--goa-space-3xs));
  }
  .notification.medium .icon {
    padding: var(--goa-callout-m-statusbar-padding);
  }
</style>
