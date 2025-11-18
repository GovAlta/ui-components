<svelte:options
  customElement={{
    tag: "goa-linear-progress",
  }}
/>

<script lang="ts">
  export let progress: number | null = -1;
  export let testid: string = "";
  export let showpercentage: string = "true";
</script>

<div class="linear-progress" data-testid={testid}>
  {#if !!progress || progress === 0}
    <progress
      class="progress-bar"
      max="100"
      value={progress >= 0 && progress <= 100 ? progress : null}
    ></progress>
  {:else}
    <progress class="progress-bar"></progress>
  {/if}
  {#if showpercentage !== "false"}
    <span class="percentage">
      {Math.max(0, Math.min(progress || 0, 100))}%
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
  }

  .linear-progress span.percentage {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-shrink: 0;
  }
</style>
