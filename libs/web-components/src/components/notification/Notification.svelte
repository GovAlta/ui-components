<svelte:options tag="goa-notification" />

<!-- Script -->
<script lang="ts">
  import { fade } from "svelte/transition";

  export let type: "emergency" | "caution" | "information" | "event";

  let show = true;
  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "caution"
      ? "alert-circle"
      : type === "information"
      ? "information-circle"
      : "calendar";

  function close() {
    show = false;
  }
</script>

<!-- HTML -->
{#if show}
  <div transition:fade class="notification {type}">
    <div class="icon">
      <goa-icon type={iconType} inverted />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="close">
      <goa-icon-button on:click={close} type="close" inverted />
    </div>
  </div>
{/if}

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .notification {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 3px;
  }

  .emergency {
    background-color: var(--goa-color-status-emergency);
    color: var(--color-white);
  }

  .caution {
    background-color: var(--goa-color-status-warning);
  }
  .information {
    background-color: var(--goa-color-status-info);
    color: var(--color-white);
  }
  .event {
    /* TODO: this color name doesn't make sense */
    background-color: var(--goa-color-status-success);
    color: var(--color-white);
  }

  .icon {
    flex: 0 0 auto;
    align-self: flex-start;
  }
  .content {
    flex: 1 1 auto;
  }
  .close {
    flex: 0 0 auto;
    align-self: flex-start;
  }
</style>
