<script lang="ts">
  import "@abgov/style";
  import "@abgov/design-tokens-v2/dist/tokens.css"; // Production tokens. Comment out to test with legacy V1 token values.
  import { Router, Route } from "svelte-routing";
  import Issue2333 from "../routes/2333.svelte";
  import Issue3279 from "../routes/3279.svelte";
  import Issue3605 from "../routes/3605.svelte";
  import Issue3760 from "../routes/3760.svelte";
</script>

<svelte:head>
  <title>Goab Component Playground</title>
</svelte:head>

<Router>
  <Route path="/issues/2333" component={Issue2333} />
  <Route path="/issues/3279" component={Issue3279} />
  <Route path="/issues/3605" component={Issue3605} />
  <Route path="/issues/3760" component={Issue3760} />
</Router>
