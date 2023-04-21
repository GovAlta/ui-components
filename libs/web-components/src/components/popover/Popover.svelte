<svelte:options tag="goa-popover" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick,onDestroy } from "svelte";
  import { calculateMargin, Spacing } from "../../common/styling";
  import { toBoolean } from "../../common/utils";

  export let testid: string = "";
  export let maxwidth: string = "320px";
  export let padded: string = "true";

  let _isContentVisible = false;
  let _targetEl: HTMLElement;
  let _popoverEl: HTMLElement;

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;



  $: paddedContent = toBoolean(padded);

  onMount(async () => {
    await tick();
    addFocusEventListener();
  });

  onDestroy(() => {
    removeEventListeners();
  });

  async function showPopover() {
    _isContentVisible = true;
    await tick();
    setPopoverPosition();
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

  function getBoundingClientRectWithMargins(el: Element): Omit<DOMRect, 'toJSON'> {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const mTop = parseInt(style.marginTop, 10) || 0;
    const mRight = parseInt(style.marginRight, 10) || 0;
    const mBottom = parseInt(style.marginBottom, 10) || 0;
    const mLeft = parseInt(style.marginLeft, 10) || 0;

    return {
      top: rect.top - mTop,
      right: rect.right + mRight,
      bottom: rect.bottom + mBottom,
      left: rect.left - mLeft,
      width: rect.width + mLeft + mRight,
      height: rect.height + mTop + mBottom,
      x: rect.x - mLeft,
      y: rect.y - mTop,
    };
  }


  function setPopoverPosition() {
    // Get target and content rectangles
    const targetRect = getBoundingClientRectWithMargins(_targetEl);
    const contentRect = getBoundingClientRectWithMargins(_popoverEl);

    // Calculate available space above and below the target element
    const spaceAbove = targetRect.top;
    const spaceBelow = window.innerHeight - targetRect.bottom;

    // Determine if there's more space above or below the target element
    const displayAbove = spaceAbove > contentRect.height &&
                        spaceAbove > spaceBelow &&
                        spaceBelow < contentRect.height;

    // If there's more space above, display the popover above the target element
    if (displayAbove) {
      _popoverEl.style.top = `${-contentRect.height -targetRect.height - 4}px`;
    } else {
      _popoverEl.style.top = '0px';
    }

    // Move the popover to the left if it is too far to the right and only if there is space to the left
    if (window.innerWidth - targetRect.right < contentRect.width && targetRect.left > contentRect.width) {
      _popoverEl.style.left = `-${(contentRect.width - targetRect.width)}px`;
    } else {
      _popoverEl.style.left = '0px';
    }
  }

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
  data-testid={testid}
  style={calculateMargin(mt, mr, mb, ml)}
  >
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
    <div class="popover-container"
    >
      <section data-testid="popover-content"
       class="popover-content"
       style="
        max-width: {maxwidth};
        padding: {paddedContent ? 'var(--goa-space-m)' : '0'};
       "
       bind:this={_popoverEl}
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
    outline: none;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    z-index: 99;
    width: max-content;
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
