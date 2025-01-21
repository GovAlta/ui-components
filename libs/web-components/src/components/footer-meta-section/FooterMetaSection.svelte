<svelte:options customElement="goa-app-footer-meta-section" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let testid: string = "";

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

    const ul = rootEl.querySelector("ul");
    children.forEach((anchor) => {
      const li = document.createElement("li");
      li.appendChild(anchor);
      ul.appendChild(li);
    });
  });
</script>

<!-- Template -->
<section bind:this={rootEl} data-testid={testid}>
  <div class="hidden">
    <slot />
  </div>

  <ul></ul>
</section>

<style>
  .hidden {
    display: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-l);
    padding-left: 0;
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  a {
    color: var(--goa-color-text-default);
    white-space: nowrap;
  }
</style>
