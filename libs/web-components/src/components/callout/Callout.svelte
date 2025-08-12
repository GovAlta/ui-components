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
  ] as const);

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
  {#if emphasis === "low" && !heading}
    <!-- Low emphasis without heading uses inline layout -->
    <span class="icon {type} emphasis-{emphasis}">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={icontheme}
      />
    </span>
    <span class="content {type} emphasis-{emphasis}">
      <slot />
    </span>
  {:else}
    <!-- Standard layout with header section and content section -->
    <div class="icon {type} emphasis-{emphasis}">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={icontheme}
      />
      {#if heading}
        <h3 class:medium={isMediumCallout} class="emphasis-{emphasis}">{heading}</h3>
      {/if}
    </div>
    <div class="content {type} emphasis-{emphasis}">
      <slot />
    </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .notification {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid;
    background-color: #ffffff;
    position: relative;
  }

  /* Base font styles */
  .notification {
    font-family: 'Acumin Variable Concept', sans-serif;
    font-size: 16px;
    line-height: 23px;
    color: #353535;
  }

  /* Header section with icon and optional heading */
  .icon {
    display: flex;
    align-items: center;
    padding: 12px 12px 12px 18px;
    gap: 8px;
  }

  .icon goa-icon {
    width: 24px;
    height: 24px;
  }

  /* Content section */
  .content {
    padding: 20px;
  }

  /* Heading styles */
  h3 {
    font-family: 'Acumin Variable Concept', sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.1px;
    color: #000000;
    margin: 0 0 24px 0;
    flex: 1;
    padding: 6px 40px 6px 0;
  }

  /* Type-specific styles for Information */
  .notification.information {
    border-color: #98d4ee;
  }

  .notification.information.emphasis-high {
    background-color: #ebf8ff;
  }

  .notification.information.emphasis-high .icon {
    background-color: #0077ad;
  }

  .notification.information.emphasis-high .icon goa-icon,
  .notification.information.emphasis-high h3 {
    color: #ffffff;
    fill: #ffffff;
  }

  .notification.information.emphasis-medium {
    background-color: #ffffff;
  }

  .notification.information.emphasis-medium .icon {
    background-color: #cbeaf7;
  }

  .notification.information.emphasis-medium .icon goa-icon {
    color: #0077ad;
    fill: #0077ad;
  }

  .notification.information.emphasis-low {
    background-color: #ebf8ff;
  }

  .notification.information.emphasis-low .icon {
    background-color: transparent;
  }

  .notification.information.emphasis-low .icon goa-icon {
    color: #0077ad;
    fill: #0077ad;
  }

  /* Type-specific styles for Important */
  .notification.important {
    border-color: #fde3a1;
  }

  .notification.important.emphasis-high {
    background-color: #fff6e5;
  }

  .notification.important.emphasis-high .icon {
    background-color: #ffb800;
  }

  .notification.important.emphasis-high .icon goa-icon,
  .notification.important.emphasis-high h3 {
    color: #000000;
    fill: #000000;
  }

  .notification.important.emphasis-medium {
    background-color: #ffffff;
    border-color: #e1dedd;
  }

  .notification.important.emphasis-medium .icon {
    background-color: #fff1cc;
  }

  .notification.important.emphasis-medium .icon goa-icon {
    color: #ffb800;
    fill: #ffb800;
  }

  .notification.important.emphasis-low {
    background-color: #fff6e5;
  }

  .notification.important.emphasis-low .icon {
    background-color: transparent;
  }

  .notification.important.emphasis-low .icon goa-icon {
    color: #ffb800;
    fill: #ffb800;
  }

  /* Type-specific styles for Emergency */
  .notification.emergency {
    border-color: #f4c8c5;
  }

  .notification.emergency.emphasis-high {
    background-color: #fff6f6;
  }

  .notification.emergency.emphasis-high .icon {
    background-color: #da291c;
  }

  .notification.emergency.emphasis-high .icon goa-icon,
  .notification.emergency.emphasis-high h3 {
    color: #ffffff;
    fill: #ffffff;
  }

  .notification.emergency.emphasis-medium {
    background-color: #ffffff;
    border-color: #e1dedd;
  }

  .notification.emergency.emphasis-medium .icon {
    background-color: #fdded9;
  }

  .notification.emergency.emphasis-medium .icon goa-icon {
    color: #da291c;
    fill: #da291c;
  }

  .notification.emergency.emphasis-low {
    background-color: #fff6f6;
  }

  .notification.emergency.emphasis-low .icon {
    background-color: transparent;
  }

  .notification.emergency.emphasis-low .icon goa-icon {
    color: #da291c;
    fill: #da291c;
  }

  /* Type-specific styles for Success */
  .notification.success {
    border-color: #cceae1;
  }

  .notification.success.emphasis-high {
    background-color: #edfcf0;
  }

  .notification.success.emphasis-high .icon {
    background-color: #006f4c;
  }

  .notification.success.emphasis-high .icon goa-icon,
  .notification.success.emphasis-high h3 {
    color: #ffffff;
    fill: #ffffff;
  }

  .notification.success.emphasis-medium {
    background-color: #ffffff;
    border-color: #e1dedd;
  }

  .notification.success.emphasis-medium .icon {
    background-color: #d8f7e6;
  }

  .notification.success.emphasis-medium .icon goa-icon {
    color: #006f4c;
    fill: #006f4c;
  }

  .notification.success.emphasis-low {
    background-color: #edfcf0;
  }

  .notification.success.emphasis-low .icon {
    background-color: transparent;
  }

  .notification.success.emphasis-low .icon goa-icon {
    color: #006f4c;
    fill: #006f4c;
  }

  /* Deprecated event type (same as information) */
  .notification.event {
    border-color: #98d4ee;
    background-color: #ebf8ff;
  }

  .notification.event .icon {
    background-color: #cbeaf7;
  }

  .notification.event .icon goa-icon {
    color: #0077ad;
    fill: #0077ad;
  }

  /* Low emphasis without heading - inline layout */
  .notification.emphasis-low.no-heading {
    flex-direction: row;
    align-items: flex-start;
  }

  .notification.emphasis-low.no-heading .icon {
    padding: 16px 12px 16px 20px;
    flex-shrink: 0;
  }

  .notification.emphasis-low.no-heading .content {
    padding: 22px 12px 16px 0;
    flex: 1;
  }

  /* Medium callout adjustments (mobile/small size) */
  .notification.medium .content {
    padding: 16px;
  }

  .notification.medium .icon {
    padding: 12px;
  }

  .notification.medium h3 {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
  }

  /* Links within content */
  .content :global(a) {
    color: #0070c4;
    text-decoration: underline;
    text-underline-position: from-font;
  }
</style>
