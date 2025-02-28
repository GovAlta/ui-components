<svelte:options customElement="test-popover-wrapper" />

<!-- Script -->
<script lang="ts">
  import Popover from "./Popover.svelte";

  export let content: string = "";
  export let targetTrigger: string = "";
</script>

<!-- HTML -->
<Popover>
  <div slot="target">{@html targetTrigger}</div>
  {@html content}
</Popover>
