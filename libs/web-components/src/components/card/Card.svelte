<svelte:options tag="goa-card" />

<!-- Script -->
<script lang="ts">
  export let elevation: number = 0;
  export let width: number = 320;
</script>

<!-- HTML -->
<div
  class="card"
  style="
    --width: {width}px;
    { elevation === 0
      ? `border: 1px solid var(--color-gray-200);`
      : `box-shadow: var(--shadow-${elevation});`
    }
  ">
  <slot />
</div>

<!-- Style -->
<style>
  /* :host {
    width: 100%;
  }
  */
  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
  }
  @media (min-width: 320px) {
    .card {
      width: var(--width);
      margin: 0 auto
    }
  }
</style>
