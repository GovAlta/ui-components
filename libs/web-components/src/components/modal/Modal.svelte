<svelte:options tag="goa-modal" />

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import noscroll from "../../common/no-scroll";
  import { toBoolean, typeValidator } from "../../common/utils";
  import { onMount } from "svelte";

  // Public
  export let heading: string = "";
  export let closable: string = "false";
  export let open: string = "false";
  export let transition: Transition = "none";
  export let width: string = "";
  export let calloutvariant: CalloutVariant = null;

  // Private
  let _rootEl: HTMLElement = null;
  let _contentEl: HTMLElement = null;
  let _scrollEl: HTMLElement = null;

  // Type verification
  const [CALLOUT_VARIANT, validateCalloutVariant] = typeValidator("Callout variant", [
    "emergency",
    "important",
    "information",
    "success",
    "event",
  ]);

  const [Transitions, validateTransition] = typeValidator("Modal transition",
    ["fast", "slow", "none"]
  );

  type CalloutVariant = typeof CALLOUT_VARIANT[number];
  type Transition = typeof Transitions[number];

  // Reactive
  $: _isClosable = toBoolean(closable);
  $: _isOpen = toBoolean(open);

  $: if(_isOpen && _scrollEl && _contentEl) {
    const hasScroll = _scrollEl.scrollHeight > _scrollEl.offsetHeight;
    if (hasScroll) {
      _contentEl.classList.add("scroll-top");
    }
  };

  $: if(_isOpen && _contentEl) {
    window.addEventListener('keydown', onInputKeyDown);
  }

  $: _transitionTime = transition === "none" ? 0 : transition === "slow" ? 400 : 200;

  $: _iconType =
    calloutvariant === "emergency"
      ? "warning"
      : calloutvariant === "important"
      ? "alert-circle"
      : calloutvariant === "information"
      ? "information-circle"
      : calloutvariant === "success"
      ? "checkmark-circle"
      : calloutvariant === "event"
      ? "calendar"
      : "";

  $: if (!_isOpen) {
    // prevent null issues
    _contentEl = _scrollEl = _rootEl = null;
    window.removeEventListener('keydown', onInputKeyDown)
  }

  // Hooks
  onMount(() => {
    validateCalloutVariant(calloutvariant);
    validateTransition(transition);
  });

  // Functions
  function close(e: Event) {
    if (!_isClosable) {
      return;
    }
    _rootEl?.dispatchEvent(new CustomEvent("_close", { composed: true }));
    e.stopPropagation();
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        close(e);
        e.preventDefault();
        break;
    }
  };

  function handleScroll(e: CustomEvent) {
    const hasScroll = e.detail.scrollHeight > e.detail.offsetHeight;
    if (_isOpen && hasScroll) {
      const atTop = e.detail.scrollTop == 0;
      const atBottom = Math.abs(e.detail.scrollHeight - e.detail.scrollTop - e.detail.offsetHeight) < 1;

      _contentEl.classList.remove("scroll-top", "scroll-bottom", "scroll-middle");
      if (atTop) {
        _contentEl.classList.add("scroll-top");
      }
      else if (atBottom) {
        _contentEl.classList.add("scroll-bottom");
      }
      else {
        _contentEl.classList.add("scroll-middle");
      }
    }
  }

</script>

{#if _isOpen}
  <goa-focus-trap active={open}>
    <div
      use:noscroll={{ enable: _isOpen }}
      in:fade={{ duration: _transitionTime }}
      out:fade={{ delay: _transitionTime, duration: _transitionTime }}
      data-testid="modal"
      class="modal"
      style={width && `--width: ${width};`}
      bind:this={_rootEl}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div data-testid="modal-overlay" class="modal-overlay" on:click={close} />
      <div
        in:fly={{ duration: _transitionTime, y: 200 }}
        out:fly={{ delay: _transitionTime, duration: _transitionTime, y: -100 }}
        class="modal-pane"
      >
        {#if calloutvariant !== null}
          <div class="callout-bar {calloutvariant}">
            <goa-icon
              type={_iconType}
              inverted={calloutvariant === "important" ? "false" : "true"}
            />
          </div>
        {/if}
        <div class="content">
          <header>
            <div data-testid="modal-title" class="modal-title">
              {#if heading}
                {heading}
              {:else}
                <slot name="heading" />
              {/if}
            </div>
            {#if _isClosable}
              <div class="modal-close">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <goa-icon-button
                  data-testid="modal-close-button"
                  icon="close"
                  on:click={close}
                  variant="nocolor"
                />
              </div>
            {/if}
          </header>
          <div data-testid="modal-content" class="modal-content" bind:this={_contentEl}>
            <goa-scrollable direction="vertical" hpadding="1.9rem" maxheight="70vh" bind:this={_scrollEl} on:_scroll={handleScroll}>
              <slot />
            </goa-scrollable>
          </div>
          <div class="modal-actions" data-testid="modal-actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </goa-focus-trap>
{/if}

<!-- ======================================================================= -->
<!-- Css -->

<!-- ======================================================================= -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host * {
    box-sizing: border-box;
  }

  .modal {
    font-family: var(--goa-font-family-sans);
    position: fixed;
    inset: 0;
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

  .callout-bar {
    flex: 0 0 3rem;
    text-align: center;
    padding-top: 2rem;
    border-radius: 4px 0px 0px 4px;
  }
  .content {
    flex: 1 1 auto;
    width: 100%;
    margin: 2rem;
  }
  .content header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;
  }

  .modal-pane {
    position: relative;
    background-color: #fff;
    z-index: 1001;
    width: 90%;
    display: flex;
    box-shadow: var(--goa-shadow-modal);
    border-radius: 4px;
    border: 1px solid var(--goa-color-greyscale-700);
  }

  @media (min-width: 640px) {
    .modal-pane {
      width: var(--width, 60ch);
    }
  }

  .modal-actions ::slotted(*) {
    padding: 1.5rem 0 0;
  }

  .modal-content {
    margin: 0 -2rem;
    line-height: 1.75rem;
  }

  .modal-content ::slotted(:last-child) {
    margin-bottom: 0 !important;
  }

  .modal-title {
    font-size: var(--goa-font-size-7);
    flex: 0 0 auto;
  }

  .scroll-top {
    box-shadow: inset 0px -8px 6px -6px rgba(0, 0, 0, 0.1);
  }

  .scroll-middle {
    box-shadow: inset 0px -8px 6px -6px rgba(0, 0, 0, 0.1), inset 0px 8px 6px -6px rgba(0, 0, 0, 0.1);
  }

  .scroll-bottom {
    box-shadow: inset 0px 8px 6px -6px rgba(0, 0, 0, 0.1);
  }
</style>
