<svelte:options tag="goa-card-image" />

<!-- Script -->
<script lang="ts">
  export let src: string;
  export let height: string = "100%";
</script>

<!-- HTML -->
<div class="card-image"
  style="background-image: url({src}); height: {height}; background-size: cover; background-position: center;">
</div>

<!-- Style -->
<style>
  .card-image {

  }
</style>
