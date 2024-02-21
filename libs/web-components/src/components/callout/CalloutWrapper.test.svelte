<svelte:options customElement="test-callout-wrapper" />

<script lang="ts">
  export let content: string = "";
  export let heading: string;
  export let type: string;
</script>

<goa-callout {type} {heading}>
  {content}
</goa-callout>
