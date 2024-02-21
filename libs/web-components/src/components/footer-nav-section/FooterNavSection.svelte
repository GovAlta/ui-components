<svelte:options customElement="goa-app-footer-nav-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let heading: string = "";
  export let maxcolumncount: number = 1;

  let rootEl: HTMLElement;
  let children: HTMLLinkElement[] = [];

  onMount(async () => {
    await tick();

    // remap slot content
    children = rootEl
      .querySelector("slot")
      ?.assignedElements() as HTMLLinkElement[];

    const isValid = children
      .map((child) => child.hasAttribute("href"))
      .reduce((sum: boolean, valid: boolean) => {
        return sum && valid;
      }, true);

    if (!isValid) {
      children = [];
      console.warn("GoAFooterNavSection children must be anchor elements.");
      return;
    }
  });
</script>

<!-- Template -->
<section bind:this={rootEl}>
  {#if heading}
    <div class="title">{heading}</div>
    <goa-divider spacing="small" />
  {/if}

  <div class="hidden">
    <slot />
  </div>

  <ul
    class="links"
    style={`
      --narrow-display-type: ${Math.ceil(maxcolumncount / 2) > 1 ? "block" : "flex"};
      --narrow-column-count: ${Math.ceil(maxcolumncount / 2)};
      --wide-display-type: ${maxcolumncount > 1 ? "block" : "flex"};
      --wide-column-count: ${maxcolumncount};
    `}
  >
    {#each children as child}
      <li><a href={child.href}>{child.innerHTML}</a></li>
    {/each}
  </ul>
</section>

<!-- Styles -->
<style>
  :host {
    /* The flex-grow is set via code above  */
    flex: auto;
  }

  .title {
    font-size: var(--goa-font-size-7);
    line-height: var(--goa-line-height-4);
    padding-bottom: var(--goa-space-l);
  }

  .hidden {
    display: none;
  }

  .links {
    display: block;
    list-style-type: none;
    padding-left: 0;
  }

  @media not (--mobile) {
    .links {
      list-style-type: none;
      padding-left: 0;
      flex-direction: column;
    }
  }

  @media (--tablet) {
    .links {
      display: var(--narrow-display-type);
      column-count: var(--narrow-column-count);
    }
  }

  @media (--desktop) {
    .links {
      display: var(--wide-display-type);
      column-count: var(--wide-column-count);
    }
  }

  li {
    padding: 0.75rem 0;
  }

  a {
    color: var(--goa-color-text-default);
  }
</style>
