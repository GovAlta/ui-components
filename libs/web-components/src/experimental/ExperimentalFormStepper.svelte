<svelte:options customElement="goax-form-stepper" />

<script lang="ts">
  import { calculateMargin } from "../common/styling";
  import type { Spacing } from "../common/styling";
  import { onDestroy, onMount, tick } from "svelte";

  import type { FormStep, FormStepStatus } from "./ExperimentalFormStep.svelte";
  import { toBoolean } from "../common/utils";

  // ======
  // Public
  // ======

  // this is a 1-based index, -1 is the unset value
  export let step: number = -1;
  export let testid: string = "";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let mobile: string = "false";
  export let backgroundcolor: string = "inherit";


  // =======
  // Private
  // =======

  // events bound to it
  let _rootEl: HTMLElement;

  // used to obtain component dimensions
  let _gridEl: HTMLElement;

  // collection of references to the child goa-form-step web components
  let _steps: { el: HTMLElement, status: FormStepStatus}[] = [];

  // calculated x distance (px) between each step point
  let _stepWidth: number;

  // calculated y distance (px) between each step point
  let _stepHeight: number;

  let _formStepperWidth: number;

  let _stepType: "free" | "constrained" | undefined;

  // allow css calculations for mobile view
  let _progressHeight: number;

  // current max progress
  let _progress: number = 0;

  // 1-based index that holds on the the previous step when the step changes
  let _currentStep: number;

  // prevent users from using the stepper to access future steps
  let _maxAllowedStep: number = 1;

  // delays the showing of the progress bars to prevent it from being temporarily
  // visible with an unwanted offset
  let _showProgressBars = false;

  // setTimeout id to allow only one of the child `mounted` events to call on the
  // parent setup steps
  let _bindTimeoutId: any;

  // ========
  // Reactive
  // ========

  // allow access to all steps if not step property is provided
  $: _maxAllowedStep = Math.max(_currentStep || 1, _maxAllowedStep || 1);
  $: _isMobile = toBoolean(mobile);
  $: _backgroundColor = backgroundcolor;

  // update components when step changed externally
  $: if (step > 0 && _currentStep !== step) {
    changeStep(step);
  }

  // update progress on step changes
  $: if (_currentStep) {
    calculateProgress();
  }

  $: step = +step;

  let resizeObserver: ResizeObserver;

  // =====
  // Hooks
  // =====

  onMount(async () => {
    await tick();  // needed to ensure Angular's delay, when rendering within a route, doesn't break things

    _stepType = +step === -1 ? "free" : "constrained";

    getChildren();

    // observer required to allow the parent to relay resize info down to the children, as the
    // children need to change layout based on the parent's width
    resizeObserver = createResizeNotififications();
    resizeObserver.observe(_rootEl);
  });

  onDestroy(() => {
    window.removeEventListener("orientationchange", calcStepDimensions);
    resizeObserver.unobserve(_rootEl);
  });

  // ====
  // Functions
  // ====

  // Wait for children's mounted events, then continue setup
  function getChildren() {
    // listen for children mounts, then relay information back to them
    _rootEl.addEventListener("formstep:mounted", (e: Event) => {
      const ce = e as CustomEvent;
      const { el, status } = ce.detail;

      // save collection to allow for later event dispatching
      _steps = [..._steps, { el, status }];

      // ensure the below binding is only fired once per set of children
      if (_bindTimeoutId) {
        clearTimeout(_bindTimeoutId);
      }

      _bindTimeoutId = setTimeout(() => {
        bindChildren();
        calcStepDimensions();
        addClickListener();
        addOrientationChangeListener();
        _currentStep = step < 1 ? 1 : step;
        dispatchCurrentStep(); // so app can display first step's content
      });

    });
  }

  // send details down to each of the children
  function bindChildren() {
    for (const [i, stepItem] of _steps.entries()) {
      const stepIndex = i + 1;

      const formStep: Partial<FormStep> = {
        ariaLabel: `Step ${stepIndex} of ${_steps.length}`,
        childIndex: stepIndex,
        current: step === -1 ? stepIndex === 1 : stepIndex === step,
        enabled: stepIndex <= step || _stepType === "free",
        status: stepItem.status,
        mobile: _isMobile,
        backgroundColor: _backgroundColor,
      };

      stepItem.el.dispatchEvent(
        new CustomEvent<Partial<FormStep>>("formstepper:init", {
          composed: true,
          detail: formStep,
        }),
      );
    }
  }

  // step dimensions must be recalculated on device rotations
  function addOrientationChangeListener() {
    window.addEventListener("orientationchange", calcStepDimensions);
  }

  // handle child click events
  function addClickListener() {
    // handle click events from progress items
    _rootEl?.addEventListener("_click", (e: Event) => {
      const nextStep = (e as CustomEvent).detail.step;
      changeStep(nextStep);
    });
  }

  // since container queries don't work within the form steps, due to their width not changing on
  // formstepper resizes, this observer is needed to inform the children if the parent's width
  // is less than the @container breakpoint
  function createResizeNotififications(): ResizeObserver {
    return new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries.length !== 1) return;
      calcStepDimensions();

      const width = entries[0].contentRect.width;

      for (const step of _steps) {
        step.el.dispatchEvent(
          new CustomEvent("form-stepper:resized", {
            bubbles: true,
            composed: true,
            detail: {
              testid,
              mobile: _isMobile,
            },
          }),
        );
      }
    });
  }

  // change current step state and update children
  function changeStep(nextStep: number) {
    if (_steps.length === 0) return;

    // deactivate current step (currentStep is initially undefined)
    if (_currentStep > 0) {
      _steps[_currentStep - 1].el.dispatchEvent(
        new CustomEvent("formstepper:current:changed", {
          detail: { current: false },
          composed: true,
        }),
      );
    }

    // activate new step
    _steps[nextStep - 1].el.dispatchEvent(
      new CustomEvent("formstepper:current:changed", {
        detail: { current: true },
        composed: true,
      }),
    );

    _currentStep = nextStep;
    calculateProgress();
    dispatchCurrentStep();
  }

  // handles the 1-based step value and the number of line segments is one less
  // than the number of steps
  function calculateProgress() {
    // The final step is not included in the progress calculation
   _progress = _isMobile ? 100 : (_currentStep/ (_steps.length - 1)) * 100;
  }

  function calcStepDimensions() {
    const el = _steps?.[0]?.el;
    _stepWidth = el?.offsetWidth ?? 0;
    _stepHeight = el?.offsetHeight ?? 0;
    _progressHeight = _gridEl?.offsetHeight;
    _formStepperWidth = _gridEl?.offsetWidth;

    // ensure progress bar is not shows until initial calcs are complete, timeout needed to
    // prevent flickering of the scrollbar
    setTimeout(() => _showProgressBars = true, 100);
  }

  // notify outside app of step change
  function dispatchCurrentStep() {
    _rootEl?.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { step: +_currentStep, stepIndex: +_currentStep - 1 },
      }),
    );
  }
</script>

<div id="container">
  <div
    class="form-stepper"
    class:mobile={_isMobile}
    style={`
      ${calculateMargin(mt, mr, mb, ml)};
      --progress: ${_progress}%;
      --step-width: ${_stepWidth}px;
      --step-height: ${_stepHeight}px;
      --form-stepper-width: ${_formStepperWidth}px;
      --height: ${_progressHeight}px;
    `}
    role="list"
    bind:this={_rootEl}
    data-testid={testid}
  >
    <div class="slots" bind:this={_gridEl}>
      <div class="goa-grid" class:mobile={_isMobile}
           style={`--min-child-width: ${_isMobile ? "40px" : "108px"};
        gap: var(--goa-space-${_isMobile ? "xs" : "none"});`}
      >
        <slot />
      </div>
    </div>
    {#if _steps.length > 0 && _showProgressBars}
      <progress class="horizontal" class:mobile={_isMobile}  value={_progress} max="100"></progress>
    {/if}
  </div>
</div>

<style>
  .goa-grid {
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(var(--min-child-width), 1fr)
      );
  }
  .goa-grid.mobile {
    display:flex;
    justify-content: space-around;
  }
  .slots {
    position: relative;
    inset: 0;
    z-index: 2;
  }

  #container {
    container: self / inline-size;
  }
  .form-stepper.mobile {
    justify-content: center;
    padding-left: 8px;
    padding-right: 8px;
  }
  .form-stepper.mobile progress {
    position: absolute;
    z-index: 1;
  }
  .form-stepper.mobile progress.horizontal {
    margin-top:0px;
    top: 43px;
    width: var(--form-stepper-width);
    height: 1px;
  }
  progress {
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    border: none;
    background: var(--goa-color-greyscale-200);
    pointer-events: none;
  }

  /* 2.5rem = 40px where 40px = height of form stepper icons */
  /* 2px = 4px / 2, where 4px is thickness of progress bar */
  /* 1.5rem = 24px = padding as per design specs */
  progress.horizontal {
    margin-top: -28px;
    width: 100%;
  }

  .form-stepper {
    padding-bottom: 24px;
  }
  progress.horizontal {
    display: block;
  }

  .form-stepper {
    position: relative;
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
