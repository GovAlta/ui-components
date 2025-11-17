<svelte:options customElement="goa-app-header-navigation" />

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { isUrlMatch, getMatchedLink } from '../../common/urls';

  // Props
  export let version: "1" | "2" = "1";
  export let windowWidth: number;
  export let mobile: boolean = false;

  // State variables (from AppHeader.svelte lines 65-72)
  let _navigationItemCount = 0;
  let _visibleNavigationCount = 0; // How many nav items can be shown
  let _showMoreMenu = false; // Whether to show "More" menu for overflow
  let _navigationPlaceholderEl: HTMLElement | null = null;
  let _navigationInitialMeasurementDone = false;
  let _navigationCheckTimeout: number | null = null;
  let _overflowItems: Array<{type: 'link' | 'header', href?: string, text: string, current?: boolean, indented?: boolean}> = [];
  let _moreMenuElement: HTMLElement | null = null; // The More menu element in light DOM

  // Reactive statement - check overflow when window resizes
  $: if (windowWidth && _navigationInitialMeasurementDone) {
    checkNavigationOverflow();
  }

  // Navigation Functions - Batch 1: Core Detection (3 functions)

  // Function 1: Count navigation items (excluding More menu)
  function detectNavigationItems() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    const hostElement = _navigationPlaceholderEl.getRootNode() as ShadowRoot;
    const lightDomChildren = hostElement.host?.children || [];

    // Find all direct elements with slot="navigation" attribute (links and menus)
    // Exclude the More menu from the count
    const navigationItems = Array.from(lightDomChildren).filter(
      (el) => {
        if (el.getAttribute('slot') !== 'navigation') return false;
        // Exclude the More menu itself
        if (el.tagName === 'GOA-APP-HEADER-MENU' && el.getAttribute('heading') === 'More') return false;
        return true;
      }
    );

    _navigationItemCount = navigationItems.length;
    _visibleNavigationCount = _navigationItemCount; // Start with all visible
  }

  // Function 2: Check if navigation items overflow and need "More" menu
  function checkNavigationOverflow() {
    // Clear any pending timeout
    if (_navigationCheckTimeout) {
      clearTimeout(_navigationCheckTimeout);
    }

    // Debounce the check to prevent infinite loops
    _navigationCheckTimeout = window.setTimeout(() => {
      if (!_navigationPlaceholderEl || version !== "2" || _navigationItemCount === 0) {
        if (_showMoreMenu !== false) {
          _showMoreMenu = false;
          _visibleNavigationCount = _navigationItemCount;
        }
        return;
      }

      // Get the navigation placeholder width
      const navigationWidth = _navigationPlaceholderEl.offsetWidth;

      // Get shadow root to access slotted elements
      const shadowRoot = _navigationPlaceholderEl.getRootNode() as ShadowRoot;
      const navigationSlot = shadowRoot?.querySelector('slot[name="navigation"]') as HTMLSlotElement;

      if (!navigationSlot) {
        if (_showMoreMenu !== false) {
          _showMoreMenu = false;
          _visibleNavigationCount = _navigationItemCount;
        }
        return;
      }

      const slottedItems = navigationSlot.assignedElements();

      if (slottedItems.length === 0) {
        if (_showMoreMenu !== false) {
          _showMoreMenu = false;
          _visibleNavigationCount = _navigationItemCount;
        }
        return;
      }

      // Filter out the More menu itself before measuring
      const itemsWithoutMoreMenu = Array.from(slottedItems).filter(
        item => !(item.tagName === 'GOA-APP-HEADER-MENU' && item.getAttribute('heading') === 'More')
      );

      const moreMenuWidth = 100;
      const itemGap = 16; // Navigation items have 16px gap between them
      const padding = mobile ? 32 : 96; // Navigation bar padding (16px * 2 mobile, 48px * 2 desktop)

      // STEP 1: First check if ALL items fit WITHOUT reserving space for More menu
      const availableWidthWithoutMore = navigationWidth - padding;
      let totalWidthAllItems = 0;

      for (let i = 0; i < itemsWithoutMoreMenu.length; i++) {
        const item = itemsWithoutMoreMenu[i] as HTMLElement;
        const itemWidth = item.offsetWidth || 80;
        const gapWidth = i > 0 ? itemGap : 0;
        totalWidthAllItems += itemWidth + gapWidth;
      }

      // If all items fit without More button, we're done!
      if (totalWidthAllItems <= availableWidthWithoutMore) {
        const needsMoreMenu = false;
        const itemsFit = itemsWithoutMoreMenu.length;

        if (_showMoreMenu !== needsMoreMenu) {
          _showMoreMenu = needsMoreMenu;
        }
        if (_visibleNavigationCount !== itemsFit) {
          _visibleNavigationCount = itemsFit;
        }

        showAllItems();
        removeMoreMenu();
        return;
      }

      // STEP 2: Not all items fit, so calculate how many fit WITH More button space reserved
      const availableWidth = navigationWidth - padding - moreMenuWidth;
      let totalWidth = 0;
      let itemsFit = 0;

      for (let i = 0; i < itemsWithoutMoreMenu.length; i++) {
        const item = itemsWithoutMoreMenu[i] as HTMLElement;
        const itemWidth = item.offsetWidth || 80;
        const gapWidth = itemsFit > 0 ? itemGap : 0;
        const widthNeeded = totalWidth + itemWidth + gapWidth;

        if (widthNeeded <= availableWidth) {
          totalWidth = widthNeeded;
          itemsFit++;
        } else {
          break;
        }
      }

      const needsMoreMenu = true; // We know some items don't fit

      // Update state only if changed
      if (_showMoreMenu !== needsMoreMenu) {
        _showMoreMenu = needsMoreMenu;
      }

      if (_visibleNavigationCount !== itemsFit) {
        _visibleNavigationCount = needsMoreMenu ? itemsFit : slottedItems.length;
      }

      // Extract overflow items and inject More menu
      if (needsMoreMenu) {
        extractOverflowItems();
        hideOverflowItems();
        injectMoreMenu();
      } else {
        showAllItems();
        removeMoreMenu();
      }
    }, 100); // 100ms debounce
  }

  // Navigation Functions - Batch 2: More Menu Management (3 functions)

  // Function 4: Inject More menu into light DOM
  function injectMoreMenu() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    const hostElement = (_navigationPlaceholderEl.getRootNode() as ShadowRoot)?.host;
    if (!hostElement) return;

    // Check if More menu already exists
    if (_moreMenuElement && hostElement.contains(_moreMenuElement)) {
      // Update existing menu
      updateMoreMenuContent();
      return;
    }

    // Create More menu element
    const moreMenu = document.createElement('goa-app-header-menu');
    moreMenu.setAttribute('slot', 'navigation');
    moreMenu.setAttribute('heading', 'More');

    // Add overflow items (headers + links)
    _overflowItems.forEach(item => {
      if (item.type === 'header') {
        // Create non-clickable header (using <a> tag for consistent styling)
        const header = document.createElement('a');
        header.textContent = item.text;
        header.classList.add('menu-header');
        header.href = 'javascript:void(0)';
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-level', '2');
        header.setAttribute('tabindex', '-1');
        header.addEventListener('click', (e) => e.preventDefault());
        moreMenu.appendChild(header);
      } else if (item.type === 'link') {
        // Create clickable link
        const link = document.createElement('a');
        link.href = item.href!;
        link.textContent = item.text;
        if (item.current) {
          link.classList.add('current');
        }
        if (item.indented) {
          link.classList.add('indented');
        }
        moreMenu.appendChild(link);
      }
    });

    // Append to host element (light DOM)
    hostElement.appendChild(moreMenu);
    _moreMenuElement = moreMenu;
  }

  // Function 5: Update More menu content
  function updateMoreMenuContent() {
    if (!_moreMenuElement) return;

    // Clear existing content
    while (_moreMenuElement.firstChild) {
      _moreMenuElement.removeChild(_moreMenuElement.firstChild);
    }

    // Add updated overflow items (headers + links)
    _overflowItems.forEach(item => {
      if (item.type === 'header') {
        // Create non-clickable header (using <a> tag for consistent styling)
        const header = document.createElement('a');
        header.textContent = item.text;
        header.classList.add('menu-header');
        header.href = 'javascript:void(0)';
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-level', '2');
        header.setAttribute('tabindex', '-1');
        header.addEventListener('click', (e) => e.preventDefault());
        _moreMenuElement!.appendChild(header);
      } else if (item.type === 'link') {
        // Create clickable link
        const link = document.createElement('a');
        link.href = item.href!;
        link.textContent = item.text;
        if (item.current) {
          link.classList.add('current');
        }
        if (item.indented) {
          link.classList.add('indented');
        }
        _moreMenuElement!.appendChild(link);
      }
    });
  }

  // Function 6: Remove More menu from light DOM
  function removeMoreMenu() {
    if (_moreMenuElement && _moreMenuElement.parentNode) {
      _moreMenuElement.parentNode.removeChild(_moreMenuElement);
      _moreMenuElement = null;
    }
  }

  // Function 3: Extract overflow navigation items for "More" menu
  function extractOverflowItems() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    const shadowRoot = _navigationPlaceholderEl.getRootNode() as ShadowRoot;
    const navigationSlot = shadowRoot?.querySelector('slot[name="navigation"]') as HTMLSlotElement;

    if (!navigationSlot) return;

    const slottedItems = navigationSlot.assignedElements();
    const overflow: Array<{type: 'link' | 'header', href?: string, text: string, current?: boolean, indented?: boolean}> = [];

    // Filter out the More menu itself from the items list
    const itemsWithoutMoreMenu = Array.from(slottedItems).filter(
      item => !(item.tagName === 'GOA-APP-HEADER-MENU' && item.getAttribute('heading') === 'More')
    );

    // Get items beyond the visible count
    for (let i = _visibleNavigationCount; i < itemsWithoutMoreMenu.length; i++) {
      const item = itemsWithoutMoreMenu[i];

      // Handle direct <a> links
      if (item.tagName === 'A') {
        const link = item as HTMLAnchorElement;
        overflow.push({
          type: 'link',
          href: link.getAttribute('href') || '#',
          text: link.textContent?.trim() || '',
          current: link.classList.contains('current'),
          indented: false
        });
      }
      // Handle goa-app-header-menu items (create header + indented children)
      else if (item.tagName === 'GOA-APP-HEADER-MENU') {
        // Try both attribute and property access (Svelte components expose props as properties)
        const menuHeading = item.getAttribute('heading') || (item as any).heading || '';

        // Add non-clickable header
        overflow.push({
          type: 'header',
          text: menuHeading,
          indented: false
        });

        // Add indented child links
        const menuLinks = Array.from(item.querySelectorAll('a'));
        menuLinks.forEach((link) => {
          overflow.push({
            type: 'link',
            href: link.getAttribute('href') || '#',
            text: link.textContent?.trim() || '',
            current: link.classList.contains('current'),
            indented: true
          });
        });
      }
    }

    _overflowItems = overflow;
  }

  // Navigation Functions - Batch 3: Display Control (2 functions)

  // Function 7: Hide overflow items using inline styles
  function hideOverflowItems() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    const shadowRoot = _navigationPlaceholderEl.getRootNode() as ShadowRoot;
    const navigationSlot = shadowRoot?.querySelector('slot[name="navigation"]') as HTMLSlotElement;

    if (!navigationSlot) return;

    const slottedItems = navigationSlot.assignedElements();

    // Filter out the More menu itself
    const itemsWithoutMoreMenu = Array.from(slottedItems).filter(
      item => !(item.tagName === 'GOA-APP-HEADER-MENU' && item.getAttribute('heading') === 'More')
    );

    // Hide items beyond the visible count
    itemsWithoutMoreMenu.forEach((item, index) => {
      const htmlItem = item as HTMLElement;
      if (index < _visibleNavigationCount) {
        // Show visible items
        htmlItem.style.display = '';
      } else {
        // Hide overflow items
        htmlItem.style.display = 'none';
      }
    });
  }

  // Function 8: Show all navigation items (remove inline display styles)
  function showAllItems() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    const shadowRoot = _navigationPlaceholderEl.getRootNode() as ShadowRoot;
    const navigationSlot = shadowRoot?.querySelector('slot[name="navigation"]') as HTMLSlotElement;

    if (!navigationSlot) return;

    const slottedItems = navigationSlot.assignedElements();

    // Filter out the More menu itself
    const itemsWithoutMoreMenu = Array.from(slottedItems).filter(
      item => !(item.tagName === 'GOA-APP-HEADER-MENU' && item.getAttribute('heading') === 'More')
    );

    // Show all items
    itemsWithoutMoreMenu.forEach((item) => {
      const htmlItem = item as HTMLElement;
      htmlItem.style.display = '';
    });
  }

  // Navigation Functions - Batch 4: Route Tracking (3 functions)

  // Function 9: Mark current link as active based on URL
  function setCurrentLink() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    // Get the shadow root
    const shadowRoot = (_navigationPlaceholderEl.getRootNode() as ShadowRoot);

    // Get the navigation slot element
    const navigationSlotEl = shadowRoot.querySelector('slot[name="navigation"]') as HTMLSlotElement;
    if (!navigationSlotEl) return;

    // Get all slotted elements in the navigation slot
    const slottedElements = navigationSlotEl.assignedElements();

    // Collect all links from the navigation slot (direct <a> tags and links inside app-header-menu)
    let navigationLinks: Element[] = [];

    slottedElements.forEach((el) => {
      if (el.tagName === 'A') {
        // Direct link in navigation slot
        navigationLinks.push(el);
      } else if (el.tagName === 'GOA-APP-HEADER-MENU') {
        // Get links from inside the menu component
        const menuLinks = Array.from(el.querySelectorAll('a'));
        navigationLinks = [...navigationLinks, ...menuLinks];
      }
    });

    // Remove 'current' class from all navigation links
    navigationLinks.forEach((link) => link.classList.remove('current'));

    // Find the matched link and add 'current' class
    const matchedLink = getMatchedLink(navigationLinks, window.location);

    if (matchedLink) {
      matchedLink.classList.add('current');

      // If the matched link is inside a menu, mark the menu button as having a current child
      const parentMenu = matchedLink.closest('goa-app-header-menu');
      if (parentMenu) {
        // Dispatch event to app-header-menu to let it know a child link is current
        parentMenu.dispatchEvent(
          new CustomEvent('app-header:changed', {
            composed: true,
            detail: matchedLink.getAttribute('href') || '',
          })
        );
      }
    }
  }

  // Function 10: Handle route changes
  function onRouteChange() {
    setCurrentLink();
  }

  // Function 11: Setup event listeners for route tracking
  let mutationObserver: MutationObserver | null = null;

  function addEventListeners() {
    if (!_navigationPlaceholderEl || version !== "2") return;

    // Watch path changes via MutationObserver
    let currentLocation = document.location.href;
    mutationObserver = new MutationObserver((_mutationList) => {
      if (isUrlMatch(document.location, currentLocation)) {
        currentLocation = document.location.href;
        onRouteChange();
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Watch popstate events (browser back/forward)
    window.addEventListener("popstate", onRouteChange, true);
  }

  // Lifecycle Hooks
  onMount(async () => {
    if (version === "2") {
      // Detect navigation items initially
      detectNavigationItems();

      // Setup event listeners for route tracking
      addEventListeners();

      // Wait for next tick to ensure DOM is ready
      await tick();

      // Check overflow after initial render
      checkNavigationOverflow();
      _navigationInitialMeasurementDone = true;
    }
  });

  onDestroy(() => {
    if (version === "2") {
      // Cleanup: Remove popstate listener
      window.removeEventListener("popstate", onRouteChange, true);

      // Cleanup: Disconnect MutationObserver
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }

      // Cleanup: Clear timeout
      if (_navigationCheckTimeout) {
        clearTimeout(_navigationCheckTimeout);
        _navigationCheckTimeout = null;
      }

      // Cleanup: Remove More menu if exists
      removeMoreMenu();
    }
  });
</script>

{#if version === "2"}
  <div
    class="v2-navigation-placeholder"
    class:mobile
    class:overflow-1={_showMoreMenu && _visibleNavigationCount === 1}
    class:overflow-2={_showMoreMenu && _visibleNavigationCount === 2}
    class:overflow-3={_showMoreMenu && _visibleNavigationCount === 3}
    class:overflow-4={_showMoreMenu && _visibleNavigationCount === 4}
    class:overflow-5={_showMoreMenu && _visibleNavigationCount === 5}
    class:overflow-6={_showMoreMenu && _visibleNavigationCount === 6}
    class:overflow-7={_showMoreMenu && _visibleNavigationCount === 7}
    class:overflow-8={_showMoreMenu && _visibleNavigationCount === 8}
    bind:this={_navigationPlaceholderEl}
  >
    <slot />
  </div>
{/if}

<style>
  /* V2 Navigation Section - Base Container */
  .v2-navigation-placeholder {
    background: var(--goa-app-header-nav-bar-bg);
    padding: 0 var(--goa-app-header-padding-h-desktop);
    min-height: var(--goa-app-header-height-nav-item);
    display: flex;
    align-items: center;
    gap: var(--goa-app-header-nav-item-gap);
  }

  .v2-navigation-placeholder.mobile {
    padding: 0 var(--goa-app-header-padding-h-mobile);
  }

  /* V2 Navigation Items - Base Styling */
  .v2-navigation-placeholder :global(::slotted(a)) {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0; /* Don't shrink - maintain natural width */
    flex-grow: 0; /* Don't grow - maintain natural width */
    height: var(--goa-app-header-height-nav-item);
    padding: var(--goa-app-header-padding-nav-item);
    color: var(--goa-app-header-nav-text-color) !important;
    text-decoration: none !important;
    position: relative;
    font: var(--goa-app-header-typography-nav-item) !important;
    letter-spacing: normal !important; /* No letter spacing - user feedback */
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: var(--goa-app-header-border-nav-item-default) !important;
    border-radius: 0 !important; /* No rounded corners needed */
    background: transparent !important;
    box-shadow: none !important;
    transition: border-bottom-color 0.2s ease, font-weight 0.2s ease !important;
    box-sizing: border-box !important; /* Ensure padding is included in height */
  }

  /* V2 Navigation Items - Hover State */
  .v2-navigation-placeholder :global(::slotted(a:hover)) {
    border-bottom-color: var(--goa-app-header-nav-hover-indicator-color) !important;
  }

  /* V2 Navigation Items - Active State (current page) */
  .v2-navigation-placeholder :global(::slotted(a.current)) {
    font-weight: var(--goa-font-weight-semi-bold) !important;
    border-bottom-color: var(--goa-app-header-nav-active-indicator-color) !important;
  }

  /* V2 Navigation Items - Focus State */
  .v2-navigation-placeholder :global(::slotted(a:focus-visible)) {
    outline: var(--goa-app-header-service-name-border-focus) !important;
    outline-offset: -3px !important;
    z-index: 1;
  }

  /* V2 Navigation Menu Items (app-header-menu) - Container Styling */
  /* Note: Menu button styling is handled via .v2-nav class in AppHeaderMenu.svelte */
  .v2-navigation-placeholder :global(::slotted(goa-app-header-menu)) {
    /* Container styling */
    display: inline-flex;
    align-items: center;
    height: var(--goa-app-header-height-nav-item);
    flex-shrink: 0; /* Don't shrink - maintain natural width */
    flex-grow: 0; /* Don't grow - maintain natural width */
  }
</style>
