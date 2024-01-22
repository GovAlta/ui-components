<svelte:options customElement="goa-notification" />

<!-- Script -->
<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Notification type",
    ["emergency", "important", "information", "event"] as const,
    true,
  );
  const [AriaLiveTypes, validateAriaLiveType] = typeValidator(
    "Aria-Live type",
    ["assertive", "off", "polite"] as const,
    true,
  );

  // Type
  type NotificationType = (typeof Types)[number];
  type AriaLiveType = (typeof AriaLiveTypes)[number];

  export let type: NotificationType = "";
  export let maxcontentwidth = "100%";
  export let arialive: AriaLiveType = "polite";

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
    validateAriaLiveType(arialive);
    setTimeout(() => validateType(type), 1);
  });

  function close(e: Event) {
    show = false;
    e.target?.dispatchEvent(new CustomEvent("_dismiss", { composed: true }));
    e.stopPropagation();
  }
</script>

<!-- HTML -->
{#if show}
  <div
    transition:fade
    class="notification {type}"
    style={`--max-content-width: ${maxcontentwidth}`}
  >
    <div
      class="content-container"
      role="alert"
      aria-live={arialive}
      aria-atomic="true"
    >
      <div class="icon">
        <goa-icon
          type={iconType}
          inverted={type === "important" ? "false" : "true"}
        />
      </div>
      <div class="content">
        <slot />
      </div>
      <div class="close">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class={type} on:click={close}>
          <goa-icon
            type="close"
            inverted={type === "important" ? "false" : "true"}
          />
        </button>
      </div>
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
    padding: var(--goa-space-l) var(--goa-space-m);
    display: flex;
  }

  @media not (--mobile) {
    .notification {
      padding: var(--goa-space-l) var(--goa-space-xl);
    }
  }

  @media (--desktop) {
    .notification {
      padding: var(--goa-space-l) calc(3 * var(--goa-space-l));
    }
  }

  .emergency {
    background-color: var(--goa-color-emergency-default);
    color: var(--goa-color-text-light);
  }

  .important {
    background-color: var(--goa-color-warning-default);
    color: var(--goa-color-text-default);
  }

  .information,
  .event {
    background-color: var(--goa-color-info-default);
    color: var(--goa-color-text-light);
  }

  .icon {
    flex: 0 0 auto;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    gap: var(--goa-space-m);
    margin: 0 auto;
    max-width: min(var(--max-content-width), 100%);
  }

  .content {
    flex: 1 1 auto;
  }

  :global(::slotted(a)) {
    color: unset !important;
    outline: unset !important;
  }
  :global(::slotted(a:focus)) {
    outline: auto !important;
    border-radius: var(--goa-border-radius-m);
  }
  .notification.important :global(::slotted(a:focus)) {
    outline: unset !important;
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-black);
    border-radius: var(--goa-border-radius-m);
  }

  .close {
    flex: 0 0 auto;
  }
  /*Close button*/
  .close button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: var(--goa-space-2xs);
    margin: 0;
    outline: none;
    border-radius: var(--goa-border-radius-m);
    display: inline-flex;
  }
  /*Information & Event Close Button*/
  .close button.information:hover,
  .close button.information:focus,
  .close button.event:hover,
  .close button.event:focus {
    background-color: var(--goa-color-info-dark);
  }
  .close button.information:focus,
  .close button.event:focus {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }
  /*Important close button*/
  .close button.important:hover,
  .close button.important:focus {
    background-color: var(--goa-color-warning-dark);
  }
  .close button.important:focus {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-black);
  }
  /*Emergency close button*/
  .close button.emergency:hover,
  .close button.emergency:focus {
    background-color: var(--goa-color-emergency-dark);
  }
  .close button.emergency:focus {
    box-shadow: 0 0 0 3px var(--goa-color-greyscale-white);
  }
</style>
