<svelte:options tag="goa-callout" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "l";
  export let ml: Spacing = null;

  export let type: "emergency" | "important" | "information" | "event" | "success";
  export let heading: string = "";
  export let testid: string = "";

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
</script>

<!-- HTML -->
<div 
  style={calculateMargin(mt, mr, mb, ml)}
  class="notification" 
  data-testid={testid}
>
  <span class="icon {type}">
    <goa-icon type={iconType} inverted={type === "important" ? "false" : "true"} />
  </span>
  <span class="content">
    {#if heading }
      <h3>{heading}</h3>
    {/if}
    <slot />
  </span>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .notification {
    display: flex;
    align-items: stretch;
    border-radius: 3px;
    overflow: hidden;
  }

  h3 {
    font-size: var(--fs-xl);
    line-height: var(--lh-base);
    font-weight: var(--fw-regular);
    margin-top: 0;
  }

  .emergency {
    background-color: var(--goa-color-status-emergency);
  }
  .important {
    background-color: var(--goa-color-status-warning);
  }
  .information {
    background-color: var(--goa-color-status-info);
  }
  .event {
    background-color: var(--goa-color-status-info);
  }
  .success {
    background-color: var(--goa-color-status-success);
  }

  .icon {
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 1.75rem;
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--color-gray-100);
    padding: 1.75rem;
  }
</style>
