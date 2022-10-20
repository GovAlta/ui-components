<svelte:options tag="test-callout-wrapper" />

<script lang="ts">
  export let content: string = "";
  export let heading: string;
  export let type: string;
</script>

<goa-callout type={type} heading={heading}>
  {content}
</goa-callout>
