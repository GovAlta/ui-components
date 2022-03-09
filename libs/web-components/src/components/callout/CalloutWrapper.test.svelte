<svelte:options tag="test-callout-wrapper" />

<script lang="ts">
  export let content: string;
  export let title: string;
  export let type: string;
</script>

<goa-callout type={type} title={title}>
  {content}
</goa-callout>
