<svelte:head>
  <title>Goab Component Playground</title>
</svelte:head>

<script lang="ts">
  import "@abgov/style";
  import { Router, Route } from 'svelte-routing';
  import Playground from './Playground.svelte';
</script>

<Router>
  <Route path="/" component={Playground} />
</Router>
