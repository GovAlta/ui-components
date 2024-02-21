<svelte:options customElement="test-hero-banner" />

<script lang="ts">
  export let backgroundurl = "";
  export let heading = "";
  export let content = "";
  export let actionContent = "";
</script>

<goa-hero-banner {heading} {backgroundurl}>
  <div slot="actions">{@html actionContent}</div>
  {content}
</goa-hero-banner>
