<svelte:options tag="goa-notification" />

<!-- Script -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { typeValidator, toBoolean } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Notification type",
    ["emergency", "important", "information", "event"],
    true,
  );

  // Type
  type NotificationType = (typeof Types)[number];

  export let type: NotificationType = "";

  let show = true;
  $: iconType =
    type === "emergency"
      ? "warning"
      : type === "important"
      ? "alert-circle"
      : type === "information"
      ? "information-circle"
      : type === "event"
      ? "calendar"
      : "";

  onMount(() => {
    validateType(type);
  })

  function close() {
    show = false;
  }
</script>

<!-- HTML -->
{#if show}
  <div transition:fade class="notification {type}">
    <div class="icon">
      <goa-icon type={iconType} inverted={type === "important" ? "false" : "true"} />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="close">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
        <goa-icon-button on:click={close} icon="close" variant="dark"
        inverted={type === "important" ? "false" : "true"}/>
    </div>
  </div>
{/if}

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .notification {
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
  }

  .emergency {
    background-color: var(--goa-color-emergency-default);
    color: var(--goa-color-greyscale-white);
  }

  .important {
    background-color: var(--goa-color-warning-default);
  }

  .information {
    background-color: var(--goa-color-info-default);
    color: var(--goa-color-greyscale-white);
  }
  .event {
    /* TODO: this color name doesn't make sense */
    background-color: var(--goa-color-success-default);
    color: var(--goa-color-greyscale-white);
  }

  .icon {
    flex: 0 0 auto;
  }
  .content {
    flex: 1 1 auto;
  }

  ::slotted(a) {
    color: unset !important;
    outline: unset !important;
  }

  .close {
    flex: 0 0 auto;
  }
</style>
