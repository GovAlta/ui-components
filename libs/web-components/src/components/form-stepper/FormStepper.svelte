<svelte:options customElement="goa-form-stepper" />

<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { onDestroy, onMount, tick } from "svelte";
  import { MOBILE_BP } from "../../common/breakpoints"

  // ======
  // Public
  // ======

  export let step: number = -1;  // this is a 1-based index, -1 is the unset value
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;    // events bound to it
  let _gridEl: HTMLElement;    // used to obtain component dimensions
  let _steps: Element[] = [];  // step DOM elements to allow for width calculations
  let _stepWidth: number;      // calculated x distance (px) between each step point
  let _stepHeight: number;     // calculated y distance (px) between each step point
  let _progressHeight: number; // allow css calculations for mobile view

  let _maxAllowedStep: number = 1;  // prevent users from using the stepper to access future steps
  let _maxProgressStep: number = 1; // controls the progress bars value

  let _showProgressBars = false;  // delays the showing of the progress bars to prevent it from
                                  // being temporarily visible with an unwanted offset

  // ========
  // Reactive
  // ========

  // handles the 1-based step value and the number of line segments is one less
  // than the number of steps
  $: _progress = ((_maxProgressStep - 1) / (_steps.length - 1)) * 100;
  $: setCurrentStepStatus(step);
  $: if (_steps.length) {
    // allow access to all steps if not step property is provided
    if (step <= 0) {
      step = 1;
      setTimeout(() => {
        dispatch(step);
      }, 1);
      _maxAllowedStep = _steps.length;
    }

    if (step > _maxProgressStep) _maxProgressStep = step;
    if (step > _maxAllowedStep) _maxAllowedStep = step;
    _steps.forEach((stepEl: Element, index: number) => {
      stepEl.setAttribute(
        "enabled",
        index > _maxAllowedStep - 1 ? "false" : "true",
      );
    });
  }

  onMount(async () => {
    await tick();

    // children steps
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      _steps = slot.assignedElements();
    } else {
      // for unit tests only
      // @ts-expect-error testing
      _steps = [..._rootEl.querySelector("goa-grid").children] as Element[];
    }

    // set step a11y label
    _steps.forEach((_step: Element, index: number) => {
      const s = _step as HTMLElement;
      s.setAttribute("arialabel", `Step ${index + 1} of ${_steps.length}`);
      s.setAttribute("childindex", `${index + 1}`);
    });

    // handle click events from progress items
    _rootEl.addEventListener("_click", (e: Event) => {
      step = (e as CustomEvent).detail;
      dispatch(step);
    });

    setCurrentStepStatus(step);
    calcStepDimensions();

    setTimeout(() => {
      _showProgressBars = true;
    }, 10);

    // recompute size listeners
    window.addEventListener("orientationchange", calcStepDimensions);

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries.length !== 1) return; 
      calcStepDimensions();

      const width = entries[0].contentRect.width;

      for (const step of _steps) {
        step.shadowRoot
          ?.querySelector("label")
          ?.dispatchEvent(new CustomEvent("resized", { 
            bubbles: true, 
            composed: true,
            detail: {
              mobile: width < MOBILE_BP,
            }
          }))
      }
    });

    resizeObserver.observe(_rootEl)

    return () => resizeObserver.unobserve(_rootEl);
  });

  onDestroy(() => {
    window.removeEventListener("orientationchange", calcStepDimensions);
  })

  function dispatch(step: number) {
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { step },
      }),
    );
  }

  function setCurrentStepStatus(step: number) {
    _steps.forEach((stepEl, index) => {
      stepEl.setAttribute("current", index === step - 1 ? "true" : "false");
    });
  }

  async function calcStepDimensions() {
    // tick required, without it the _steps elements width was not yet updated
    await tick();
    const step = _steps?.[0] as HTMLElement;
    _stepWidth = step?.offsetWidth ?? 0;
    _stepHeight = step?.offsetHeight ?? 0;
    _progressHeight = _gridEl?.offsetHeight;
  }
</script>

<div id="container">
  <div
    class="form-stepper"
    style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --progress: ${_progress}%;
      --step-width: ${_stepWidth}px;
      --step-height: ${_stepHeight}px;
      --height: ${_progressHeight}px;
    `}
    role="list"
    bind:this={_rootEl}
  >
    {#if _steps.length > 0 && _showProgressBars}
      <progress class="horizontal" value={_progress} max="100"></progress>
      <progress class="vertical" value={_progress} max="100"></progress>
    {/if}
    <div class="slots" bind:this={_gridEl}>
      <goa-grid minchildwidth="10ch">
        <slot />
      </goa-grid>
    </div>
  </div>
</div>

<style>
  .slots {
    position: relative;
    inset: 0;
    z-index: 2;
  }

  #container {
    container: self / inline-size;
  }

  progress {
    position: absolute;
    z-index: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border: none;
    background: var(--goa-color-greyscale-200);
    pointer-events: none;
  }

  /* 2.5rem = 40px where 40px = height of form stepper icons */
  /* 2px = 4px / 2, where 4px is thickness of progress bar */
  /* 1.5rem = 24px = padding as per design specs */
  progress.horizontal {
    top: calc(1.5rem + (2.5rem / 2) - 2px);
    left: calc(var(--step-width) / 2);
    width: calc(100% - var(--step-width));
  }

  @container self (--not-mobile) {
    progress.horizontal {
      display: block;
    }
    progress.vertical {
      display: none;
    }
    .form-stepper {
      position: relative;
    }
  }

  /* 1.25rem = 20px = 40px / 2, half the height of the 40px stepper */
  progress.vertical {
    width: calc(var(--height) - var(--step-height));
    transform: rotate(90deg)
      translate(
        calc(50% + 1.25rem + 1.75rem),
        calc((var(--height) - var(--step-height)) / 2 - 1.25rem - 1.5rem)
      );
  }

  @container self (--mobile) {
    progress.horizontal {
      display: none;
    }
    progress.vertical {
      display: inline-block;
    }
    .form-stepper {
      display: block;
    }
  }

  /* iOS tweaks */
  progress::-webkit-progress-value {
    background: var(--goa-color-interactive-default);
  }
  progress::-webkit-progress-bar {
    background: var(--goa-color-greyscale-200);
  }
  progress::-moz-progress-bar {
    background: var(--goa-color-interactive-default);
  }

</style>
