<svelte:options customElement="test-container" />

<!-- Script -->
<script lang="ts">
  export let title;
  export let actions = "";
  export let content;
  export let type = "default";
  export let accent = "thick";
</script>

<!-- HTML -->
<goa-container {type} {accent}>
  {#if title}
    <div slot="title" class="title">{title}</div>
  {/if}
  {#if actions}
    <div class="actions" slot="actions">{@html actions}</div>
  {/if}
  <div class="content" slot>{@html content}</div>
</goa-container>
