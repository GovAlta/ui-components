<svelte:options tag="pg-accordion" />

<script lang="ts">
</script>

<goa-accordion heading="A heading that's no longer and starts to wrap a second line">
  <div style="display: flex; justify-content: flex-end" slot="headingcontent">
    <goa-badge type="important" content="In progress"></goa-badge>
    <goa-badge type="success" content="44"></goa-badge>
  </div>
</goa-accordion>
<goa-accordion
  heading="Heading"
>
  <goa-badge type="success" content="22" slot="headingcontent"/>
</goa-accordion>
<goa-accordion heading="This is a heading" secondarytext="1 of 4 documents signed">
</goa-accordion>
<goa-accordion heading="Heading">
</goa-accordion>
