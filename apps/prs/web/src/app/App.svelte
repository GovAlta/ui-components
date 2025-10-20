<svelte:head>
  <title>Goab Component Playground</title>
</svelte:head>

<script lang="ts">
  import "@abgov/style";
  import { Router, Route } from 'svelte-routing';
  import Issue2333 from '../routes/2333.svelte';
</script>

<Router>
  <Route path="/issues/2333" component={Issue2333} />
</Router>
