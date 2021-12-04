<svelte:options tag="goa-modal" />

<!-- ======================================================================= -->
<!-- Script -->
<!-- ======================================================================= -->

<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let open: boolean;
  export let isclosable: boolean;
  export let title: string;

  let scrollOffset = 0;
  $: {
    if (open) {
      hideScrollbars()
      scrollOffset = window.pageYOffset;
    } else {
      resetScrollbars();
    }
  }

  function close(e) {
    e.target.dispatchEvent(new CustomEvent("on:close", { composed: true }));
    e.stopPropagation();
  }

  function hideScrollbars() {
    const scrollbarWidth = calculateScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  }

  function resetScrollbars() {
    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    }, 500); // 500ms allows for any close animations to complete
  }

  function calculateScrollbarWidth() {
    // no scrollbars present
    if (document.body.clientHeight <= document.documentElement.clientHeight) {
      return 0;
    }

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

</script>

<!-- ======================================================================= -->
<!-- Html -->
<!-- ======================================================================= -->

{#if open}
<div transition:fade={{duration: 200}} class="modal" style="--scroll-offset: {scrollOffset}px">
  <div class="modal-overlay" on:click={close}></div>
  <div in:fly={{duration: 200, y: 200}} out:fly={{duration: 200, y: -100}} class="modal-pane">
    {#if title}
      <div class="modal-title">{title}</div>
    {/if}
    {#if isclosable}
      <div class="modal-close">
        <goa-icon-button type='close' on:click={close} />
      </div>
    {/if}
    <div class="modal-content">
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
    padding: 1.75rem;

    margin: 1rem;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 639px) {
    .modal-pane {
      width: 90%;
      max-height: 90%;
    }
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
    }
  }

  /* Modal Actions ============================================================================== */

  .modal-actions {
    text-align: right;
    padding-top: 1.75rem;;
    flex: 0 0 auto;
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
    margin-right: 40px; /*  close icon spacing */
    flex: 0 0 auto;
  }
</style>
