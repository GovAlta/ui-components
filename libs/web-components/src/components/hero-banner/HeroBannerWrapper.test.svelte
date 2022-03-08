<svelte:options tag="test-hero-banner" />

<script lang="ts">

  export let title;
  export let content;
  export let actionContent;

</script>

<goa-hero-banner title={title} >
  <div slot="actions">{@html actionContent}</div>
  {content}
</goa-hero-banner>
