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

  $: actualIconTheme = emphasis === "high" ? icontheme : "filled";

  $: iconSize = isMediumCallout ? "small" : "medium";

  onMount(() => {
    validateCalloutSize(size);
    validateCalloutEmphasis(emphasis);
    validateAriaLive(arialive);

    setTimeout(() => {
      validateType(type);
      if (type === "event") {
        console.warn("Callout type 'event' is deprecated and will be removed in a future version. Please use a different type.");
      }
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
  {#if emphasis === "high" || emphasis === "medium"}
    <!-- High/Medium: Full-width statusbar on top with icon + heading -->
    <div class="statusbar {type} emphasis-{emphasis}">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={actualIconTheme}
      />
      {#if heading}
        <h3 class="heading emphasis-{emphasis}">{heading}</h3>
      {/if}
    </div>
    <div class="content {type} emphasis-{emphasis}">
      <slot />
    </div>
  {:else if emphasis === "low" && !heading}
    <!-- Low emphasis without heading: Icon + content in flex-row -->
    <div class="low-no-heading-container">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={actualIconTheme}
      />
      <div class="content {type} emphasis-{emphasis}">
        <slot />
      </div>
    </div>
  {:else}
    <!-- Low emphasis with heading: Same structure as high/medium -->
    <div class="statusbar {type} emphasis-{emphasis}">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={actualIconTheme}
      />
      {#if heading}
        <h3 class="heading emphasis-{emphasis}">{heading}</h3>
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
    border: var(--goa-border-width-s) solid;
    border-radius: var(--goa-callout-border-radius);
  }

  /* High, Medium, and Low emphasis: Full-width statusbar on top */
  .notification.emphasis-high,
  .notification.emphasis-medium,
  .notification.emphasis-low {
    display: flex;
    flex-direction: column;
  }

  .statusbar {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--goa-space-xs);
    padding: var(--goa-callout-h-statusbar-padding); /* Default to high emphasis padding */
  }

  /* Adjust text alignment to match icon baseline */
  .statusbar .heading {
    margin-top: -3px;
  }

  .heading {
    font: var(--goa-callout-heading-typography);
    margin: 0;
  }

  .content {
    padding: var(--goa-callout-h-content-padding); /* Default to high emphasis padding */
  }

  /* Low emphasis content: Reduced top padding */
  .notification.emphasis-low .content {
    padding: var(--goa-callout-l-content-padding) !important;
  }

  /* Background colors for entire low emphasis callouts */
  .notification.information.emphasis-low {
    background-color: var(--goa-callout-info-color-bg-content-l);
  }

  .notification.important.emphasis-low {
    background-color: var(--goa-callout-important-color-bg-content-l);
  }

  .notification.success.emphasis-low {
    background-color: var(--goa-callout-success-color-bg-content-l);
  }

  .notification.emergency.emphasis-low {
    background-color: var(--goa-callout-emergency-color-bg-content-l);
  }

  .notification.event.emphasis-low {
    background-color: var(--goa-callout-info-color-bg-content-l);
  }


  /* Low emphasis without heading: Horizontal layout */
  .low-no-heading-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    padding: var(--goa-callout-l-no-heading-padding);
  }

  /* Adjust content text alignment in no-heading layout */
  .low-no-heading-container .content {
    margin-top: -3px;
  }

  /* Remove padding from content inside no-heading container */
  .notification.emphasis-low.no-heading .low-no-heading-container .content {
    padding: 0 !important;
  }

  /* Background colors for low emphasis no-heading containers */
  .notification.information.emphasis-low.no-heading .low-no-heading-container {
    background-color: var(--goa-callout-info-color-bg-content-l);
  }

  .notification.important.emphasis-low.no-heading .low-no-heading-container {
    background-color: var(--goa-callout-important-color-bg-content-l);
  }

  .notification.success.emphasis-low.no-heading .low-no-heading-container {
    background-color: var(--goa-callout-success-color-bg-content-l);
  }

  .notification.emergency.emphasis-low.no-heading .low-no-heading-container {
    background-color: var(--goa-callout-emergency-color-bg-content-l);
  }

  .notification.event.emphasis-low.no-heading .low-no-heading-container {
    background-color: var(--goa-callout-info-color-bg-content-l);
  }

  /* Border colors by type and emphasis */
  .notification.information.emphasis-high { border-color: var(--goa-callout-info-border-color-h); }
  .notification.information.emphasis-medium { border-color: var(--goa-callout-info-border-color-m); }
  .notification.information.emphasis-low { border-color: var(--goa-callout-info-border-color-l); }

  .notification.important.emphasis-high { border-color: var(--goa-callout-important-border-color-h); }
  .notification.important.emphasis-medium { border-color: var(--goa-callout-important-border-color-m); }
  .notification.important.emphasis-low { border-color: var(--goa-callout-important-border-color-l); }

  .notification.success.emphasis-high { border-color: var(--goa-callout-success-border-color-h); }
  .notification.success.emphasis-medium { border-color: var(--goa-callout-success-border-color-m); }
  .notification.success.emphasis-low { border-color: var(--goa-callout-success-border-color-l); }

  .notification.emergency.emphasis-high { border-color: var(--goa-callout-emergency-border-color-h); }
  .notification.emergency.emphasis-medium { border-color: var(--goa-callout-emergency-border-color-m); }
  .notification.emergency.emphasis-low { border-color: var(--goa-callout-emergency-border-color-l); }

  /* Statusbar background colors */
  .statusbar.information.emphasis-high { background-color: var(--goa-callout-info-color-bg-statusbar-h); }
  .statusbar.information.emphasis-medium { background-color: var(--goa-callout-info-color-bg-statusbar-m); }
  .statusbar.information.emphasis-low { background-color: var(--goa-callout-info-color-bg-statusbar-l); }

  .statusbar.important.emphasis-high { background-color: var(--goa-callout-important-color-bg-statusbar-h); }
  .statusbar.important.emphasis-medium { background-color: var(--goa-callout-important-color-bg-statusbar-m); }
  .statusbar.important.emphasis-low { background-color: var(--goa-callout-important-color-bg-statusbar-l); }

  .statusbar.success.emphasis-high { background-color: var(--goa-callout-success-color-bg-statusbar-h); }
  .statusbar.success.emphasis-medium { background-color: var(--goa-callout-success-color-bg-statusbar-m); }
  .statusbar.success.emphasis-low { background-color: var(--goa-callout-success-color-bg-statusbar-l); }

  .statusbar.emergency.emphasis-high { background-color: var(--goa-callout-emergency-color-bg-statusbar-h); }
  .statusbar.emergency.emphasis-medium { background-color: var(--goa-callout-emergency-color-bg-statusbar-m); }
  .statusbar.emergency.emphasis-low { background-color: var(--goa-callout-emergency-color-bg-statusbar-l); }

  /* Content background colors */
  .content.information.emphasis-high { background-color: var(--goa-callout-info-color-bg-content-h); }
  .content.information.emphasis-medium { background-color: var(--goa-callout-info-color-bg-content-m); }
  .content.information.emphasis-low { background-color: var(--goa-callout-info-color-bg-content-l); }

  .content.important.emphasis-high { background-color: var(--goa-callout-important-color-bg-content-h); }
  .content.important.emphasis-medium { background-color: var(--goa-callout-important-color-bg-content-m); }
  .content.important.emphasis-low { background-color: var(--goa-callout-important-color-bg-content-l); }

  .content.success.emphasis-high { background-color: var(--goa-callout-success-color-bg-content-h); }
  .content.success.emphasis-medium { background-color: var(--goa-callout-success-color-bg-content-m); }
  .content.success.emphasis-low { background-color: var(--goa-callout-success-color-bg-content-l); }

  .content.emergency.emphasis-high { background-color: var(--goa-callout-emergency-color-bg-content-h); }
  .content.emergency.emphasis-medium { background-color: var(--goa-callout-emergency-color-bg-content-m); }
  .content.emergency.emphasis-low { background-color: var(--goa-callout-emergency-color-bg-content-l); }

  /* Icon colors using proper design tokens */
  .statusbar.information.emphasis-high > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-h);
    color: var(--goa-callout-info-icon-color-h);
  }

  .statusbar.success.emphasis-high > goa-icon {
    --fill-color: var(--goa-callout-success-icon-color-h);
    color: var(--goa-callout-success-icon-color-h);
  }

  .statusbar.emergency.emphasis-high > goa-icon {
    --fill-color: var(--goa-callout-emergency-icon-color-h);
    color: var(--goa-callout-emergency-icon-color-h);
  }

  .statusbar.important.emphasis-high > goa-icon {
    --fill-color: var(--goa-callout-important-icon-color-h);
    color: var(--goa-callout-important-icon-color-h);
  }

  /* Heading text colors for high emphasis */
  .statusbar.information.emphasis-high .heading,
  .statusbar.success.emphasis-high .heading,
  .statusbar.emergency.emphasis-high .heading,
  .statusbar.event.emphasis-high .heading {
    color: var(--goa-color-text-light);
  }

  /* Medium and low emphasis icons use proper design tokens */
  .statusbar.information.emphasis-medium > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-m);
    color: var(--goa-callout-info-icon-color-m);
  }

  .statusbar.information.emphasis-low > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-l);
    color: var(--goa-callout-info-icon-color-l);
  }

  .statusbar.important.emphasis-medium > goa-icon {
    --fill-color: var(--goa-callout-important-icon-color-m);
    color: var(--goa-callout-important-icon-color-m);
  }

  .statusbar.important.emphasis-low > goa-icon {
    --fill-color: var(--goa-callout-important-icon-color-l);
    color: var(--goa-callout-important-icon-color-l);
  }

  .statusbar.success.emphasis-medium > goa-icon {
    --fill-color: var(--goa-callout-success-icon-color-m);
    color: var(--goa-callout-success-icon-color-m);
  }

  .statusbar.success.emphasis-low > goa-icon {
    --fill-color: var(--goa-callout-success-icon-color-l);
    color: var(--goa-callout-success-icon-color-l);
  }

  .statusbar.emergency.emphasis-medium > goa-icon {
    --fill-color: var(--goa-callout-emergency-icon-color-m);
    color: var(--goa-callout-emergency-icon-color-m);
  }

  .statusbar.emergency.emphasis-low > goa-icon {
    --fill-color: var(--goa-callout-emergency-icon-color-l);
    color: var(--goa-callout-emergency-icon-color-l);
  }

  /* Low emphasis no-heading icon styling - use proper design tokens */
  .notification.information.emphasis-low.no-heading .low-no-heading-container > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-l);
    color: var(--goa-callout-info-icon-color-l);
  }

  .notification.important.emphasis-low.no-heading .low-no-heading-container > goa-icon {
    --fill-color: var(--goa-callout-important-icon-color-l);
    color: var(--goa-callout-important-icon-color-l);
  }

  .notification.success.emphasis-low.no-heading .low-no-heading-container > goa-icon {
    --fill-color: var(--goa-callout-success-icon-color-l);
    color: var(--goa-callout-success-icon-color-l);
  }

  .notification.emergency.emphasis-low.no-heading .low-no-heading-container > goa-icon {
    --fill-color: var(--goa-callout-emergency-icon-color-l);
    color: var(--goa-callout-emergency-icon-color-l);
  }

  /* Event type (deprecated) - use same colors as information type */
  .notification.event.emphasis-high { border-color: var(--goa-callout-info-border-color-h); }
  .notification.event.emphasis-medium { border-color: var(--goa-callout-info-border-color-m); }
  .notification.event.emphasis-low { border-color: var(--goa-callout-info-border-color-l); }

  .statusbar.event.emphasis-high { background-color: var(--goa-callout-info-color-bg-statusbar-h); }
  .statusbar.event.emphasis-medium { background-color: var(--goa-callout-info-color-bg-statusbar-m); }
  .statusbar.event.emphasis-low { background-color: var(--goa-callout-info-color-bg-statusbar-l); }

  .content.event.emphasis-high { background-color: var(--goa-callout-info-color-bg-content-h); }
  .content.event.emphasis-medium { background-color: var(--goa-callout-info-color-bg-content-m); }
  .content.event.emphasis-low { background-color: var(--goa-callout-info-color-bg-content-l); }

  /* Event type icon colors - same as information type */
  .statusbar.event.emphasis-high > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-h);
    color: var(--goa-callout-info-icon-color-h);
  }
  .statusbar.event.emphasis-medium > goa-icon,
  .statusbar.event.emphasis-low > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-m);
    color: var(--goa-callout-info-icon-color-m);
  }

  /* Event type no-heading icon styling */
  .notification.event.emphasis-low.no-heading .low-no-heading-container > goa-icon {
    --fill-color: var(--goa-callout-info-icon-color-l);
    color: var(--goa-callout-info-icon-color-l);
  }

  /*Medium size callout compatibility (deprecated size prop)*/
  .notification.medium {
    font: var(--goa-callout-m-text-size);
    border-width: var(--goa-callout-m-border-width);
  }
  .notification.medium .content {
    padding: var(--goa-callout-m-content-padding);
  }
  .notification.medium .statusbar {
    padding: var(--goa-callout-m-statusbar-padding);
  }
  .notification.medium .heading {
    font: var(--goa-callout-m-heading-size);
  }

  /* Mobile viewport specific adjustments (max-width: 623px) */
  @media (max-width: 623px) {
    /* Borders should show on mobile - same as large viewport */
    .notification {
      border: var(--goa-border-width-s) solid !important;
    }

    /* Border colors for mobile - use proper design tokens */
    .notification.information.emphasis-high { border-color: var(--goa-callout-info-border-color-h) !important; }
    .notification.information.emphasis-medium { border-color: var(--goa-callout-info-border-color-m) !important; }
    .notification.information.emphasis-low { border-color: var(--goa-callout-info-border-color-l) !important; }

    .notification.important.emphasis-high { border-color: var(--goa-callout-important-border-color-h) !important; }
    .notification.important.emphasis-medium { border-color: var(--goa-callout-important-border-color-m) !important; }
    .notification.important.emphasis-low { border-color: var(--goa-callout-important-border-color-l) !important; }

    .notification.success.emphasis-high { border-color: var(--goa-callout-success-border-color-h) !important; }
    .notification.success.emphasis-medium { border-color: var(--goa-callout-success-border-color-m) !important; }
    .notification.success.emphasis-low { border-color: var(--goa-callout-success-border-color-l) !important; }

    .notification.emergency.emphasis-high { border-color: var(--goa-callout-emergency-border-color-h) !important; }
    .notification.emergency.emphasis-medium { border-color: var(--goa-callout-emergency-border-color-m) !important; }
    .notification.emergency.emphasis-low { border-color: var(--goa-callout-emergency-border-color-l) !important; }

    .notification.event.emphasis-high { border-color: var(--goa-callout-info-border-color-h) !important; }
    .notification.event.emphasis-medium { border-color: var(--goa-callout-info-border-color-m) !important; }
    .notification.event.emphasis-low { border-color: var(--goa-callout-info-border-color-l) !important; }

    /* Use mobile-specific design tokens for padding */
    .statusbar {
      padding: var(--goa-callout-h-statusbar-padding-mobile) !important;
    }

    /* Content padding using mobile-specific tokens */
    .notification.emphasis-high .content {
      padding: var(--goa-callout-h-content-padding-mobile) !important;
    }

    .notification.emphasis-medium .content {
      padding: var(--goa-callout-m-content-padding-mobile) !important;
    }

    .notification.emphasis-low .content {
      padding: var(--goa-callout-l-content-padding-mobile) !important;
    }

    /* Mobile no-heading layout adjustments */
    .notification.emphasis-low.no-heading .low-no-heading-container {
      padding: var(--goa-callout-l-no-heading-padding-mobile) !important;
    }
  }
</style>
