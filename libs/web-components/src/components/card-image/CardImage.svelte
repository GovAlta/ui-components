<svelte:options customElement="goa-card-image" />

<!-- Script -->
<script lang="ts">
  /** The URL of the image to display. */
  export let src: string;
  /** Height of the image container. Accepts CSS values like "200px" or "100%". */
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
