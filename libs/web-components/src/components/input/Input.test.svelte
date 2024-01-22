<svelte:options customElement="test-input-wrapper" />

<!-- Script -->
<script lang="ts">
  export let leadingContent: string = "";
  export let trailingContent: string = "";
</script>

<!-- HTML -->
<goa-input name="input">
  {#if leadingContent}
    <div slot="leadingContent" class="leadingContent">{leadingContent}</div>
  {/if}
  {#if trailingContent}
    <div slot="trailingContent" class="trailingContent">{trailingContent}</div>
  {/if}
</goa-input>
