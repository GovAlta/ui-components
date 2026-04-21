<svelte:options customElement="test-accordion-with-actions" />

<script lang="ts">
  let accEl: HTMLElement;

  function onActionClick() {
    accEl.dispatchEvent(new CustomEvent("testActionClick", {
      bubbles: true,
      composed: true,
    }));
  }
</script>

<goa-accordion bind:this={accEl} heading="This is a heading" testid="accordion">
  <p>Content</p>
  <goa-button slot="actions" data-testid="actions-button" size="compact" type="secondary" on:_click={onActionClick}>
    Action
  </goa-button>
</goa-accordion>
