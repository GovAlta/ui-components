<svelte:options
  customElement={{
    tag: "goa-linear-progress",
    props: {
      testid: { type: "String", attribute: "testid", reflect: true },
      progress: { type: "Number", attribute: "progress" },
      // showPercentage is left as a string because we want it to be truthy by default (even for undefined or null), but
      // React and Angular will ignore attributes that are left falsey.
      showPercentage: { type: "String", attribute: "show-percentage" },
      ariaLabel: { type: "String", attribute: "aria-label" },
      ariaLabelledby: { type: "String", attribute: "aria-labelledby" },
    },
  }}
/>

<script lang="ts">
  import { toBoolean } from "../../common/utils";

  export let testid: string | undefined = undefined;
  export let progress: number | undefined = undefined;
  export let showPercentage: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let ariaLabelledby: string | undefined = undefined;

  $: isDeterminate = progress !== undefined && progress !== null;
  $: determinateValue = Math.round(Math.max(0, Math.min(progress ?? 0, 100)));
  $: isPercentageVisible = toBoolean(showPercentage ?? "true");
</script>

<div class="progressbar-wrapper" data-testid={testid}>
  <div
    class="progressbar-container"
    role="progressbar"
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-live="polite"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuetext={isDeterminate ? undefined : "In progress"}
    aria-valuenow={isDeterminate ? determinateValue : undefined}
  >
    {#if !isDeterminate}
      <span class="progressbar-indeterminate-indicator"></span>
    {:else}
      <span
        class="progressbar-determinate-indicator"
        style="width: {determinateValue}%;"
      ></span>
    {/if}
  </div>
  {#if isPercentageVisible}
    <span class="percentage">{`${determinateValue}%`}</span>
  {/if}
</div>

<style>
  @keyframes indeterminate {
    0% {
      left: 0%;
    }
    50% {
      /* 80% = 100% - (width of .progressbar-indeterminate-indicator) */
      left: 80%;
    }
    100% {
      left: 0%;
    }
  }

  .progressbar-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0;
    font: var(--goa-typography-body-xs);
  }

  .progressbar-container {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 0.75ch;
    overflow: hidden;
    background-color: var(--goa-color-greyscale-200);
    border-radius: var(--goa-border-radius-m);
  }

  .progressbar-determinate-indicator {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    background-color: var(--goa-color-info-default);
    border-radius: var(--goa-border-radius-m);
  }

  .progressbar-indeterminate-indicator {
    position: relative;
    width: 20%; /* If you change this width, update the keyframes too */
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--goa-border-radius-m);
    text-align: center;
    white-space: nowrap;
    background-color: var(--goa-color-info-default);
    animation: indeterminate linear 2000ms both infinite;
  }

  .percentage {
    margin-left: var(--goa-space-xs);
    margin-bottom: 0.5%;
    color: var(--goa-color-text-secondary);
    flex-shrink: 0;
    width: 4ch;
  }
</style>
