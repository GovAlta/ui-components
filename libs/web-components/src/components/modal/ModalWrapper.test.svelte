<svelte:options customElement="test-modal-wrapper" />

<script lang="ts">
  export let heading: string = "";
  export let content: string = "";
  export let actionContent: string = "";
</script>

<goa-modal open="true">
  {#if heading}
    <div slot="heading">{heading}</div>
  {/if}
  {#if content}
    <div slot="content">{content}</div>
  {/if}
  {#if actionContent}
    <div slot="actions">{actionContent}</div>
  {/if}
</goa-modal>
