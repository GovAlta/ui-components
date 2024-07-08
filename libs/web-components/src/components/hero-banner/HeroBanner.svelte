<svelte:options customElement="goa-hero-banner" />

<!-- Script -->
<script lang="ts">
  export let heading: string;
  export let backgroundurl: string;
  export let minheight: string;
  export let maxcontentwidth = "100%";
  export let backgroundcolor: string = "#f8f8f8";
  export let textcolor: string = "";

  /* Set minheight to support old default value of 600px */
  $: if (!minheight && backgroundurl) minheight = "600px";
</script>

<!-- HTML -->
<div
  class="goa-hero"
  class:with-image={backgroundurl}
  data-testid="background"
  style="
    min-height: {minheight};
    --hero-banner-background-color: {backgroundcolor};
    --hero-banner-text-color: {textcolor};
    --hero-background-url: url({backgroundurl});
  "
>
  <goa-page-block width={maxcontentwidth || "full"}>
    <h1>{heading}</h1>
    <div class="goa-hero-banner-content" role="note">
      <slot />
    </div>
    <div class="goa-hero-banner-actions">
      <slot name="actions" />
    </div>
  </goa-page-block>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }
  .goa-hero {
    background: var(--hero-banner-background-color);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: var(--hero-banner-text-color, var(--goa-color-text-default));
    background-position: center center;
    width: 100%;
    padding: var(--goa-space-2xl) 0;
  }

  @media (--mobile) {
    .goa-hero {
      padding: var(--goa-space-xl) 0;
    }
  }

  .goa-hero.with-image {
    border-bottom: 8px solid var(--goa-color-brand-default);
    justify-content: flex-end;
    background: unset;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 40%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      var(--hero-background-url);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: var(--hero-banner-text-color, var(--goa-color-text-light));
  }

  h1 {
    font: var(--goa-typography-heading-xl);
    margin: 0;
  }

  .goa-hero-banner-content {
    font: var(--goa-typography-body-l);
    margin: var(--goa-space-l) 0 0;
  }

  .goa-hero-banner-actions {
    margin: var(--goa-space-l) 0 0;
  }
</style>
