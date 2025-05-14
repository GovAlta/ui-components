<svelte:options customElement="goa-snackbar" />

<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator } from "../../common/utils";

  // Validators
  const [Types, validateType] = typeValidator("Snackbar type", [
    "basic",
    "success",
    "failure",
  ]);

  const [VerticalPositions, validateVerticalPosition] = typeValidator("Snackbar vertical position", [
    "top",
    "bottom",
  ]);

  const [HorizontalPositions, validateHorizontalPosition] = typeValidator("Snackbar horizontal position", [
    "left",
    "center",
    "right",
  ]);

  // Types
  type SnackbarType = (typeof Types)[number];
  type SnackbarVerticalPosition = (typeof VerticalPositions)[number];
  type SnackbarHorizontalPosition = (typeof HorizontalPositions)[number];

  // Props
  export let type: SnackbarType = "basic";
  export let duration: number = 4000;
  export let progress: number = -1; // -1 = hidden, 0-100 = show
  export let testid: string = "";
  export let visible: boolean = false;
  export let verticalPosition: SnackbarVerticalPosition = "bottom";
  export let horizontalPosition: SnackbarHorizontalPosition = "left";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Reactive
  $: snackbarClass = type;
  $: isShowProgress = progress >= 0 && progress <= 100;
  $: isVisible = visible;
  $: verticalPositionClass = verticalPosition;
  $: horizontalPositionClass = horizontalPosition;

  onMount(() => {
    validateType(type);
    validateVerticalPosition(verticalPosition);
    validateHorizontalPosition(horizontalPosition);

    if (duration > 0) {
      setTimeout(() => {
        isVisible = false;
      }, duration);
    }
  });
</script>

<div
  class="snackbar {snackbarClass} {verticalPositionClass} {horizontalPositionClass} {isVisible ? 'show' : ''}"
  data-testid={testid}
  style={calculateMargin(mt, mr, mb, ml)}
>
  {#if type === "success"}
    <goa-icon type="checkmark-circle" />
  {/if}

  {#if type === "failure"}
    <goa-icon type="close-circle" />
  {/if}

  <span><slot /></span>

  {#if $$slots.actions}
    <div class="actions">
      <slot name="actions" />
    </div>
  {/if}

  {#if isShowProgress}
    <div class="progress-bar" style="width: {progress}%"></div>
  {/if}
</div>

<style>
  .snackbar {
    position: fixed;
    min-width: 360px;
    max-width: 640px;
    background: var(--goa-color-greyscale-black); /* Basic */
    color: var(--goa-color-text-light);
    padding: var(--goa-space-m) var(--goa-space-l);
    border-radius: var(--goa-border-radius-m);
    display: none;
    align-items: center;
    gap: var(--goa-space-m);
    transition:
      opacity 0.3s ease,
      bottom 0.3s ease;
    overflow: hidden;
    z-index: var(--goa-z-index-snackbar);
    border: 1px solid var(--goa-color-greyscale-700);
    box-shadow: none;
  }

  .snackbar.top {
    top: 20px;
  }

  .snackbar.bottom {
    bottom: 20px;
  }

  .snackbar.left {
    left: 20px;
    transform: none;
  }

  .snackbar.center {
    left: 50%;
    transform: translateX(-50%);
  }

  .snackbar.right {
    right: 20px;
    transform: none;
  }

  .snackbar.show {
    display: flex;
  }

  .snackbar.success {
    background: var(--goa-color-success-default);
  }

  .snackbar.failure {
    background: var(--goa-color-emergency-default);
  }

  .snackbar .goa-icon {
    margin-right: var(--goa-space-s);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .snackbar span {
    flex: 1;
    display: flex;
    align-items: center;
    font: var(--goa-typography-body-m);
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.7);
  }
</style>
