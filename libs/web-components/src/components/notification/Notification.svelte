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
    font-family: var(--font-family);
  }
  .notification {
    padding: 1.5rem;
    display: flex;
    gap: 1rem;
  }

  .emergency {
    background-color: var(--goa-color-status-emergency);
    color: var(--color-white);
  }

  .important {
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
