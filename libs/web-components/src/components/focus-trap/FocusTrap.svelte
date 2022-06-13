<svelte:options tag="goa-focus-trap" />

<!-- ======================================================================= -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";

  let ignoreFocusChanges: boolean = false;
  let lastFocus: Element;
  let element: Element;

  export let open: string;
  $: isOpen = toBoolean(open);

  $: {
    if (isOpen) {
      addListeners();
    }
    else {
      removeListeners();
    }
  }

  function removeListeners() {
    document.removeEventListener('focus', trapFocus, true);
  }

  function addListeners() {
    document.addEventListener('focus', trapFocus, true);
  }

  function attemptFocusOnFirstDescendant(descendants: NodeList | Node[]) {

    if (!descendants) return false;

    for (let i = 0; i < descendants.length; i++) {

      let descendant = descendants[i];

      if (attemptFocus(descendant) ||
          attemptFocusOnFirstDescendant(descendant.childNodes) ||
          attemptFocusOnFirstDescendantOfSlotElement(descendant) ||
          attemptFocusOnFirstDescendantOfShadowDOM(descendant)) {
        return true;
      }

    }

    return false;
  };

  function attemptFocusOnFirstDescendantOfSlotElement(node: Node) {

    if (node instanceof HTMLSlotElement) {

      let assingedNodesOfSlotElement = (node as HTMLSlotElement)?.assignedNodes();

      if (attemptFocusOnFirstDescendant(assingedNodesOfSlotElement)) {
        return true;
      }
    }
  }

  function attemptFocusOnFirstDescendantOfShadowDOM(node: Node) {

    if (node instanceof HTMLElement) {

      let childNodesOfShadowRoot = (node as HTMLElement)?.shadowRoot?.childNodes;

      if (attemptFocusOnFirstDescendant(childNodesOfShadowRoot)) {
        return true;
      }
    }
  }

  function attemptFocusOnLastDescendant(descendants: NodeList | Node[]) {

    if (!descendants) return false;

    for (let i = descendants.length - 1; i >= 0; i--) {

      let descendant = descendants[i];

      if (attemptFocus(descendant) ||
          attemptFocusOnLastDescendant(descendant.childNodes) ||
          attemptFocusOnLastDescendantOfSlotElement(descendant) ||
          attemptFocusOnLastDescendantOfShadowDOM(descendant)) {
        return true;
      }

    }

    return false;
  };

  function attemptFocusOnLastDescendantOfSlotElement(node: Node) {

    if (node instanceof HTMLSlotElement) {

      let assingedNodesOfSlotElement = (node as HTMLSlotElement)?.assignedNodes();

      if (attemptFocusOnLastDescendant(assingedNodesOfSlotElement)) {
        return true;
      }
    }
  }

  function attemptFocusOnLastDescendantOfShadowDOM(node: Node) {

    if (node instanceof HTMLElement) {

      let childNodesOfShadowRoot = (node as HTMLElement)?.shadowRoot?.childNodes;

      if (attemptFocusOnLastDescendant(childNodesOfShadowRoot)) {
        return true;
      }
    }
  }


  function attemptFocus(element) {

    if (!isFocusable(element)) {
      return false;
    }

    ignoreFocusChanges = true;

    try {
      element.focus();
    }
    catch (e) {
    }

    ignoreFocusChanges = false;
    return (document.activeElement === element);
  };

  function trapFocus(event) {

    if (ignoreFocusChanges) {
      return;
    }

    const slotElements = (element.firstChild as HTMLSlotElement)?.assignedElements();

    if (!slotElements?.length) return;

    const contentRootElement = slotElements[0];

    if (event.composedPath().includes(contentRootElement)) {
      lastFocus = event.target;
    }
    else {
      attemptFocusOnFirstDescendant(contentRootElement.childNodes);
      if (lastFocus == document.activeElement) {
        attemptFocusOnLastDescendant(contentRootElement.childNodes);
      }
      lastFocus = document.activeElement;
    }
  };

  function isFocusable(element) {

    if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
      return true;
    }

    if (element.disabled) {
      return false;
    }

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
</div>
