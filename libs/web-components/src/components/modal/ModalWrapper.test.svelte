<svelte:options customElement="test-modal-wrapper" />

<script lang="ts">
  import Modal from "./Modal.svelte";

  export let heading: string = "";
  export let content: string = "";
  export let actionContent: string = "";
</script>

<Modal open="true">
  <div slot="heading">{heading}</div>
  <div slot="content">{content}</div>
  <div slot="actions">{actionContent}</div>
</Modal>
