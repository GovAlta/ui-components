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
  const [AriaLive, validateAriaLive] = typeValidator("Aria live", [
    "off",
    "assertive",
    "polite",
  ]);

  // Types
  type CalloutType = (typeof Types)[number];
  type CalloutSize = (typeof CalloutSizes)[number];
  type AriaLiveType = (typeof AriaLive)[number];

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "l";
  export let ml: Spacing = null;

  export let size: CalloutSize = "large";
  export let type: CalloutType;
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
  class="notification {type}"
  class:medium={isMediumCallout}
  data-testid={testid}
  aria-live={arialive}
>
  <span class="icon {type}">
    <goa-icon
      type={iconType}
      size={iconSize}
      theme={icontheme}
    />
  </span>
  <span class="content {type}">
    {#if heading}
      <h3 class:medium={isMediumCallout}>{heading}</h3>
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
</style>
