<svelte:options customElement="goa-callout" />

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { MOBILE_BP } from "../../common/breakpoints";

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

  // Types

  type CalloutType = (typeof Types)[number];
  type CalloutSize = (typeof CalloutSizes)[number];

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "l";
  export let ml: Spacing = null;
  export let size: CalloutSize = "large";
  export let type: CalloutType;
  export let heading: string = "";
  export let testid: string = "";

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
    setTimeout(() => {
      validateType(type);
      iconSize = isMediumCallout ? "small" : "medium";
    });
  });
</script>

<!-- HTML -->
<svelte:window bind:innerWidth={screenSize} />
<div
  style={calculateMargin(mt, mr, mb, ml)}
  class="notification"
  class:medium={isMediumCallout}
  data-testid={testid}
>
  <span class="icon {type}">
    <goa-icon
      type={iconType}
      size={iconSize}
      inverted={type === "important" ? "false" : "true"}
    />
  </span>
  <span class="content">
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
    font: var(--goa-typography-body-m);
  }

  h3 {
    font-size: var(--goa-font-size-7);
    line-height: var(--goa-line-height-2);
    font-weight: var(--goa-font-weight-regular);
    margin-top: var(--goa-space-none);
    margin-bottom: var(--goa-space-m);
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

  .icon {
    text-align: center;
    padding-top: var(--goa-space-l);
    padding-left: var(--goa-space-s);
    padding-right: var(--goa-space-s);
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--goa-color-greyscale-100);
    padding: var(--goa-space-l);
  }
  /*Medium callout style*/
  .notification.medium {
    font: var(--goa-typography-body-s);
  }
  h3.medium {
    font: var(--goa-typography-heading-xs);
    margin-bottom: var(--goa-space-2xs);
  }
  .notification.medium .content {
    padding: var(--goa-space-s);
    margin-top: calc(-1 * var(--goa-space-3xs));
  }
  .notification.medium .icon {
    padding-top: var(--goa-space-s);
    padding-left: var(--goa-space-2xs);
    padding-right: var(--goa-space-2xs);
  }
</style>
