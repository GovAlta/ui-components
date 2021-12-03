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
      <goa-icon type={iconType} inverted size="large" />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="close">
      <goa-icon-button on:click={close} type="close" inverted size="large" />
    </div>
  </div>
{/if}

<!-- Style -->
<style>
  .notification {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 3px;
  }

  .emergency {
    background-color: var(--color-red);
    color: var(--color-white);
  }

  .caution {
    background-color: var(--color-orange);
  }
  .information {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
  .event {
    background-color: var(--color-green);
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
