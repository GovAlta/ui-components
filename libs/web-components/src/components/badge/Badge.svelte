<svelte:options tag="goa-badge" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { toBoolean } from "../../common/utils";

  export let type:
    | "success"
    | "important"
    | "information"
    | "emergency"
    | "dark"
    | "midtone"
    | "light";

  // optional
  export let testid: string = "";
  export let content: string = "";
  export let icon: string = "false";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  $: showIcon = toBoolean(icon);

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
    if (!showIcon && !content) {
      console.warn("GoABadge must have either then content or icon property set");
    }
  });
</script>

<!-- HTML -->
<div
  style={calculateMargin(mt, mr, mb, ml)}
  data-testid={testid}
  data-type="goa-badge"
  class="goa-badge badge-{type}"
  class:icon-only={showIcon && !content}
>
  {#if showIcon}
    <goa-icon type={iconType} size="small" />
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
    font-family: var(--font-family);
  }

  .goa-badge {
    display: inline-flex;
    align-items: center;
    border-radius: 0.25rem;
    padding: 3px 0.5rem; /* is calc(3 / 16 * 1rem) better for scaling? */
    gap: 0.25rem;
    font-weight: var(--fw-regular);
  }

  .icon-only {
    padding: 0.25rem;
  }

  .goa-badge-content {
    text-transform: capitalize;
    font-size: var(--fs-sm);
    line-height: var(--lh-sm);
    padding-bottom: var(
      --font-valign-fix
    ); /* acumin font requires this to allow for vertical alignment  */
  }

  .goa-badge.badge-information {
    background-color: var(--color-gray-100);
    color: var(--goa-color-status-info);
  }

  .goa-badge.badge-success {
    background-color: var(--goa-color-status-success);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-important {
    background-color: var(--goa-color-status-warning);
    color: var(--goa-color-text);
  }

  .goa-badge.badge-emergency {
    background-color: var(--goa-color-status-emergency);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-dark {
    background-color: var(--color-black);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-midtone {
    background-color: var(--color-gray-600);
    color: var(--goa-color-text-light);
  }

  .goa-badge.badge-light {
    background-color: var(--color-white);
    color: var(--goa-color-text);
  }
</style>
