<svelte:options tag="goa-callout" />

<!-- Script -->
<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Callout type",
    ["emergency", "important", "information", "event", "success"],
    true,
  );

  //Type
  type CalloutType = typeof Types[number];

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "l";
  export let ml: Spacing = null;

  export let type: CalloutType;
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

  onMount(() => {
    setTimeout(() => validateType(type), 1);
  });
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
    font-family: var(--goa-font-family-sans);
  }
  .notification {
    display: flex;
    align-items: stretch;
    border-radius: 3px;
    overflow: hidden;
  }

  h3 {
    font-size: var(--goa-font-size-7);
    line-height: var(--goa-line-height-2);
    font-weight: var(--goa-font-weight-regular);
    margin-top: 0;
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
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 1.75rem;
  }
  .content {
    flex: 1 1 auto;
    background-color: var(--goa-color-greyscale-100);
    padding: 1.75rem;
  }
</style>
