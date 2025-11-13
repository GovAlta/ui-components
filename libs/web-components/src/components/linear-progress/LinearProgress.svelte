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
  }
</style>
