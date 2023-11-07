<svelte:options tag="goa-form-stepper" />

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { onMount, tick } from "svelte";

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
  $: _progress = (_maxProgressStep-1) / (_steps.length-1) * 100;
  $: setCurrentStepStatus(step);
  $: if (_steps.length) {
    // allow access to all steps if not step property is provided
    if (step <= 0) {
      step = 1;
      setTimeout(() => {
        dispatch(step);
      }, 1)
      _maxAllowedStep = _steps.length;
    }

    if (step > _maxProgressStep) _maxProgressStep = step;
    if (step > _maxAllowedStep) _maxAllowedStep = step;
    _steps.forEach((stepEl: Element, index: number) => {
      stepEl.setAttribute("enabled", index > _maxAllowedStep - 1 ? "false" : "true")
    })
  }

  onMount(async () => {
    await tick()

    // children steps
    const slot = _rootEl.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      _steps = slot.assignedElements();
    } else {
      // for unit tests only
      _steps = [..._rootEl.querySelector("goa-grid").children] as Element[];
    }

    // set step a11y label
    _steps.forEach((_step: Element, index: number) => {
      const s = _step as HTMLElement
      s.setAttribute("arialabel", `Step ${index+1} of ${_steps.length}`);
      s.setAttribute("childindex", `${index+1}`);
    })

    // handle click events from progress items
    _rootEl.addEventListener("_click", (e: Event) => {
      step = (e as CustomEvent).detail;
      dispatch(step);
    })

    setCurrentStepStatus(step)
    calcStepDims();

    setTimeout(() => {
      _showProgressBars = true;
    }, 10)

    // FIXME: use bind:clientWidth instead
    // add listener to recalculate the step widths
    window.addEventListener('resize', calcStepDims);
    window.addEventListener('orientationchange', calcStepDims);
		return () => {
			window.removeEventListener('resize', calcStepDims);
			window.removeEventListener('orientationchange', calcStepDims);
		}
  })

  function dispatch(step: number) {
    _rootEl.dispatchEvent(new CustomEvent("_change", {
      composed: true,
      bubbles: true,
      detail: { step }
    }))
  }

  function setCurrentStepStatus(step: number) {
    _steps.forEach((stepEl, index) => {
      stepEl.setAttribute("current", index === (step-1) ? "true" : "false");
    })
  }

  function calcStepDims() {
    // timeout required, without it the _steps elements width was not yet updated
    setTimeout(() => {
      _stepWidth = _steps.length > 0 && (_steps[0] as HTMLElement).offsetWidth;
      _stepHeight = _steps.length > 0 && (_steps[0] as HTMLElement).offsetHeight;
      _progressHeight = _gridEl?.offsetHeight;
    }, 1)
  }
</script>

<style>
  .root {
    container: self / inline-size;
  }

  .form-stepper {
    position: relative;
  }

  .slots {
    position: relative;
    inset: 0;
    z-index: 2;
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
    display: block;
    top: calc(1.5rem + (2.5rem / 2) - 2px);
    left: calc(var(--step-width) / 2);
    width: calc(100% - var(--step-width));
  }

  /* 1.25rem = 20px = 40px / 2, half the height of the 40px stepper */
  progress.vertical {
    display: none;
    width: calc(var(--height) - var(--step-height));
    transform:
      rotate(90deg)
      translate(
        calc(50% + 1.25rem + 1.75rem),
        calc((var(--height) - var(--step-height)) / 2 - 1.25rem - 1.5rem)
      );
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

  @container self (--container-mobile) {
    progress.horizontal {
      display: none;
    }
    progress.vertical {
      display: inline-block;
    }
    .form-stepper {
      display: inline-block;
    }
  }

</style>

<div class="root">
  <div
    class="form-stepper"
    role="list"
    style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --progress: ${_progress}%;
      --step-width: ${_stepWidth}px;
      --step-height: ${_stepHeight}px;
      --height: ${_progressHeight}px;
    `}
    bind:this={_rootEl}
  >
    {#if _steps.length > 0 && _showProgressBars}
      <progress class="horizontal" value={_progress} max="100"></progress>
      <progress class="vertical" value={_progress} max="100"></progress>
    {/if}
    <div class="slots" bind:this={_gridEl}>
      <goa-grid minchildwidth="16ch">
        <slot />
      </goa-grid>
    </div>
  </div>
</div>
