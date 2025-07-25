<svelte:options customElement="goa-form-step" />

<script lang="ts" context="module">
  export type FormStepStatus = "complete" | "incomplete" | "not-started";

  export type FormStep = {
    current: boolean;
    enabled: boolean;
    childIndex: number;
    ariaLabel: string;
    text: string;
    status: FormStepStatus;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, toBoolean } from "../../common/utils";

  // ======
  // Public
  // ======

  export let text: string;
  export let status: FormStepStatus | undefined = undefined;
  export let last: string = "false";

  // Set by FormStepper parent component
  let current: boolean = false;
  let enabled: boolean = false;
  let childindex: number;
  let arialabel: string = "";

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _isMobile: boolean;
  let _isLoading: boolean = true;
  let _userInitiatedChange = false;

  // ========
  // Reactive
  // ========

  $: _isEnabled = enabled || status === "complete";
  $: _isLast = toBoolean(last);

  onMount(() => {
    // receive notification from parent of resize
    _rootEl.addEventListener("form-stepper:resized", (e: Event) => {
      const { mobile } = (e as CustomEvent).detail;
      _isMobile = mobile;
      _isLoading = false; // Mark as loaded after receiving resize info
    });

    // receive parent el information
    _rootEl.addEventListener("formstepper:init", (e: Event) => {
      const ce = e as CustomEvent<FormStep>;

      arialabel = ce.detail.ariaLabel;
      enabled = ce.detail.enabled;
      childindex = ce.detail.childIndex;
      current = ce.detail.current;
      status = ce.detail.status;
    });

    _rootEl.addEventListener("formstepper:enabled:changed", (e: Event) => {
      const ce = e as CustomEvent<FormStep>;
      enabled = ce.detail.enabled;
    });

    _rootEl.addEventListener("formstepper:current:changed", (e: Event) => {
      const ce = e as CustomEvent<FormStep>;
      const wasCurrent = current;
      enabled = true; // once current it is always enabled
      current = ce.detail.current;

      // Announce step change when becoming current
      if (!wasCurrent && current) {
        // *** To avoid redundant announcement ***
        // Only announce programmatic step changes, not user-initiated ones.
        // When users click a step themselves, they already know they triggered the change and screen readers have already announced the button.
        // Announcing again would be redundant
        // Programmatic changes do need to be announced.
        if (!_userInitiatedChange) {
          setTimeout(() => announceStepChange(), 10);
        }

        // Reset flag after handling to allow future announcements
        _userInitiatedChange = false;
      }
    });

    // notify parent of mount and send reference of self
    dispatchInit(_rootEl);
  });

  function dispatchInit(el: HTMLElement) {
    dispatch(el, "formstep:mounted",
      { el: _rootEl, status },
      { bubbles: true, timeout: 10 },
    );

  }

  function onClick(e: Event) {
    if (!_isEnabled) return;

    // Flag user-initiated navigation to suppress redundant announcements
    _userInitiatedChange = true;

    _rootEl.dispatchEvent(
      new CustomEvent("_click", {
        composed: true,
        bubbles: true,
        detail: { step: +childindex },
      }),
    );
    e.stopPropagation();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      onClick(e);
    }
  }

  function getStatusText(): string {
    if (!status) return "";

    switch (status) {
      case "complete":
        return "Complete";
      case "incomplete":
        return "Incomplete";
      case "not-started":
        return "Not started";
      default:
        return "";
    }
  }

  function getAriaLabel(stepText: string, stepAriaLabel: string): string {
    const stepInfo = stepAriaLabel ? stepAriaLabel + ", " : "";
    const stepName = `Step name: ${stepText}`;
    const statusText = getStatusText();
    if (statusText) {
      return `${stepInfo}${stepName}, Status: ${statusText}`;
    } else {
      return `${stepInfo}${stepName}`;
    }
  }

  function announceStepChange() {
    // Only announce if this step is now current
    if (current && childindex) {
      const announcement = getAriaLabel(text, arialabel);

      const liveRegion = _rootEl.querySelector("[data-live-region]") as HTMLElement;

      if (liveRegion) {
        liveRegion.textContent = "";

        setTimeout(() => {
          liveRegion.textContent = announcement;
        }, 10);
      }
    }
  }
</script>

<div
  bind:this={_rootEl}
  class="step-container"
  class:mobile={_isMobile}
  class:desktop={!_isMobile}
  class:loading={_isLoading}
  class:last={_isLast}
  role="listitem"
  data-status={status}
  aria-current={current ? "step" : "false"}
  data-testid="label"
>
  <!-- ARIA Live Region for announcing step changes -->
  {#if current}
    <div
      data-live-region
      aria-live="assertive"
      aria-atomic="true"
      style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;"
    ></div>
  {/if}

  <div data-testid="status" class="status">
    {#if current}
      {#if _isLast && status === "complete"}
        <goa-icon type="checkmark" inverted />
      {:else}
        <goa-icon type="pencil" theme="filled" />
      {/if}
    {:else if status === "complete"}
      <goa-icon type="checkmark" inverted />
    {:else if status === "incomplete"}
      <goa-icon type="remove" theme="filled" />
    {:else}
      <div data-testid="step-number" class="step-number">
        {childindex || ""}
      </div>
    {/if}
  </div>
  <div class="details">
    <div class="text" data-testid="text">{text}</div>
    {#if status === "incomplete"}
      <div class="subtext" data-testid="subtext">Incomplete</div>
    {/if}
  </div>
  <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
  <button
    type="button"
    disabled={!_isEnabled}
    aria-label={getAriaLabel(text, arialabel)}
    role="presentation"
    data-testid="button"
    on:click={onClick}
    on:keydown={onKeyDown}
    class="step-button"
  ></button>
</div>

<style>
  .step-container {
    position: relative;
    display: flex;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: var(--goa-step-padding);
  }

  .step-container.loading {
    display: none;
  }

  .step-container:focus-within:not([aria-current="step"]) {
    outline: var(--goa-color-interactive-focus) solid var(--goa-border-width-l);
  }

  .step-container:hover:not([aria-current="step"]) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .step-container.desktop {
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  .step-container.desktop .details {
    margin-top: 0.75rem; /* vertical space between step and label */
  }

  .step-container.mobile {
    flex-direction: row;
    align-items: center;
    text-align: start;
    padding: var(--goa-step-padding-vertical);
  }

  .step-container.mobile .details {
    margin-left: var(--goa-space-xs);
  }

  .step-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
  }

  .step-button:disabled {
    cursor: default;
  }

  .status {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 999px;
    border: var(--goa-step-border);
    background: var(--goa-step-color-bg);
    height: var(--goa-step-size);
    width: var(--goa-step-size);
  }

  .status > * {
    fill: var(--fill-color, var(--goa-step-color-bg-complete));
    color: var(--fill-color, var(--goa-step-color-bg-complete));
  }

  [aria-current="step"] .text {
    font: var(--goa-step-typography-label-active);
  }

  [data-status="complete"] .status {
    background: var(--goa-step-color-bg-complete);
  }

  [aria-current="step"][data-status="complete"]:not(.last) .status {
    background: var(--goa-step-color-bg-active);
  }

  .step-number {
    margin-bottom: var(--font-valign-fix);
    font: var(--goa-step-typography-step-number);
    color: var(--goa-step-color-step-number);
  }

  .step-container:not(
      [data-status="complete"],
      [data-status="incomplete"],
      [aria-current="step"]
    )
  .status {
    border-color: var(--goa-step-color-border);
  }

  .text {
    font: var(--goa-step-typography-label);
    color: var(--goa-step-color-label);
  }

  .subtext {
    margin-top: 0.25rem;
    font: var(--goa-step-typography-sublabel);
    color: var(--goa-step-color-sublabel);
  }
</style>
