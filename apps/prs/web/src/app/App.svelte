<script lang="ts">
  import "@abgov/style";
  import { Router, Route } from "svelte-routing";
  import Issue2333 from "../routes/2333.svelte";
  import Issue3279 from "../routes/3279.svelte";
  import PublicFormExample from "../routes/public-form.svelte";
</script>

<svelte:head>
  <title>Goab Component Playground</title>
</svelte:head>

<Router>
  <Route path="/issues/2333" component={Issue2333} />
  <Route path="/issues/3279" component={Issue3279} />
  <Route path="/issues/public-form" component={PublicFormExample} />
</Router>
