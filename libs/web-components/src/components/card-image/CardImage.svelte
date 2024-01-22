<svelte:options customElement="goa-card-image" />

<!-- Script -->
<script lang="ts">
  export let src: string;
  export let height: string = "100%";
</script>

<!-- HTML -->
<div
  style={`
    background-image: url({src}); 
    height: {height}; 
    background-size: cover; 
    background-position: center;
  `}
/>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
</style>
