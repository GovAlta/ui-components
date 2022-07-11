<svelte:options tag="goa-flex-col" />

<!-- Script -->
<script lang="ts">
  export let gap: string = "";

  $: _gap = gap === 'small' ? '1rem' : gap === 'medium' ? '2rem' : gap === 'large' ? '3rem' : '0';

</script>

<!-- HTML -->
<div class="goa-flex-col" style="gap: {_gap};">
  <slot />
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  .goa-flex-col {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin-bottom: 1rem;  /* Not sure this should be set to a non-zero value */
  }
</style>
