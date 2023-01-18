<svelte:options tag="goa-hero-banner" />

<!-- Script -->
<script lang="ts">

  export let heading: string;
  export let backgroundurl: string;
  export let minheight: string = "600px";

</script>

<!-- HTML -->
<div
  class="goa-hero"
  data-testid="background"
  style="
    background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.6) 100%), url({backgroundurl});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: {minheight}
    "
>
  <goa-page-block width="full">
    <h1>{heading}</h1>
    <div class="goa-hero-banner-content" role="note">
      <slot />
    </div>
    <slot name="actions" />
  </goa-page-block>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .goa-hero {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    border-bottom: 8px solid var(--goa-color-brand-default);
    color: var(--goa-color-greyscale-white);
    background-position: center center;
    width: 100%;
    padding: 3.5rem 0;
  }

  h1 {
    margin: 0 0 1.75rem;
    padding: 0;
    color: var(--goa-color-greyscale-white);
    font-size: var(--goa-font-size-10);
    line-height: var(--goa-line-height-7);
    font-weight: var(--goa-font-weight-bold);
  }

  .goa-hero-banner-content {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1.75rem;
    color: #fff;
  }
</style>
