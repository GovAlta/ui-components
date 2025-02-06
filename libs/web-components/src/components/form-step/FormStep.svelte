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
  <div data-testid="status" class="status">
    {#if current}
      <goa-icon type="pencil" theme="filled" />
    {:else if status === "complete"}
      <goa-icon type="checkmark" inverted />
    {:else if status === "incomplete"}
      <goa-icon type="remove" theme="filled"/>
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
    padding: var(--goa-step-padding);
  }
  label:not([aria-disabled="true"]):not([aria-current="step"]):has(input:focus-visible) {
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
    margin-top: 0.75rem; /* vertical space between step and label */
  }
  label.mobile {
    flex-direction: row;
    align-items: center;
    text-align: start;
    padding: var(--goa-step-padding-vertical);
  }
  label.mobile .details {
    margin-left: var(--goa-space-xs);
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

  [aria-current="step"][data-status="complete"] .status {
    background: var(--goa-step-color-bg-active);
  }

  .step-number {
    margin-bottom: var(--font-valign-fix);
    font: var(--goa-step-typography-step-number);
    color: var(--goa-step-color-step-number);
  }

  label:not(
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
