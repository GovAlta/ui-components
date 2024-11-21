<svelte:options customElement="goax-form-step" />

<script lang="ts" context="module">
  export type FormStepStatus = "complete" | "incomplete";

  export type FormStep = {
    current: boolean;
    enabled: boolean;
    childIndex: number;
    ariaLabel: string;
    text: string;
    mobile: boolean;
    backgroundColor: string;
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
  let _backgroundColor: string;

  // ========
  // Reactive
  // ========

  $: _isEnabled = enabled || status === "complete";

  onMount(() => {
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
      _isMobile = ce.detail.mobile;
      _backgroundColor = ce.detail.backgroundColor;
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
            status,
          },
          composed: true,
          bubbles: true,
        }),
      );
    }, 10);
  }

  function onClick(e: Event) {
    if (!_isEnabled) return;

    _checkbox.checked = !_checkbox.checked;
    _rootEl.dispatchEvent(
      new CustomEvent("_click", {
        composed: true,
        bubbles: true,
        detail: { step: +childindex },
      }),
    );
    e.stopPropagation();
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
  style={`
      --background-color: ${_backgroundColor};
    `}
>
  <input
    id={text}
    bind:this={_checkbox}
    type="checkbox"
    checked={current}
    aria-disabled={!_isEnabled}
    disabled={!_isEnabled}
    data-testid="checkbox"
    on:click={onClick}
  />
  <div
    data-testid="status"
    class="status"
    class:incomplete={status === "incomplete"}
    class:current={current}
  >
    {#if !current && status === "complete"}
      <goa-icon type="checkmark" inverted />
    {:else}
      <div data-testid="step-number" class="step-number">
        {childindex || ""}
      </div>
    {/if}
  </div>
  {#if !_isMobile}
    <div class="details">
      <div class="text" data-testid="text">{text}</div>
    </div>
  {/if}
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
    /*padding: var(--goa-space-l);*/
    padding: 24px 12px 48px;
  }
  label.mobile {
    padding-bottom: 24px;
    justify-content: center;
    background-color: var(--background-color, inherit);
    padding-left: 8px;
    padding-right: 8px;
    max-width:fit-content;
  }

  label.desktop {
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  label.desktop .details {
    margin-top: 24px;
  }

  label.mobile {
    flex-direction: row;
    align-items: center;
    text-align: start;
  }

  .status {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 999px;
    border: 2px solid var(--goa-color-interactive-default);
    background: var(--goa-color-greyscale-white);
    height: 2.5rem;
    width: 2.5rem;
  }

  .status.incomplete {
    background: var(--goa-color-greyscale-200);
    border: 2px solid var(--goa-color-greyscale-200);
  }
  .status.current {
    background: var(--goa-color-greyscale-white);
    border: 2px solid var(--goa-color-interactive-default);
  }

  .status.incomplete span {
    color: var(--goa-color-greyscale-700);
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

  .status.current .step-number {
    color: var(--goa-color-interactive-default);
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
    /*font family according to the figma */
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
  }
</style>
