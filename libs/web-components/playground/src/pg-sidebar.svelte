<svelte:options tag="pg-sidebar" />

<script lang="ts">

</script>

<goax-sidebar>
  <a href="#a">Some Link</a>
  <a href="#b">Some Link</a>
  <a href="#c">Some Link</a>
  <a href="#d">Some Link</a>

  <goax-sidebar-group heading="Level 1 A">
    <a href="#foo">Some Link</a>
    <a href="#bar">Some Link</a>
    <a href="#boom">Some Link</a>
    <goax-sidebar-group heading="Level 2">
      <a href="#foo2">Some Link</a>
      <a href="#bar2">Some Link</a>
      <a href="#boom2">Some Link</a>
      <goax-sidebar-group heading="Level 3">
        <a href="#foo3">Some Link</a>
        <a href="#bar3">Some Link</a>
        <a href="#boom3">Some Link</a>
      </goax-sidebar-group>
    </goax-sidebar-group>
  </goax-sidebar-group>

  <goax-sidebar-group heading="Level 1 B">
    <a href="#fooB">Some Link</a>
    <a href="#barB">Some Link</a>
    <a href="#boomB">Some Link</a>
  </goax-sidebar-group>

</goax-sidebar>

<style>
</style>