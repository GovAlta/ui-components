<svelte:options tag="goa-flex-row" />

<!-- Script -->
<script lang="ts">
  export let gap: string = "";

  $: _gap = gap === 'small' ? '1rem' : gap === 'medium' ? '2rem' : gap === 'large' ? '3rem' : '0';

</script>

<!-- HTML -->
<div class="goa-flex-row" style="gap: {_gap};">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .goa-flex-row {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }

  @media (min-width: 640px) {
    .goa-flex-row {
      display: grid;
      /* grid-auto-flow: row;
      grid-auto-columns: 1fr; */
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: var(--gap);

      margin-bottom: 1rem;  /* Not sure this should be set to a non-zero value */
    }
  }
</style>
