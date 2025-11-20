<svelte:options
  customElement={{
    tag: "goa-linear-progress",
  }}
/>

<script lang="ts">
  export let progress: number | null | undefined = undefined;
  export let testid: string = "";
  export let showpercentage: string = "true";
  export let arialabel: string = "progress";
  export let arialabelledby: string = "";
</script>

<div class="linear-progress" data-testid={testid}>
  {#if !!progress || progress === 0}
    <progress
      class="progress-bar"
      aria-label={arialabel}
      aria-labelledby={arialabelledby}
      max="100"
      value={progress >= 0 && progress <= 100 ? progress : null}
    ></progress>
  {:else}
    <progress
      class="progress-bar"
      aria-label={arialabel}
      aria-labelledby={arialabelledby}
    ></progress>
  {/if}
  {#if showpercentage !== "false"}
    <span class="percentage">
      {`${Math.round(Math.max(0, Math.min(progress || 0, 100)))}%`}
    </span>
  {/if}
</div>

<style>
  .linear-progress {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--goa-space-xs);
    border-radius: 4px;
  }

  .linear-progress progress {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    accent-color: var(--goa-color-interactive-default);
    flex-shrink: 1;
    width: 100%;
  }

  .linear-progress span.percentage {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-shrink: 0;
    width: 4ch;
  }
</style>
