<svelte:options customElement="goa-form-step" />

<script lang="ts" context="module">
  export type FormStepStatus = "complete" | "incomplete";

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

  // ======
  // Public
  // ======

  export let text: string;
  export let status: FormStepStatus | undefined = undefined;

  // Set by FormStepper parent component
  let current: boolean = false;
  let enabled: boolean = false;
  let childindex: number;
  let arialabel: string = "";

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _checkbox: HTMLInputElement;
  let _isMobile: boolean;

  // ========
  // Reactive
  // ========

  $: _isEnabled = enabled || status === "complete";

  onMount(() => {
    // handle click events
    _rootEl.addEventListener("click", () => {
      if (!_isEnabled) return;
      _checkbox.checked = !_checkbox.checked;
      _rootEl.dispatchEvent(
        new CustomEvent("_click", {
          composed: true,
          bubbles: true,
          detail: { step: +childindex },
        }),
      );
    });

    // receive notification from parent of resize
    _rootEl.addEventListener("form-stepper:resized", (e: Event) => {
      const { mobile } = (e as CustomEvent).detail;
      _isMobile = mobile;
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
      enabled = true; // once current it is always enabled
      current = ce.detail.current;
    });

    // notify parent of mount and send reference of self
    dispatchInit(_rootEl);
  });

  function dispatchInit(el: HTMLElement) {
    setTimeout(() => {
      el.dispatchEvent(
        new CustomEvent("formstep:mounted", {
          detail: {
            el: _rootEl,
          },
          composed: true,
          bubbles: true,
        }),
      );
    }, 10);
  }
</script>

<label
  id={arialabel}
  bind:this={_rootEl}
  class:mobile={_isMobile}
  class:desktop={!_isMobile}
  role="listitem"
  tabindex="-1"
  for={text}
  data-status={status}
  aria-current={current ? "step" : "false"}
  aria-label={arialabel || `${text} ${status || ""}`}
  data-testid="label"
>
  <input
    id={text}
    bind:this={_checkbox}
    type="checkbox"
    checked={current}
    aria-disabled={!_isEnabled}
    disabled={!_isEnabled}
    data-testid="checkbox"
  />
  <div data-testid="status" class="status">
    {#if current}
      <goa-icon type="pencil" />
    {:else if status === "complete"}
      <goa-icon type="checkmark" inverted />
    {:else if status === "incomplete"}
      <goa-icon type="remove" />
    {:else}
      <div data-testid="step-number" class="step-number">
        {childindex || ""}
      </div>
    {/if}
  </div>
  <div class="details">
    <div class="text" data-testid="text">{text}</div>
    {#if status === "incomplete"}
      <div class="subtext" data-testid="subtext">Partially complete</div>
    {/if}
  </div>
</label>

<style>
  input[type="checkbox"] {
    position: absolute;
    left: -9999px;
  }

  label {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: var(--goa-space-l);
  }

  label:not([aria-disabled="true"]):not([aria-current="step"]):focus-within,
  label:not([aria-disabled="true"]):not([aria-current="step"]):focus,
  label:not([aria-disabled="true"]):not([aria-current="step"]):active {
    outline: var(--goa-color-interactive-focus) solid var(--goa-border-width-l);
  }

  label:not([aria-disabled="true"]):not([aria-current="step"]):hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  label.desktop {
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  label.desktop .details {
    margin-top: 0.75rem;
  }

  label.mobile {
    flex-direction: row;
    align-items: center;
    text-align: start;
  }

  label.mobile .details {
    margin-left: 1rem;
  }

  .status {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 999px;
    border: 4px solid var(--goa-color-interactive-default);
    background: var(--goa-color-greyscale-white);
    height: 2.5rem;
    width: 2.5rem;
  }

  .status > * {
    fill: var(--fill-color, var(--goa-color-interactive-default));
    color: var(--fill-color, var(--goa-color-interactive-default));
  }

  [aria-current="step"] .text {
    font-weight: var(--goa-font-weight-bold);
  }

  [data-status="complete"] .status {
    background: var(--goa-color-interactive-default);
  }

  [aria-current="step"][data-status="complete"] .status {
    background: var(--goa-color-greyscale-white);
  }

  .step-number {
    margin-bottom: var(--font-valign-fix);
    font-weight: var(--goa-font-weight-bold);
    color: var(--goa-color-text-secondary);
  }

  label:not(
      [data-status="complete"],
      [data-status="incomplete"],
      [aria-current="step"]
    )
    .status {
    border-color: var(--goa-color-greyscale-500);
  }

  .text {
    font: var(--goa-typography-body-s);
  }

  .subtext {
    margin-top: 0.25rem;
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-text-secondary);
  }
</style>
