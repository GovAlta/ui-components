<svelte:options tag="goa-focus-trap" />

<!-- ======================================================================= -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  export let active: string;

  let ignoreFocusChanges: boolean = false;
  let lastFocus: Element;
  let element: Element;
  let hasListeners: boolean = false;

  $: isActive = toBoolean(active);
  $: {
    if (isActive && !hasListeners) {
      addListeners();
      hasListeners = true;
    }
    if (!isActive && hasListeners) {
      removeListeners();
      hasListeners = false;
    }
  }

  function removeListeners() {
    document.removeEventListener('focus', trapFocus, true);
  }

  function addListeners() {
    document.addEventListener('focus', trapFocus, true);
  }

  // ====
  // First Node 
  // ====

  function focusOnFirstNode(nodes: NodeList | Node[]): boolean {
    if (!nodes) return false;

    for (const node of nodes) {
      const isFocusable 
        = focus(node)
        ||  focusOnFirstNode(node.childNodes)
        ||  focusOnFirstNodeOfSlot(node)
        ||  focusOnFirstNodeOfShadowDOM(node);

      if (isFocusable) {
        return true;
      }
    }
    return false;
  };

  function focusOnFirstNodeOfSlot(node: Node): boolean {
    if (!(node instanceof HTMLSlotElement)) return false;

    if (focusOnFirstNode(node.assignedNodes())) {
      return true;
    }
  }

  function focusOnFirstNodeOfShadowDOM(node: Node): boolean {
    if (!(node instanceof HTMLElement)) return false;

    if (focusOnFirstNode(node.shadowRoot?.childNodes)) {
      return true;
    }
  }

  // ====
  // Last Node 
  // ====

  function focusOnLastNode(nodes: NodeList | Node[]): boolean {
    if (!nodes) return false;

    for (let i = nodes.length - 1; i >= 0; i--) {
      let node = nodes[i];
      if (focus(node) ||
          focusOnLastNode(node.childNodes) ||
          focusOnLastNodeOfSlot(node) ||
          focusOnLastNodeOfShadowDOM(node)) {
        return true;
      }
    }

    return false;
  };

  function focusOnLastNodeOfSlot(node: Node): boolean {
    if (!(node instanceof HTMLSlotElement)) return false;

    if (focusOnLastNode(node.assignedNodes())) {
      return true;
    }
  }

  function focusOnLastNodeOfShadowDOM(node: Node): boolean {
    if (!(node instanceof HTMLElement)) return false;

    if (focusOnLastNode(node.shadowRoot?.childNodes)) {
      return true;
    }
  }


  function focus(element): boolean {
    if (!isFocusable(element)) return false;

    try {
      ignoreFocusChanges = true;
      element.focus();
    } catch(e) {}
    finally {
      ignoreFocusChanges = false;
    }

    return (document.activeElement === element);
  };

  function trapFocus(event): void {
    if (ignoreFocusChanges) return;

    const slotElements = (element.firstChild as HTMLSlotElement)?.assignedElements();
    if (!slotElements?.length) return;

    const contentRootElement = slotElements[0];
    if (event.composedPath().includes(contentRootElement)) {
      lastFocus = event.target;
      return;
    }

    focusOnFirstNode(contentRootElement.childNodes);
    if (lastFocus == document.activeElement) {
      focusOnLastNode(contentRootElement.childNodes);
    }
    lastFocus = document.activeElement;
  };

  function isFocusable(element): boolean {
    const isTabbable = element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null);
    if (isTabbable) return true;
    if (element.disabled) return false;

    switch (element.nodeName) {
      case 'A':
        return !!element.href && element.rel !== 'ignore';
      case 'INPUT':
        return element.type !== 'hidden' && element.type !== 'file';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  };

</script>

<div bind:this={element}>
  <slot />
  <!-- When goa-modal is the last display element in a page,
    the tab key press jumps out. The empty span with tabIndex="0" keeps the focus trapped mysteriously-->
  <span tabindex="0"></span>
</div>
