<svelte:options customElement="test-accordion-with-actions" />

<goa-accordion heading="This is a heading" testid="accordion">
  <p>Content</p>
  <div slot="actions" data-testid="actions-slot">
    <goa-button
      slot="actions"
      data-testid="actions-button"
      size="compact"
      type="secondary"
    >
      Action
    </goa-button>
  </div>
</goa-accordion>
