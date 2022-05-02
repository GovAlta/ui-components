<!-- Script -->
<script lang="ts">
  export let content: string = "";
  export let actionContent: string = "";
</script>

<!-- HTML -->
<goa-modal open="true">
  {#if content}
    <div slot="content">{content}</div>
  {/if}
  {#if actionContent}
    <div slot="actions">{actionContent}</div>
  {/if}
</goa-modal>
