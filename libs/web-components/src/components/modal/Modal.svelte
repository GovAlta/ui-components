<svelte:options tag="goa-modal" />

<!-- ======================================================================= -->
<!-- Script -->
<!-- ======================================================================= -->

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { toBoolean } from "../../common/utils";

  export let title: string;
  export let closable: string;
  export let scrollable: string;  // TODO: determine if this flag is needed or not, things seem to work well with it always 'on'
  export let open: string;

  $: isClosable = toBoolean(closable);
  $: isScrollable = toBoolean(scrollable);
  $: isOpen = toBoolean(open);

  let scrollOffset = 0;
  $: {
    if (isOpen) {
      scrollOffset = window.pageYOffset;
    }
  }

  function close(e) {
    e.target.dispatchEvent(new CustomEvent("_close", { composed: true }));
    e.stopPropagation();
  }
</script>

<!-- ======================================================================= -->
<!-- Html -->
<!-- ======================================================================= -->

{#if isOpen}
  <div use:noscroll={{enable: isOpen}} in:fade={{duration: 200}} out:fade={{delay: 200, duration: 200}} class="modal" style="--scroll-offset: {scrollOffset}px">
    <div class="modal-overlay" on:click={close}></div>
    <div in:fly={{duration: 200, y: 200}} out:fly={{delay: 200, duration: 200, y: -100}} class="modal-pane">
      {#if title}
        <div class="modal-title">{title}</div>
      {/if}
      {#if isClosable}
        <div class="modal-close">
          <goa-icon-button type='close' on:click={close} />
        </div>
      {/if}
      <div class="modal-content">
        {#if isScrollable}
          <goa-scrollable direction="vertical" height="50" hpadding="1.75" >
            <slot />
          </goa-scrollable>
        {:else}
          <div style="margin: 1.75rem" >
            <slot />
          </div>
        {/if}
        <slot />
      </div>
      <div class="modal-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}

<!-- ======================================================================= -->
<!-- Css -->
<!-- ======================================================================= -->

<style>
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
    max-width: 60ch;

    margin: 1rem;
    box-shadow: var(--shadow-2);
    border-radius: 4px;
    width: 90%;
    max-height: 90%;
  }

  @media (min-width: 640px) {
    .modal-pane {
      margin: 1rem;
      max-height: 80%;
      width: 600px;
    }
  }
  @media (min-width: 1024px) {
    .modal-pane {
      width: 65ch;
      max-height: 80%;
    }
  }

  /* Modal Actions ============================================================================== */

  .modal-actions {
    text-align: right;
    padding: 0 1.75rem;
    margin: 1.75rem 0;
    flex: 1 1  auto;
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
