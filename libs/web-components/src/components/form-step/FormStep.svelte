<svelte:options customElement="goa-form-step" />

<script lang="ts">
  import { onMount } from "svelte";
  import { toBoolean, typeValidator } from "../../common/utils";

  // Validator
  const [StatusTypes, validateStatus] = typeValidator(
    "Form Step status",
    ["incomplete", "complete"],
    false,
  );
  type FormStepStatus = (typeof StatusTypes)[number];

  // ======
  // Public
  // ======

  export let text: string;

  // Set by FormStepper parent component
  export let current: string = "false";
  export let enabled: string = "false";
  export let childindex: string = "";
  export let arialabel: string = "";
  export let status: FormStepStatus = "";

  // =======
  // Private
  // =======

  let _stepEl: HTMLElement;
  let _checkbox: HTMLInputElement;
  let _isMobile: boolean;

  // ========
  // Reactive
  // ========

  $: _isCurrent = toBoolean(current);
  $: _isEnabled = toBoolean(enabled) || status === "complete";

  onMount(() => {
    validateStatus(status);
    // event binding
    _stepEl.addEventListener("click", () => {
      if (!_isEnabled) return;

      _checkbox.checked = !_checkbox.checked;
      _stepEl.dispatchEvent(
        new CustomEvent("_click", {
          composed: true,
          bubbles: true,
          detail: +childindex,
        }),
      );
    });

    _stepEl.addEventListener("resized", (e: Event) => {
      const { mobile } = (e as CustomEvent).detail;
      _isMobile = mobile;
    });
  });
</script>

<label
  id={arialabel}
  bind:this={_stepEl}
  class:mobile={_isMobile}
  class:desktop={!_isMobile}
  role="listitem"
  tabindex="-1"
  for={text}
  data-status={status}
  aria-current={_isCurrent ? "step" : "false"}
  aria-label={`${arialabel} ${text} ${status || ""}`}
>
  <input
    id={text}
    bind:this={_checkbox}
    type="checkbox"
    checked={_isCurrent}
    aria-disabled={!_isEnabled}
  />
  <div data-testid="status" class="status">
    {#if _isCurrent}
      <goa-icon type="pencil" />
    {:else if status === "complete"}
      <goa-icon type="checkmark" inverted />
    {:else if status === "incomplete"}
      <goa-icon type="remove" />
    {:else}
      <div data-testid="step-number" class="step-number">{childindex}</div>
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
