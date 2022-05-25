<svelte:options tag="goa-modal" />

<!-- ======================================================================= -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { toBoolean } from "../../common/utils";

  export let heading: string;
  export let closable: string;
  export let scrollable: string; // TODO: determine if this flag is needed or not, things seem to work well with it always 'on'
  export let open: string;
  export let transition: "fast" | "slow" | "none";

  // Temp attribute while deciding on the best way to allow for width control
  export let width: string;

  $: isClosable = toBoolean(closable);
  $: isScrollable = toBoolean(scrollable);
  $: isOpen = toBoolean(open);

  let scrollOffset = 0;
  $: {
    if (isOpen) {
      scrollOffset = window.pageYOffset;
    }
  }

  $: _transitionTime = 
    transition === "none"
      ? 0
      : transition === "slow"
        ? 400
        : 200;

  function close(e) {
    if (!isClosable) {
      return;
    }
    e.target.dispatchEvent(new CustomEvent("_close", { composed: true }));
    e.stopPropagation();
  }
</script>

<!-- ======================================================================= -->
<!-- Script -->

<!-- ======================================================================= -->
<!-- Html -->
<!-- ======================================================================= -->

{#if isOpen}
  <div
    use:noscroll={{ enable: isOpen }}
    in:fade={{ duration: _transitionTime }}
    out:fade={{ delay: _transitionTime, duration: _transitionTime}}
    data-testid="modal"
    class="modal"
    style="--scroll-offset: {scrollOffset}px; {width && `--width: ${width};`};"
  >
    <div data-testid="modal-overlay" class="modal-overlay" on:click={close} />
    <div
      in:fly={{ duration: _transitionTime, y: 200 }}
      out:fly={{ delay: _transitionTime, duration: _transitionTime, y: -100 }}
      class="modal-pane"
    >
      {#if heading}
        <div data-testid="modal-title" class="modal-title">{heading}</div>
      {/if}
      {#if isClosable}
        <div class="modal-close">
          <goa-icon-button
            data-testid="modal-close-button"
            type="close"
            on:click={close}
          />
        </div>
      {/if}
      <div data-testid="modal-content" class="modal-content">
        {#if isScrollable}
          <goa-scrollable direction="vertical" height="50" hpadding="1.75">
            <slot />
          </goa-scrollable>
        {:else}
          <div style="margin: 1.75rem">
            <slot />
          </div>
        {/if}
        <slot />
      </div>
      <div data-testid="modal-actions" class="modal-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}

<!-- ======================================================================= -->
<!-- Css -->

<!-- ======================================================================= -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .modal {
    font-family: var(--font-family);
    position: absolute;
    top: var(--scroll-offset, 0);
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    z-index: 100;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  /* Modal Pane ========================================================================= */

  .modal-pane {
    position: relative;
    background-color: #fff;
    z-index: 1001;
    width: 90%;

    margin: 1rem;
    box-shadow: var(--shadow-2);
    border-radius: 4px;
    max-height: 90%;
  }

  @media (min-width: 640px) {
    .modal-pane {
      width: var(--width, 60ch);
      max-height: 80%;
    }
  }

  /* Modal Actions ============================================================================== */

  .modal-actions {
    text-align: right;
    padding: 0 1.75rem;
    margin: 1.75rem 0;
    flex: 1 1 auto;
  }

  /* Modal Close Icon ======================================================================= */

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  /* Modal Title ============================================================================ */

  .modal-title {
    font-size: var(--fs-xl);
    padding-bottom: 1rem;
    padding: 0 1.75rem;
    margin: 1.75rem 0;
    margin-right: 40px; /*  close icon spacing */
    flex: 0 0 auto;
  }
</style>
