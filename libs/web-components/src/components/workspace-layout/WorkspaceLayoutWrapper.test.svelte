<svelte:options customElement="test-workspace-layout" />

<script lang="ts">
  export let sideMenu: string = "";
  export let header: string = "";
  export let footer: string = "";
  export let content: string = "";
</script>

<goa-workspace-layout>
  {#if sideMenu}
    <div slot="side-menu" class="side-menu-content">{sideMenu}</div>
  {/if}
  {#if header}
    <div slot="page-header" class="header-content">{header}</div>
  {/if}
  <div class="body-content">{@html content}</div>
  {#if footer}
    <div slot="page-footer" class="footer-content">{footer}</div>
  {/if}
</goa-workspace-layout>
