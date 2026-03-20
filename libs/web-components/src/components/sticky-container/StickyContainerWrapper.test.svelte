<svelte:options customElement="test-sticky-container" />

<script lang="ts">
  export let header: string = "";
  export let content: string = "";
  export let footer: string = "";
  export let height: string = "400px";
</script>

<goa-sticky-container {height}>
  {#if header}
    <div slot="header" class="header-content">{header}</div>
  {/if}
  <div class="body-content">{@html content}</div>
  {#if footer}
    <div slot="footer" class="footer-content">{footer}</div>
  {/if}
</goa-sticky-container>
