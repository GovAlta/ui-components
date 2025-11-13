<svelte:options
  customElement={{
    tag: "goa-linear-progress",
  }}
/>

<script lang="ts">
  // Optional
  export let progress: number = -1;
  // export let testid: string = "";
  /*

  */
</script>

<div class="linear-progress">
  <progress max="100" value={progress >= 0 && progress <= 100 ? progress : null}
  ></progress>
  <span>
    {Math.max(0, progress)}%
  </span>
</div>

<style>
  .linear-progress {
    width: 100%;
    height: 8px;
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
  }

  .linear-progress span {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-shrink: 0;
  }
</style>
