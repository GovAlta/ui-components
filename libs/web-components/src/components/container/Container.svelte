<svelte:options customElement="goa-container" />

<!-- Script -->
<script lang="ts">
  import { calculateMargin } from "../../common/styling";
  import type { Spacing } from "../../common/styling";
  import { typeValidator } from "../../common/utils";
  import { onMount } from "svelte";

  // Validator
  const [Types, validateType] = typeValidator("Container type", [
    "interactive",
    "info",
    "error",
    "success",
    "important",
    "non-interactive",
  ]);
  const [Accents, validateAccent] = typeValidator("Container accent", [
    "thick",
    "thin",
    "filled",
  ]);
  const [Paddings, validatePadding] = typeValidator("Container padding", [
    "relaxed",
    "compact",
  ]);

  // Types
  type Type = (typeof Types)[number];
  type Accent = (typeof Accents)[number];
  type Padding = (typeof Paddings)[number];

  export let type: Type = "interactive";
  export let accent: Accent = "filled";
  export let padding: Padding = "relaxed";
  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "m";
  export let ml: Spacing = null;

  onMount(() => {
    validateType(type);
    validateAccent(accent);
    validatePadding(padding);
  });
</script>

<!-- HTML -->
<div
  data-testid={testid}
  style={calculateMargin(mt, mr, mb, ml)}
  class={`
    goa-container
    goa-container--${type}
    padding--${padding}
    accent--${accent}
  `}
>
  <header class="heading--{accent}">
    <div class="title">
      <slot name="title" />
    </div>

    <div class="actions">
      <slot name="actions" />
    </div>
  </header>
  <div class="content">
    <slot />
  </div>
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    font-size: var(--goa-font-size-4);
    display: flex;
    flex: 1 1 auto;
  }

  .goa-container {
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .goa-container * {
    box-sizing: border-box;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;

    font-size: var(--goa-font-size-4);
    border-width: 1px;
    border-style: solid;
    border-top-left-radius: var(--goa-border-radius-m);
    border-top-right-radius: var(--goa-border-radius-m);
  }

  .content {
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    border-left: 1px solid var(--goa-color-greyscale-200);
    border-right: 1px solid var(--goa-color-greyscale-200);
    border-bottom-left-radius: var(--goa-border-radius-m);
    border-bottom-right-radius: var(--goa-border-radius-m);
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .content :global(::slotted(*:last-child)) {
    margin-bottom: 0 !important;
  }

  /* Background Colour */

  .goa-container--non-interactive.accent--filled .content {
    border-color: var(--goa-color-greyscale-200);
    background-color: var(--goa-color-greyscale-100);
  }
  .goa-container--important.accent--filled .content {
    border-color: var(--goa-color-warning-default);
    background-color: var(--goa-color-warning-background);
  }
  .goa-container--error.accent--filled .content {
    border-color: var(--goa-color-emergency-default);
    background-color: var(--goa-color-emergency-background);
  }
  .goa-container--success.accent--filled .content {
    border-color: var(--goa-color-success-default);
    background-color: var(--goa-color-success-background);
  }
  .goa-container--info.accent--filled .content {
    border-color: var(--goa-color-info-default);
    background-color: var(--goa-color-info-background);
  }

  .title,
  .actions {
    padding: 0.5rem 0;
  }

  /* Padding variants */

  .padding--relaxed header {
    padding: 0 1.5rem;
  }

  .padding--relaxed .content {
    padding: 1.5rem;
  }

  .padding--compact header,
  .padding--compact .content {
    padding: 0 1rem;
  }

  .padding--compact header {
    padding: 0 1rem;
  }

  .padding--compact .content {
    padding: 1rem;
  }

  /* Override padding in small screens to the compact value */
  @media (--mobile) {
    .padding--relaxed header {
      padding: 0 1rem;
    }
    .padding--relaxed .content {
      padding: 1rem;
    }
  }

  /* colors */

  .goa-container--non-interactive header {
    background-color: var(--goa-color-greyscale-100);
    border-color: var(--goa-color-greyscale-200);
    color: var(--goa-color-greyscale-black);
  }

  .goa-container--interactive header {
    background-color: var(--goa-color-brand-default);
    border-color: var(--goa-color-brand-default);
    color: var(--goa-color-greyscale-white);
  }

  .goa-container--info header {
    background-color: var(--goa-color-info-default);
    border-color: var(--goa-color-info-default);
    color: var(--goa-color-greyscale-white);
  }

  .goa-container--error header {
    /* TODO: need a better color name here */
    background-color: var(--goa-color-emergency-default);
    border-color: var(--goa-color-emergency-default);
    color: var(--goa-color-greyscale-white);
  }

  .goa-container--success header {
    /* TODO: need a better color name here */
    background-color: var(--goa-color-success-default);
    border-color: var(--goa-color-success-default);
    color: var(--goa-color-greyscale-white);
  }

  .goa-container--important header {
    background-color: var(--goa-color-warning-default);
    border-color: var(--goa-color-warning-default);
    color: var(--goa-color-greyscale-white);
  }

  /* Sizes */
  .heading--thick {
    padding: 0.5rem 1.5rem;
    max-height: 3rem;
    min-height: 1rem;
  }

  .heading--thick .title {
    line-height: 2rem;
  }

  .heading--thin {
    height: 0.5rem;
  }

  .heading--filled {
    display: none;
  }
  .heading--filled ~ .content {
    border-top: 1px solid var(--goa-color-greyscale-200);
    border-top-left-radius: var(--goa-border-radius-m);
    border-top-right-radius: var(--goa-border-radius-m);
  }

  .heading--thin .title,
  .heading--thin .actions {
    display: none;
  }

  .actions {
    display: flex;
    align-items: center;
  }
</style>
