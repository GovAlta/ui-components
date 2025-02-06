<svelte:options customElement="goa-app-footer-nav-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let heading: string = "";
  export let maxcolumncount: number = 1;
  export let testid: string = "";

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
<section bind:this={rootEl} data-testid={testid}>
  {#if heading}
    <div class="title">{heading}</div>
    <goa-divider mb="l" />
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
    font: var(--goa-typography-heading-s);
    padding-bottom: var(--goa-space-m);
    color: var(--goa-color-greyscale-800);
  }

  .hidden {
    display: none;
  }

  .links {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    gap: 12px; /* spacing between links on mobile */
  }

  @media not (--mobile) {
    .links {
      list-style-type: none;
      padding-left: 0;
      flex-direction: column;
    }
    .title {
    font: var(--goa-typography-heading-m);
    padding-bottom: var(--goa-space-l);
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



  a {
    color: var(--goa-footer-color-links);
    cursor: pointer;
  }

  a:hover {
    color: var(--goa-footer-color-links-hover);
  }

  a:focus-visible {
    outline: var(--goa-footer-link-focus);
    border-radius: 2px;
  }
</style>
