<svelte:options tag="goa-app-footer-nav-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let name: string = "";
  export let maxcolumncount: number = 1;

  let rootEl: HTMLElement;
  let children: HTMLLinkElement[] = [];

  onMount(async () => {
    await tick();
    children = rootEl.querySelector("slot").assignedElements() as HTMLLinkElement[];

    const isValid = 
      children
        .map(child => child.hasAttribute("href"))
        .reduce((sum: boolean, valid: boolean) => {
          return sum && valid
        }, true);

    if (!isValid) {
      children = [];
      console.warn("GoAFooterNavSection children must be anchor elements.")
      return;
    }

    // This is pretty hacky, but the only way I could get access to 
    // the root element and add the required styles
    const style = document.createElement("style") 
    style.innerHTML = `
      :host { 
        flex-grow: ${maxcolumncount};
      }
    `;
    rootEl.appendChild(style);
  });
</script>

<!-- Styles -->

<style>

  :host {
    /* The flex-grow is set via code above  */
    flex: auto;
  }

  .title {
    font-size: var(--fs-xl);
    line-height: var(--lh-lg);
  }

  .hidden {
    display: none;
  }

  .links {
    display: block;
    list-style-type: none;
    padding-left: 0;
  }

  @media (min-width: 720px) {
    .links {
      display: var(--narrow-display-type);
      list-style-type: none;
      padding-left: 0;
      flex-direction: column;
      column-count: var(--narrow-column-count);
    }
  }

  @media (min-width: 1024px) {
    .links {
      display: var(--wide-display-type);
      list-style-type: none;
      padding-left: 0;
      flex-direction: column;
      column-count: var(--wide-column-count);
    }
  }

  li {
    padding: 0.75rem 0;
  }

  a {
    color: var(--goa-color-text);
  }

</style>

<!-- Template -->
<section bind:this={rootEl}>
  {#if name}
    <div class="title">{name}</div>
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
    `}>
    {#each children as child}
      <li><a href={child.href}>{child.innerHTML}</a></li>
    {/each}
  </ul>

</section>
