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
  .goa-flex-row {
    margin-bottom: 1rem;  /* Not sure this should be set to a non-zero value */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
</style>
