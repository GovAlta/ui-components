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
      "information",
      "important",
      "emergency",
      "success",
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
      size="1"
    />
  {:else}
    <div class="goa-badge-no-icon"></div>
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
    height: var(--goa-badge-height);
  }

  .goa-badge {
    display: inline-flex;
    height: var(--goa-badge-height);
    width: auto;
    vertical-align: top;
    align-items: center;
    border-radius: var(--goa-badge-border-radius);
    padding: var(--goa-badge-padding);
    gap: var(--goa-badge-gap);
    font-weight: var(--goa-font-weight-regular);
    box-shadow: var(--goa-badge-border); /* inner shadow - new style */
  }

  .icon-only {
    padding: 0 3px;
  }

  .goa-badge-no-icon {
    margin-left: -0.25rem;
  }

  .goa-badge-content {
    font-size: var(--goa-badge-font-size);
    line-height: var(--goa-badge-line-height);
    white-space: nowrap;
    padding-bottom: 3px; /* acumin font requires this to allow for vertical alignment  */
  }

  .goa-badge.badge-information {
    background-color: var(--goa-badge-info-color-bg);
    color: var(--goa-badge-info-color-content);
  }

  .goa-badge.badge-success {
    background-color: var(--goa-badge-success-color-bg);
    color: var(--goa-badge-success-color-content);
  }

  .goa-badge.badge-important {
    background-color: var(--goa-badge-important-color-bg);
    color: var(--goa-badge-important-color-content);
  }

  .goa-badge.badge-emergency {
    background-color: var(--goa-badge-emergency-color-bg);
    color: var(--goa-badge-emergency-color-content);
  }

  .goa-badge.badge-dark {
    background-color: var(--goa-badge-dark-color-bg);
    color: var(--goa-badge-dark-color-content);
  }

  .goa-badge.badge-midtone {
    background-color: var(--goa-badge-midtone-color-bg);
    color: var(--goa-badge-midtone-color-content);
  }

  .goa-badge.badge-light {
    background-color: var(--goa-badge-light-color-bg);
    color: var(--goa-badge-light-color-content);
  }
</style>
