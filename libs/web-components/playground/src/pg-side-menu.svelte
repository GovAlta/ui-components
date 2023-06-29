<svelte:options tag="pg-side-menu" />

<script lang="ts">

</script>

<div style="width: 26ch;">
<goa-side-menu>
  <a href="#a">Some Link</a>
  <a href="#b">Some Link</a>
  <a href="#c">Some Link</a>
  <a href="#d">Some Link</a>

  <goa-side-menu-group heading="Level 1 A">
    <a href="#foo">Some Link</a>
    <a href="#bar">Some Link</a>
    <a href="#boom">Some Link</a>
    <goa-side-menu-group heading="Level 2">
      <a href="#foo2">Some Link</a>
      <a href="#bar2">Some Link</a>
      <a href="#boom2">Some Link</a>
      <goa-side-menu-group heading="Level 3">
        <a href="#foo3">Some Link</a>
        <a href="#bar3">Some Link</a>
        <a href="#boom3">Some Link</a>
      </goa-side-menu-group>
    </goa-side-menu-group>
  </goa-side-menu-group>

  <goa-side-menu-group heading="Level 1 B">
    <a href="#fooB">Some Link</a>
    <a href="#barB">Some Link</a>
    <a href="#boomB">Some Link</a>
  </goa-side-menu-group>

</goa-side-menu>
</div>

<style>

</style>