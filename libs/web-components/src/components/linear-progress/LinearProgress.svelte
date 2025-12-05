<svelte:options
  customElement={{
    tag: "goa-linear-progress",
    props: {
      testid: { type: "String", attribute: "testid", reflect: true },
      progress: { type: "Number", attribute: "progress" },
      percentVisibility: { type: "String", attribute: "percent-visibility" },
      ariaLabel: { type: "String", attribute: "aria-label" },
      ariaLabelledby: { type: "String", attribute: "aria-labelledby" },
    },
  }}
/>

<script lang="ts">
  function isLabelVisible(visibility: string | undefined): boolean {
    return visibility === undefined || visibility.toLowerCase() === "visible";
  }

  export let testid: string | undefined = undefined;
  export let progress: number | undefined = undefined;
  export let percentVisibility: "visible" | "hidden" | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let ariaLabelledby: string | undefined = undefined;

  $: isDeterminate = progress !== undefined && progress !== null;
  $: determinateValue = Math.round(Math.max(0, Math.min(progress ?? 0, 100)));
  $: isPercentageLabelVisible = isLabelVisible(percentVisibility);
</script>

<div class="progressbar-wrapper" data-testid={testid}>
  <div
    data-testid="{testid}-progressbar-container"
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
      <span
        data-testid="{testid}-indeterminate-indicator"
        class="progressbar-indeterminate-indicator"
      ></span>
    {:else}
      <span
        data-testid="{testid}-determinate-indicator"
        class="progressbar-determinate-indicator"
        style="width: {determinateValue}%;"
      ></span>
    {/if}
  </div>
  {#if isPercentageLabelVisible}
    <span data-testid="{testid}-percentage" class="percentage"
      >{`${determinateValue}%`}</span
    >
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
  }

  .progressbar-container {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: var(--goa-linear-progress-height);
    overflow: hidden;
    background-color: var(--goa-linear-progress-color-track);
    border-radius: var(--goa-linear-progress-border-radius);
  }

  .progressbar-determinate-indicator {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
    background-color: var(--goa-linear-progress-color-indicator);
    border-radius: var(--goa-linear-progress-border-radius);
  }

  .progressbar-indeterminate-indicator {
    position: relative;
    width: 20%; /* If you change this width, update the keyframes too */
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-radius: var(--goa-linear-progress-border-radius);
    text-align: center;
    white-space: nowrap;
    background-color: var(--goa-linear-progress-color-indicator);
    animation: indeterminate linear 2000ms both infinite;
  }

  .percentage {
    font: var(--goa-linear-progress-percentage-text);
    margin-left: var(--goa-linear-progress-percentage-gap);
    margin-bottom: 0.25%;
    color: var(--goa-linear-progress-percentage-color);
    flex-shrink: 0;
    width: var(--goa-linear-progress-percentage-width);
  }
</style>
