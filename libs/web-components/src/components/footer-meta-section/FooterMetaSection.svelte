<svelte:options customElement="goa-app-footer-meta-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

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
<section bind:this={rootEl}>
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
  .hidden {
    display: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-left: 0;
  }

  li {
    list-style-type: none;
  }

  a {
    color: var(--goa-color-text-default);
    white-space: nowrap;
  }
</style>
