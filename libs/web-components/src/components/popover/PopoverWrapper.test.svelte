<svelte:options customElement="test-popover-wrapper" />

<!-- Script -->
<script lang="ts">
  export let content: string = "";
  export let targetTrigger: string = "";
</script>

<!-- HTML -->
<goa-popover>
  {#if content}
    <div slot="content">{content}</div>
  {/if}
  {#if targetTrigger}
    <div slot="target">{targetTrigger}</div>
  {/if}
</goa-popover>
