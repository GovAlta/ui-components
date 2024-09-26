<svelte:options customElement="goa-badge" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Badge type",
    [
      "success",
      "important",
      "information",
      "emergency",
      "dark",
      "midtone",
      "light",
    ],
    true,
  );

  //Type
  type BadgeType = (typeof Types)[number];

  export let type: BadgeType;

  // optional
  export let testid: string = "";
  export let content: string = "";
  export let icon: string = "false";
  export let arialabel: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // private
  $: showIcon = toBoolean(icon);
  $: showIconOnly = showIcon && !content;

  $: iconType = {
    success: "checkmark-circle",
    important: "alert-circle",
    information: "information-circle",
    emergency: "warning",
    dark: "information-circle",
    midtone: "information-circle",
    light: "information-circle",
  }[type];

  onMount(() => {
    setTimeout(() => validateType(type), 1);
    if (!showIcon && !content) {
      console.warn(
        "GoABadge must have either then content or icon property set",
      );
    }
    if (showIconOnly && !arialabel) {
      console.warn("GoABadge with icon only requires an arialabel");
    }
  });
</script>

<!-- HTML -->
<div
  style={calculateMargin(mt, mr, mb, ml)}
  data-testid={testid}
  data-type="goa-badge"
  class="goa-badge badge-{type}"
  class:icon-only={showIconOnly}
>
  {#if showIcon}
    <goa-icon
      arialabel={showIconOnly && arialabel ? arialabel : null}
      role={showIconOnly && arialabel ? "presentation" : null}
      type={iconType}
      size="small"
    />
  {:else}
    <div style="height: 1.2rem; margin-left:-0.25rem;" />
  {/if}
  {#if content}
    <div class="goa-badge-content">
      {content}
    </div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  .goa-badge {
    display: inline-flex;
    align-items: center;
    border-radius: 0.25rem;
    padding: 3px 0.5rem; /* is calc(3 / 16 * 1rem) better for scaling? */
    gap: 0.25rem;
    font-weight: var(--goa-font-weight-regular);
  }

  .icon-only {
    padding: 0.25rem;
  }

  .goa-badge-content {
    font-size: var(--goa-font-size-2);
    line-height: var(--goa-line-height-1);
    white-space: nowrap;
    padding-bottom: var(
      --font-valign-fix,
      0
    ); /* acumin font requires this to allow for vertical alignment  */
  }

  .goa-badge.badge-information {
    background-color: var(--goa-color-greyscale-100);
    color: var(--goa-color-info-default);
  }

  .goa-badge.badge-success {
    background-color: var(--goa-color-success-default);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-important {
    background-color: var(--goa-color-warning-default);
    color: var(--goa-color-text-default);
  }

  .goa-badge.badge-emergency {
    background-color: var(--goa-color-emergency-default);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-dark {
    background-color: var(--goa-color-greyscale-black);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-midtone {
    background-color: var(--goa-color-greyscale-700);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-light {
    background-color: var(--goa-color-greyscale-white);
    color: var(--goa-color-text-default);
  }
</style>
