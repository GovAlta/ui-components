<svelte:options customElement="goa-focus-trap" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  // Public
  // allow for outside control of whether focus trap should re-focus the first element is open/closed (see Drawer)
  export let open: boolean = false;

  // Private

  let rootEl: HTMLElement;
  let boundryStartEl: HTMLElement | null;
  let boundryEndEl: HTMLElement | null;
  let isShiftPressed: boolean;
  let isFirstFocus = true;


  // ========
  // Reactive
  // ========
  $: if(open) findFirstFocusableEl();

  // *****
  // Hooks
  // *****
  onMount(async () => {
    await tick();
    // event is attached to the rootEl, eliminating the need to remove the listener since it
    // will be removed when the associated element is removed.
    rootEl.addEventListener("focus", keepWithinBounds, true);
    rootEl.addEventListener("keydown", activateShiftState, true);
    rootEl.addEventListener("keyup", deactivateShiftState, true);

    boundryStartEl = rootEl.querySelector("[data-tab-boundry=start]");
    boundryEndEl = rootEl.querySelector("[data-tab-boundry=end]");

    findFirstFocusableEl();
  });

  function activateShiftState(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = true;
  }

  function deactivateShiftState(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = false;
  }

  // Functions

  function isFocusable(node: Node): Node | null {
    const element = node as HTMLElement;

    if (isFirstFocus && element.getAttribute?.("data-first-focus")) return node;

    const isTabbable =
      element.tabIndex > 0 ||
      (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null);

    // 1 = element_node (div, span, input, a, ...)
    if (element.nodeType !== 1) return null;

    if (isTabbable) return node;

    if (element?.getAttribute("disabled")) return null;

    if (element.tabIndex < 0 || element.getAttribute?.("tabindex") === "-1")
      return null;

    let focusableNode = null;
    switch (element.nodeName) {
      case "A": {
        const el = element as HTMLLinkElement;
        if (!!el.href && el.rel !== "ignore") {
          focusableNode = node;
        }
        break;
      }
      case "INPUT": {
        const el = element as HTMLInputElement;
        if (el.type !== "hidden" && el.type !== "file") {
          focusableNode = node;
        }
        break;
      }
      case "BUTTON":
      case "SELECT":
      case "TEXTAREA":
        focusableNode = node;
        break;
    }

    return focusableNode;
  }

  function findFirstFocusableEl() {
    const sibling = rootEl?.querySelector("slot");
    if (!sibling) return;

    const el = findFirstNode([sibling], false) as HTMLElement;
    if (el) {
      // for angular with router, it needs a small delay
      setTimeout(() => {
        el.focus();
      }, 10);
    }
  }

  // Focus event handler
  function keepWithinBounds(e: Event | null): void {
    const el = (e?.target as HTMLElement) ?? rootEl;
    if (isFirstFocus) {
      isFirstFocus = false;
      return;
    }

    if (el.dataset["tabBoundry"] === "start") {
      if (isShiftPressed) {
        boundryEndEl?.focus();
        return;
      }

      let sibling = el.nextElementSibling;
      if (sibling?.getAttribute("data-first-focus") === "true") {
        sibling = sibling.nextElementSibling;
      }
      if (!sibling) return;

      const next = findFirstNode([sibling], false) as HTMLElement;
      next?.focus();
      return;
    }

    if (el.dataset["tabBoundry"] === "end") {
      if (!isShiftPressed) {
        boundryStartEl?.focus();
        return;
      }

      let sibling = el.previousElementSibling;
      if (sibling?.getAttribute("data-first-focus") === "true") {
        sibling = sibling.previousElementSibling;
      }
      if (!sibling) return;

      const next = findFirstNode([sibling], true) as HTMLElement;
      next?.focus();
      return;
    }

    // If the focus element is at the bottom, we want to automatically scroll down to the focused element (when user uses keyboard)
    const focusedElement = e?.target;

    if (focusedElement && focusedElement instanceof HTMLElement) {
      focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function findFirstNode(
    nodes: NodeList | Node[],
    reversed: boolean = false,
  ): Node | null {
    const nodeList = reversed ? [...nodes].reverse() : nodes;
    for (const node of nodeList) {
      const el =
        isFocusable(node) ||
        findFirstNode(node.childNodes, reversed) ||
        findFirstNodeOfSlot(node, reversed) ||
        findFirstNodeOfShadowDOM(node, reversed);
      if (el) {
        return el;
      }
    }
    return null;
  }

  function findFirstNodeOfSlot(node: Node, reversed: boolean): Node | null {
    if (!(node instanceof HTMLSlotElement)) return null;
    return findFirstNode([...node.assignedNodes()], reversed);
  }

  function findFirstNodeOfShadowDOM(
    node: Node,
    reversed: boolean,
  ): Node | null {
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
