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
  // Types
  type CalloutType = (typeof Types)[number];
  type CalloutSize = (typeof CalloutSizes)[number];
  type CalloutEmphasisType = (typeof CalloutEmphasis)[number];
  type AriaLiveType = (typeof AriaLive)[number];

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = "l";
  /** Left margin. */
  export let ml: Spacing = null;

  /** Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. */
  export let size: CalloutSize = "large";
  /** @required Define the context and colour of the callout. */
  export let type: CalloutType;
  /** Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. */
  export let emphasis: CalloutEmphasisType = "medium";
  /** Callout heading text. */
  export let heading: string = "";
  /** Sets the maximum width of the callout. */
  export let maxwidth: string = "none";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Indicates how assistive technology should handle updates to the live region. */
  export let arialive: AriaLiveType = "off";
  /** Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. */
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
  data-testid={testid}
  aria-live={arialive}
>
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
    align-items: stretch;
    overflow: hidden;
    border: var(--goa-callout-border);
    border-radius: var(--goa-callout-border-radius);
  }

  .notification .heading {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: var(--goa-callout-heading-padding);
    gap: var(--goa-callout-heading-gap);
    color: var(--goa-callout-heading-color);
  }

  .notification .heading-label {
    margin-top: var(--goa-space-3xs);
    margin-bottom: var(--goa-space-3xs);
    font: var(--goa-callout-heading-typography);
  }

  .notification .body {
    padding: var(--goa-callout-body-padding);
    color: var(--goa-callout-body-color);
    font: var(--goa-callout-body-typography);
  }

  .emphasis-low .body {
    padding: var(--goa-callout-l-with-heading-body-padding);
  }

  .emphasis-low:has(.heading-label:empty) {
    flex-direction: row;
    align-items: start;
  }

  .emphasis-low .heading-label:empty {
    display: none;
  }

  .emphasis-low:has(.heading-label:empty) .heading {
    padding-right: var(--goa-space-xs);
  }

  .emphasis-low:has(.heading-label:empty) .body {
    padding: var(--goa-callout-l-without-heading-body-padding);
  }

  .information {
    background-color: var(--goa-callout-info-content-bg-color);
  }

  .information .heading {
    background-color: var(--goa-callout-info-heading-bg-color);
    --fill-color: var(--goa-callout-info-icon-color);
  }

  .information.emphasis-low {
    border-color: var(--goa-callout-l-info-border-color);
    background-color: var(--goa-callout-l-info-content-bg-color);
  }

  .information.emphasis-high {
    border-color: var(--goa-callout-h-info-border-color);
    background-color: var(--goa-callout-h-info-content-bg-color);
  }

  .information.emphasis-high .heading {
    background-color: var(--goa-callout-h-info-heading-bg-color);
    color: var(--goa-callout-h-info-heading-color);
    --fill-color: var(--goa-callout-h-info-icon-color);
  }

  .emergency {
    background-color: var(--goa-callout-emergency-content-bg-color);
  }

  .emergency .heading {
    background-color: var(--goa-callout-emergency-heading-bg-color);
    --fill-color: var(--goa-callout-emergency-icon-color);
  }

  .emergency.emphasis-low {
    border-color: var(--goa-callout-l-emergency-border-color);
    background-color: var(--goa-callout-l-emergency-content-bg-color);
  }

  .emergency.emphasis-high {
    border-color: var(--goa-callout-h-emergency-border-color);
    background-color: var(--goa-callout-h-emergency-content-bg-color);
  }

  .emergency.emphasis-high .heading {
    background-color: var(--goa-callout-h-emergency-heading-bg-color);
    color: var(--goa-callout-h-emergency-heading-color);
    --fill-color: var(--goa-callout-h-emergency-icon-color);
  }

  .important {
    background-color: var(--goa-callout-important-content-bg-color);
  }

  .important .heading {
    background-color: var(--goa-callout-important-heading-bg-color);
    --fill-color: var(--goa-callout-important-icon-color);
  }

  .important.emphasis-low {
    border-color: var(--goa-callout-l-important-border-color);
    background-color: var(--goa-callout-l-important-content-bg-color);
  }

  .important.emphasis-high {
    border-color: var(--goa-callout-h-important-border-color);
    background-color: var(--goa-callout-h-important-content-bg-color);
  }

  .important.emphasis-high .heading {
    background-color: var(--goa-callout-h-important-heading-bg-color);
    color: var(--goa-callout-h-important-heading-color);
    --fill-color: var(--goa-callout-h-important-icon-color);
  }

  .success {
    background-color: var(--goa-callout-success-content-bg-color);
  }

  .success .heading {
    background-color: var(--goa-callout-success-heading-bg-color);
    --fill-color: var(--goa-callout-success-icon-color);
  }

  .success.emphasis-low {
    border-color: var(--goa-callout-l-success-border-color);
    background-color: var(--goa-callout-l-success-content-bg-color);
  }

  .success.emphasis-high {
    border-color: var(--goa-callout-h-success-border-color);
    background-color: var(--goa-callout-h-success-content-bg-color);
  }

  .success.emphasis-high .heading {
    background-color: var(--goa-callout-h-success-heading-bg-color);
    color: var(--goa-callout-h-success-heading-color);
    --fill-color: var(--goa-callout-h-success-icon-color);
  }

  .information.emphasis-low .heading,
  .important.emphasis-low .heading,
  .emergency.emphasis-low .heading,
  .success.emphasis-low .heading {
    background-color: transparent;
  }
</style>
