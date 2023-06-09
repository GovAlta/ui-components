<svelte:options tag="goax-sidebar"/>

<script lang="ts">
  import {onMount} from "svelte";

  interface NavItem {
    displayname: string;
    name?: string;
    active?: boolean;
    url?: string;
    items?: NavItem[];
  }

  // Public props, needed for recursion
  export let level = 0;
  export let navitems = [];

  // Private
  let _rootElement: HTMLElement;
  let _items: NavItem[] = [];
  let _expandedNavItems: NavItem[] = [];

  $: {
    if (_rootElement) {
      _items = level === 0 ? [...getItems()] : [...navitems];
    }
  }

  onMount(async () => {
    const slot = _rootElement.querySelector("slot");
    slot?.addEventListener("slotchange", (_e) => {
      _items = level === 0 ? [...getItems()] : [...navitems];
    });
  });

  function toggle(item: NavItem) {
     // Only dispatch back when the nav item is the lowest level (no children)
    if (!item.items || item.items.length === 0) {
      _rootElement.dispatchEvent(new CustomEvent("_change", {composed: true, detail: item}));
    }
    // Updated this expanded item to our _expandedNavItems array
    _expandedNavItems = item && !_expandedNavItems.includes(item)
      ? [..._expandedNavItems, item]
      : _expandedNavItems.filter(_item => _item !== item);
    _items = [..._items];
  }

  function getItems(nodes: any = null): NavItem[] {
    const children = nodes || getChildren();
    return children
      .filter((child: Element) => child.tagName === "GOAX-SIDEBAR-ITEM")
      .map((el: HTMLElement) => {
        return {
          displayname: el.displayname,
          active: el.active,
          url: el.url,
          name: el.name,
          items: el.children.length > 0 ? getItems([...el.children]) : []
        } as NavItem;
      });
  }

  function getChildren(): Element[] {
    const slot = _rootElement.querySelector("slot") as HTMLSlotElement;
    if (slot) {
      return slot.assignedElements();
    }
    return [..._rootElement.children] as Element[];
  }

  function calculateMarginLeft(): string {
    const marginLeft = 32;
    return `margin-left: ${marginLeft * (level + 1)}px`
  }

  /**
   * Check if the item is expanded by action (verify with _expandedNavItems) or by sub item selection (default by user)
   */
  function isExpanded(item: NavItem) {
    if (item.items && item.items.length > 0) {
      return _expandedNavItems.includes(item) || hasSubItemSelected(item);
    }
    return false;
  }

  /**
   * Accessibility when press enter to select the item
   */
  function handleKeyDown(event, item) {
    if (event.key === "Enter") {
      toggle(item);
    }
  }

  /**
   * Check if the sub item is selected
   */
  function hasSubItemSelected(item: NavItem): boolean {
    return item.items && item.items.length > 0 && item.items.some(_item => _item.active);
  }

</script>

<!-- HTML -->
<div bind:this={_rootElement} class:first-level={level === 0}>
  <ul role="menu" aria-label="Side Menu" tabindex="-1">
    <slot/>
    {#each _items as item, index (index)}
      {#if true}
      <li role="menuitem"
          aria-selected={item.active}
          class:active={item.active}
          class:expanded={isExpanded(item) && hasSubItemSelected(item)}
          class:sub-level={level >0}
          on:click={()=>toggle(item)}
          on:keydown={(event)=>handleKeyDown(event, item)}
          aria-label={`${item.displayname}${item.items && item.items.length > 0 ? (isExpanded(item) ? " Expanded" : " Collapsed"): ""}`}
          tabindex="0"
      >
      <span class="label">
        {item.displayname}
      </span>
        {#if item.items && item.items.length > 0}
          {#if isExpanded(item)}
            <goa-icon type="chevron-down" size="medium"></goa-icon>
          {:else}
            <goa-icon type="chevron-forward" size="medium"></goa-icon>
          {/if}
        {/if}
      </li>
      {/if}

      {#if item.items && item.items.length > 0 && isExpanded(item)}
        <div style={calculateMarginLeft()}>
          <svelte:self navitems={item.items} level={level + 1}/>
        </div>
      {/if}
    {/each}
  </ul>
</div>


<!-- Style -->

<style>
  div.first-level {
    margin-top: var(--goa-space-m);
  }

  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
    color: var(--goa-color-text-default);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem var(--goa-space-s) 1vh var(--goa-space-xl);
    gap: var(--goa-line-height-05);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .label {
    font: var(--goa-typography-body-m);
    display: flex;
    align-items: center;
  }

  li.active .label {
    font: var(--goa-typography-heading-s);
  }

  li:hover {
    background: #CEDFEE;
  }

  li.expanded {
    background: #CEDFEE;
  }

  li.active {
    background: var(--goa-color-info-background);
  }

  li:focus {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  /*Sub Item Style*/
  li.sub-level {
    padding: 0.625rem var(--goa-space-s) 1vh var(--goa-space-m);
  }

  li.active.sub-level {
    border-left: 4px solid var(--goa-color-interactive-disabled);
  }

  li.sub-level:not(.active):not(:hover) {
    border-left: 4px solid var(--goa-color-greyscale-100);
  }

  li.sub-level:hover {
    background: var(--goa-color-info-background);
    border-left: 4px solid var(--goa-color-greyscale-200);
  }
</style>
