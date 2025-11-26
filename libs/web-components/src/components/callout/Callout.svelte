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
  const [CalloutEmphasis, validateCalloutEmphasis] = typeValidator(
    "Callout emphasis",
    ["high", "medium", "low"],
  );
  const [AriaLive, validateAriaLive] = typeValidator("Aria live", [
    "off",
    "assertive",
    "polite",
  ]);
  const [Version, validateVersion] = typeValidator("Version", ["1", "2"]);

  // Types
  type CalloutType = (typeof Types)[number];
  type CalloutSize = (typeof CalloutSizes)[number];
  type CalloutEmphasisType = (typeof CalloutEmphasis)[number];
  type AriaLiveType = (typeof AriaLive)[number];
  type VersionType = (typeof Version)[number];

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
  export let version: VersionType = "1";

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
    validateVersion(version);

    setTimeout(() => {
      validateType(type);
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
  class:v2={version === "2"}
  data-testid={testid}
  aria-live={arialive}
>
  {#if version === "2"}
    <div class="heading">
      <goa-icon
        type={iconType}
        size={iconSize}
        theme={emphasis === "high" ? "outline" : "filled"}
      />
      <h3 class="heading-label">{heading}</h3>
    </div>
    <div class="body">
      <slot />
    </div>
  {:else}
    <span class="icon {type}">
      <goa-icon type={iconType} size={iconSize} theme={icontheme} />
    </span>
    <span class="content {type}">
      {#if heading}
        <h3 class:medium={isMediumCallout}>{heading}</h3>
      {/if}
      <slot />
    </span>
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
    align-items: stretch;
    overflow: hidden;
    font: var(--goa-callout-l-text-size);
    border: var(--goa-callout-l-border-width) solid;
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

  .icon.emergency {
    background-color: var(--goa-color-emergency-default);
  }
  .icon.important {
    background-color: var(--goa-callout-warning-color-bg-statusbar);
  }
  .icon.information {
    background-color: var(--goa-color-info-default);
  }
  .icon.event {
    background-color: var(--goa-color-info-default);
  }
  .icon.success {
    background-color: var(--goa-callout-success-color-bg-statusbar);
  }
  .icon.emergency {
    background-color: var(--goa-callout-emergency-color-bg-statusbar);
  }

  .icon {
    text-align: center;
    padding: var(--goa-callout-l-statusbar-padding);
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
  .content {
    flex: 1 1 auto;
    background-color: var(--goa-color-greyscale-100);
    padding: var(--goa-callout-l-content-padding);
  }

  .notification.information {
    border-color: var(--goa-callout-info-border-color);
  }
  .notification.important {
    border-color: var(--goa-callout-warning-border-color);
  }
  .notification.success {
    border-color: var(--goa-callout-success-border-color);
  }
  .notification.emergency {
    border-color: var(--goa-callout-emergency-border-color);
  }
  /*Medium callout style*/
  .notification.medium {
    font: var(--goa-callout-m-text-size);
    border-width: var(--goa-callout-m-border-width);
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

  /* Version two: Layout */

  .v2.notification {
    flex-direction: column;
    border: var(--goa-callout-border);
  }

  .v2.notification .heading {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: var(--goa-callout-heading-padding);
    gap: var(--goa-callout-heading-gap);
    color: var(--goa-callout-heading-color);
  }

  .v2.notification .heading-label {
    margin-top: var(--goa-space-3xs);
    margin-bottom: var(--goa-space-3xs);
    font: var(--goa-callout-heading-typography);
  }

  .v2.notification .body {
    padding: var(--goa-callout-body-padding);
    color: var(--goa-callout-body-color);
    font: var(--goa-callout-body-typography);
  }

  /* Version two: Low emphasis layout */

  .v2.emphasis-low .body {
    padding: var(--goa-callout-l-with-heading-body-padding);
  }

  .v2.emphasis-low:has(.heading-label:empty) {
    flex-direction: row;
    align-items: start;
  }

  .v2.emphasis-low .heading-label:empty {
    display: none;
  }

  .v2.emphasis-low:has(.heading-label:empty) .heading {
    padding-right: var(--goa-space-xs);
  }

  .v2.emphasis-low:has(.heading-label:empty) .body {
    padding: var(--goa-callout-l-without-heading-body-padding);
  }

  .v2.information {
    background-color: var(--goa-callout-info-content-bg-color);
  }

  /* Version two: Types */

  .v2.information .heading {
    background-color: var(--goa-callout-info-heading-bg-color);
    --fill-color: var(--goa-callout-info-icon-color);
  }

  .v2.information.emphasis-low {
    border-color: var(--goa-callout-l-info-border-color);
    background-color: var(--goa-callout-l-info-content-bg-color);
  }

  .v2.information.emphasis-high {
    border-color: var(--goa-callout-h-info-border-color);
    background-color: var(--goa-callout-h-info-content-bg-color);
  }

  .v2.information.emphasis-high .heading {
    background-color: var(--goa-callout-h-info-heading-bg-color);
    color: var(--goa-callout-h-info-heading-color);
    --fill-color: var(--goa-callout-h-info-icon-color);
  }

  .v2.emergency {
    background-color: var(--goa-callout-emergency-content-bg-color);
  }

  .v2.emergency .heading {
    background-color: var(--goa-callout-emergency-heading-bg-color);
    --fill-color: var(--goa-callout-emergency-icon-color);
  }

  .v2.emergency.emphasis-low {
    border-color: var(--goa-callout-l-emergency-border-color);
    background-color: var(--goa-callout-l-emergency-content-bg-color);
  }

  .v2.emergency.emphasis-high {
    border-color: var(--goa-callout-h-emergency-border-color);
    background-color: var(--goa-callout-h-emergency-content-bg-color);
  }

  .v2.emergency.emphasis-high .heading {
    background-color: var(--goa-callout-h-emergency-heading-bg-color);
    color: var(--goa-callout-h-emergency-heading-color);
    --fill-color: var(--goa-callout-h-emergency-icon-color);
  }

  .v2.important {
    background-color: var(--goa-callout-important-content-bg-color);
  }

  .v2.important .heading {
    background-color: var(--goa-callout-important-heading-bg-color);
    --fill-color: var(--goa-callout-important-icon-color);
  }

  .v2.important.emphasis-low {
    border-color: var(--goa-callout-l-important-border-color);
    background-color: var(--goa-callout-l-important-content-bg-color);
  }

  .v2.important.emphasis-high {
    border-color: var(--goa-callout-h-important-border-color);
    background-color: var(--goa-callout-h-important-content-bg-color);
  }

  .v2.important.emphasis-high .heading {
    background-color: var(--goa-callout-h-important-heading-bg-color);
    color: var(--goa-callout-h-important-heading-color);
    --fill-color: var(--goa-callout-h-important-icon-color);
  }

  .v2.success {
    background-color: var(--goa-callout-success-content-bg-color);
  }

  .v2.success .heading {
    background-color: var(--goa-callout-success-heading-bg-color);
    --fill-color: var(--goa-callout-success-icon-color);
  }

  .v2.success.emphasis-low {
    border-color: var(--goa-callout-l-success-border-color);
    background-color: var(--goa-callout-l-success-content-bg-color);
  }

  .v2.success.emphasis-high {
    border-color: var(--goa-callout-h-success-border-color);
    background-color: var(--goa-callout-h-success-content-bg-color);
  }

  .v2.success.emphasis-high .heading {
    background-color: var(--goa-callout-h-success-heading-bg-color);
    color: var(--goa-callout-h-success-heading-color);
    --fill-color: var(--goa-callout-h-success-icon-color);
  }

  .v2.information.emphasis-low .heading,
  .v2.important.emphasis-low .heading,
  .v2.emergency.emphasis-low .heading,
  .v2.success.emphasis-low .heading {
    background-color: transparent;
  }
</style>
