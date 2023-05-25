<!--
************************************************************************************************
* Do not commit anything in this file to the Alpha or Main branch, so please ensure that this 
* file is reset before creating a PR.
************************************************************************************************
-->
<svelte:options tag={null} />
<svelte:head>
  <title>GoA Component Playground</title>
</svelte:head>

<script lang="ts">
  import '../../src';
  // import component here
  // ex. import "./pg-form-stepper.svelte";
  import "./pg-sidebar.svelte";

</script>

<main>
  <h1>Testing Playground</h1>
  <hr />

  <!-- Testing component goes here -->
  <!-- ex. <pg-form-stepper /> -->
  <pg-sidebar />
</main>

<style>
  main {
    padding: 2rem;
  }
</style>