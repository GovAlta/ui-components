<svelte:options customElement="test-scroll-panel" />

<script lang="ts">
  export let header: string = "";
  export let content: string = "";
  export let footer: string = "";
  export let height: string = "400px";
  export let direction: string = "vertical";
  export let width: string = "";
</script>

<goa-scroll-panel {height} {direction} {width}>
  {#if header}
    <div slot="header" class="header-content">{header}</div>
  {/if}
  <div class="body-content">{@html content}</div>
  {#if footer}
    <div slot="footer" class="footer-content">{footer}</div>
  {/if}
</goa-scroll-panel>
