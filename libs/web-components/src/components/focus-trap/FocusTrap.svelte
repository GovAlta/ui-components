<svelte:options tag="goa-focus-trap" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { toBoolean } from "../../common/utils";

  export let active: string;

  let root: Element;
  let focusableElements: HTMLElement[] = []; 
  let eventsAttached: boolean = false;

  $: {
    if (toBoolean(active) && !eventsAttached) {
      document.addEventListener('keypress', getKey, true);
      eventsAttached = true
    } 
  }

  $: {
    if (!toBoolean(active) && eventsAttached) {
      document.removeEventListener('keypress', getKey);
      eventsAttached = false;
    }
  }

  onMount(async () => {
    await tick() 
    getChildren(root, focusableElements)
  })

  function getKey(event: KeyboardEvent) {
    const outside = !isChild(event.target as Element);
    if (outside) {
      let index = event.shiftKey ? focusableElements.length - 1 : 0;
      focusableElements[index].focus();
    }
  }

  // finds all focusable children 
  function getChildren(parent: Element, children: Element[]) {
    for (const child of (parent.children) || []) {
      if (isFocusable(child))
        children.push(child)
      getChildren(child, children);
    }

    const assignedElements = (parent as HTMLSlotElement).assignedElements?.() || [];
    for (const child of assignedElements) {
      if (isFocusable(child))
        children.push(child)
      getChildren(child, children);
    }

    const shadowRoot = (parent as HTMLSlotElement).shadowRoot;
    if (shadowRoot) {
      for (const child of (shadowRoot.children || [])) {
        if (isFocusable(child))
          children.push(child)
        getChildren(child, children);
      }
    }
  }


  function isChild(el: Element): boolean {
    const children: Element[] = []
    getChildren(el, children)
    for (const fel of focusableElements) {
      if (children.find(c => c === fel)) {
        return true;
      }
    }
    return false;
  }

  function isFocusable(element) {
    if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
      return true;
    }

    if (element.disabled) {
      return false;
    }

    switch (element.tagName) {
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

<div bind:this={root}>
  <slot />
</div>
