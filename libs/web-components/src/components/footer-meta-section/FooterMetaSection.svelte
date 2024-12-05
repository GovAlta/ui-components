<svelte:options customElement="goa-app-footer-meta-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let testid: string =  "";

  let rootEl: HTMLElement;
  let children: HTMLLinkElement[] = [];

  onMount(async () => {
    await tick();
    children = rootEl
      .querySelector("slot")
      .assignedElements() as HTMLLinkElement[];

    const isValid = children
      .map((child) => child.hasAttribute("href"))
      .reduce((sum: boolean, valid: boolean) => {
        return sum && valid;
      }, true);

    if (!isValid) {
      children = [];
      console.warn("GoAFooterMetaSection children must be anchor elements.");
      return;
    }
  });
</script>

<!-- Template -->
<section bind:this={rootEl} data-testid={testid}>
  <div class="hidden">
    <slot />
  </div>

  <ul>
    {#each children as child}
      <li><a href={child.href}>{child.innerHTML}</a></li>
    {/each}
  </ul>
</section>

<style>
  :host {
    /* TODO Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-footer-meta-links-gap: var(--goa-space-l);
    --goa-footer-meta-links-gap-small-screen: 20px;

    --goa-footer-color-links: var(--goa-color-text-default);
    --goa-footer-color-links-hover: var(--goa-color-greyscale-700);
    --goa-footer-link-focus: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);

    /*  ------------------------------------------------------- */

  }
  .hidden {
    display: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-footer-meta-links-gap);
    padding: 0;
    margin: 8px 0px 0px 0px;
  }

  li {
    list-style-type: none;
  }

  @media (--mobile) {
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--goa-footer-meta-links-gap-small-screen);
      padding: 0;
      margin: 0px 0px 0px 0px;
    }
  }

  a {
    color: var(--goa-footer-color-links);
    cursor: pointer;
    white-space: nowrap;

  }

  a:hover {
    color: var(--goa-footer-color-links-hover);
  }

  a:focus-visible {
    outline: var(--goa-footer-link-focus);
    border-radius: 2px;
  }
</style>
