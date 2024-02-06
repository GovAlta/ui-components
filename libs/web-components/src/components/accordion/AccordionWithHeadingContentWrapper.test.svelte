<svelte:options customElement="test-accordion-with-button" />

<script lang="ts">

  let accEl: HTMLElement;

  function onClick() {
    console.log("in the onclick")
    accEl.dispatchEvent(new CustomEvent("testClick", {
      bubbles: true,
      composed: true,
   }))  
  }

</script>

<goa-accordion bind:this={accEl} heading="This is a heading" secondarytext="Secondary Text">
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
    harum aliquid officia provident recusandae facilis dolor minus magnam
    commodi, nesciunt maxime quas aut exercitationem optio modi. Ratione
    commodi maiores aspernatur?
  </p>
  <goa-button slot="headingcontent" data-testid="slot-button" on:_click={onClick} size="compact" type="primary">
    Link to application
  </goa-button>
</goa-accordion>
