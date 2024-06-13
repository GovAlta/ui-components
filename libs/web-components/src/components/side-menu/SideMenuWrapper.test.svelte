<svelte:options customElement="test-side-menu-wrapper" />

<script lang="ts">
  import GoASideMenu from "./SideMenu.svelte";
</script>

<GoASideMenu>
  <goa-side-menu-heading>Get started</goa-side-menu-heading>
  <a href="get-started">Overview</a>
  <a href="get-started/designers">UX designers</a>
  <goa-side-menu-group heading="Developers">
    <a href="get-started/developers">Overview</a>
    <a href="get-started/developers/setup">Setup</a>
  </goa-side-menu-group>
</GoASideMenu>
