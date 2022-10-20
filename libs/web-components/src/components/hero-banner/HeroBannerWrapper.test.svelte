<svelte:options tag="test-hero-banner" />

<script lang="ts">
  export let backgroundurl = "";
  export let heading = "";
  export let content = "";
  export let actionContent = "";
</script>

<goa-hero-banner heading={heading} backgroundurl={backgroundurl}>
  <div slot="actions">{@html actionContent}</div>
  {content}
</goa-hero-banner>
