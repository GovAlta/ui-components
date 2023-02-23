<svelte:options tag="goa-popover" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick,onDestroy } from "svelte";
  import { toBoolean } from "../../common/utils";

  export let testid: string = "";
  export let maxwidth: string = "320px";
  export let padded: string = "true";

  let _isContentVisible = false;
  let _targetEl: HTMLElement;


  $: paddedContent = toBoolean(padded);

  onMount(async () => {
    await tick();
    addFocusEventListener();
  });

  onDestroy(() => {
    removeEventListeners();
  });

  function showPopover() {
    _isContentVisible = true;
  }

  function closePopover() {
    _isContentVisible = false;
  }

  const onInputKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case " ":
      case "Enter":
        _isContentVisible ? closePopover() : showPopover();
        e.preventDefault();
        break;
      case "Escape":
        _isContentVisible && closePopover();
        e.preventDefault();
        break;
    }
  };

  function addFocusEventListener() {
    _targetEl.addEventListener("focus", onFocus, true);
  }

  function removeEventListeners() {
    _targetEl.removeEventListener("focus", onFocus);
    _targetEl.removeEventListener("keydown", onInputKeyDown);
  }

  // add required bindings to component
  function onFocus() {
    _targetEl.addEventListener("keydown", onInputKeyDown);
  }

</script>

<!-- HTML -->

<div
  data-testid={testid}>
  <div class="popover-target"
    bind:this={_targetEl}
    on:click={showPopover}
    tabindex="0"
    data-testid="popover-target"
  >
    <slot name="target" tabindex="-1"/>
  </div>
  {#if _isContentVisible}
  <goa-focus-trap active={_isContentVisible}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      data-testid="popover-background"
      class="popover-background"
      on:click={closePopover}
    />
    <div class="popover-container">
      <section data-testid="popover-content"
       class="popover-content"
       style="
        max-width: {maxwidth};
        padding: {paddedContent ? 'var(--goa-space-m)' : '0'}
       "
      >
        <slot />
      </section>
    </div>

  </goa-focus-trap>
  {/if}
</div>



<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font-size: var(--goa-font-size-4);
  }

  .popover-target {
    width: fit-content;
    cursor: pointer;
  }

  .popover-target:focus{
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .popover-content {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 3px;
    list-style-type: none;
    background: var(--goa-color-greyscale-white);
    border-radius: var(--goa-border-radius-m);
    outline: none;
    box-shadow: var(--shadow-1);
    z-index: 99;
  }

  .popover-background {
    cursor: default;
    position: fixed;
    z-index: 98;
    inset: 0;
  }

  .popover-container {
    position: relative;
  }

</style>
