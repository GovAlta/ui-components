<svelte:options customElement="goa-focus-trap" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  // Private

  let rootEl: HTMLElement;
  let boundryStartEl: HTMLElement;
  let boundryEndEl: HTMLElement;
  let isShiftPressed: boolean;

  // Hooks

  onMount(async () => {
    await tick();
    // event is attached to the rootEl, eliminating the need to remove the listener since it
    // will be removed when the associated element is removed.
    rootEl.addEventListener("focus", onFocus, true);
    rootEl.addEventListener("keydown", onKeydown, true);
    rootEl.addEventListener("keyup", onKeyup, true);

    boundryStartEl = rootEl.querySelector("[data-tab-boundry=start]");
    boundryEndEl = rootEl.querySelector("[data-tab-boundry=end]");
  });

  function onKeydown(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = true;
  }

  function onKeyup(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = false;
  }

  // Functions

  function isFocusable(node: Node): Node {
    const element = node as HTMLElement;
    const isTabbable =
      element.tabIndex > 0 ||
      (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null);

    if (isTabbable) return node;
    if (element["disabled"]) return null;
    if (element.tabIndex < 0 || element.getAttribute?.("tabindex") === "-1")
      return null;

    switch (element.nodeName) {
      case "A": {
        const el = element as HTMLLinkElement;
        if (!!el.href && el.rel !== "ignore") return node;
      }
      case "INPUT": {
        const el = element as HTMLInputElement;
        if (el.type !== "hidden" && el.type !== "file") return node;
      }
      case "BUTTON":
      case "SELECT":
      case "TEXTAREA":
        return node;
      default:
        return null;
    }
  }

  // Focus event handler
  function onFocus(event: Event): void {
    const el = event.target as HTMLElement;

    if (el.dataset.tabBoundry === "start") {
      if (isShiftPressed) {
        boundryEndEl.focus();
        return;
      }
      const next = findFirstNode([el.nextElementSibling], false) as HTMLElement;
      next?.focus();
      return;
    }

    if (el.dataset.tabBoundry === "end") {
      if (!isShiftPressed) {
        boundryStartEl.focus();
        return;
      }
      const next = findFirstNode(
        [el.previousElementSibling],
        true,
      ) as HTMLElement;
      next?.focus();
      return;
    }
  }

  function findFirstNode(
    nodes: NodeList | Node[],
    reversed: boolean = false,
  ): Node {
    const nodeList = reversed ? [...nodes].reverse() : nodes;
    for (const node of nodeList) {
      const el = 
        isFocusable(node)
        || findFirstNode(node.childNodes, reversed)
        || findFirstNodeOfSlot(node, reversed)
        || findFirstNodeOfShadowDOM(node, reversed);
      if (el) {
        return el;
      }
    }
    return null;
  }

  function findFirstNodeOfSlot(node: Node, reversed: boolean): Node {
    if (!(node instanceof HTMLSlotElement)) return null;
    return findFirstNode([...node.assignedNodes()], reversed);
  }

  function findFirstNodeOfShadowDOM(node: Node, reversed: boolean): Node {
    if (!(node instanceof HTMLElement)) return null;
    return findFirstNode([...(node.shadowRoot?.childNodes || [])], reversed);
  }
</script>

<div bind:this={rootEl}>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span data-tab-boundry="start" tabindex="0"></span>
  <slot />
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span data-tab-boundry="end" tabindex="0"></span>
</div>

<style>
  div {
    display: inline;
  }
</style>
