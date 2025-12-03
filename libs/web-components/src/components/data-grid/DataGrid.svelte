<svelte:options customElement={{
  tag: "goa-data-grid",
  props: {
    keyboardIcon: { type: "Boolean", reflect: true, attribute: "keyboard-icon" },
    keyboardIconPosition: { type: "String", reflect: true, attribute: "keyboard-icon-position" },
    keyboardNav: { type: "String", attribute: "keyboard-nav" }
  }
}} />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { shouldFocus } from "../../common/utils";

  // ******
  // Public
  // ******

  export let keyboardIcon = true;
  export let keyboardIconPosition: "left" | "right" = "left";
  export let keyboardNav: "layout" | "table" = "table";

  // *******
  // Private
  // *******

  type GridCell3D = {
    cell: HTMLElement;
    focusables: HTMLElement[];
  }

  let _rootEl: HTMLElement;
  let _grid: GridCell3D[][] = [];
  let _focusingRowIndex = 0;
  let _focusingColIndex = 0;
  let _focusingElementIndex = -1; // Assuming no focusable elements inside the cell
  let _navigationDisabled = false; // disable arrow key navigation if we are on input elements, to not update focusing index
  let _mutationObserver: MutationObserver | null = null; // To listen to changes on slot (ex: delete a row from a table)
  let _clickInsideGrid = false; // Track if click originated inside the grid, otherwise we need to remove focusing effects
  let _showKeyboardIcon = false;
  let _bindTimeoutId: any = null; // Track pending grid rebuilds to prevent race conditions
  let _isRebuilding = false; // Flag to prevent navigation during grid rebuild

  onMount(() => {
    (async () => {
      await tick(); //ensure slotted content is rendered before grid setup
      setup3DGrid();
      setupEventListener();
      listenForSlottedChanges();
    })();

    return () => {
      if (_mutationObserver) {
        _mutationObserver.disconnect();
      }
      if (_bindTimeoutId !== null) {
        clearTimeout(_bindTimeoutId);
      }
      if (_rootEl) {
        _rootEl.removeEventListener('keydown', handleKeyDown);
        _rootEl.removeEventListener('click', handleCellClick);
      }
      document.removeEventListener('click', handleOutsideClick);
    };
  })

  function setup3DGrid() {
    if (!_rootEl) return;

    _grid = [];
    const slot = _rootEl.querySelector('slot');
    if (!slot) return;

    const assignedNodes = slot.assignedElements();

    const rows: Element[] = [];
    assignedNodes.forEach(node => {
      const foundElements = findAllElementsWithDataGridAttributes(node);
      const foundRows = foundElements.filter(el => el.getAttribute('data-grid') === 'row');
      rows.push(...foundRows);
    });

    rows.forEach(row => {
      row.setAttribute('role', 'row'); // for screen reader
    });

    let globalCellIndex = 0; // keep track the first cell to tabindex 0, so when user "tabs", they can go to the first cell even no focusable elements

    rows.forEach(row => {
      const foundElements = findAllElementsWithDataGridAttributes(row);
      const rowCells = foundElements.filter(el => {
        const value = el.getAttribute('data-grid');
        return value === 'cell' || value?.startsWith('cell-');
      }) as HTMLElement[];

      // Sort cells by their data-grid numeric value (if given, otherwise by HTML order like table)
      const sortedCells = rowCells.sort((a, b) => {
        const valueA = a.getAttribute('data-grid') || 'cell-0';
        const valueB = b.getAttribute('data-grid') || 'cell-0';

        // Extract numeric value from 'cell-N' or default to 0 for 'cell'
        const orderA = valueA === 'cell' ? 0 : parseInt(valueA.split('-')[1] || '0');
        const orderB = valueB === 'cell' ? 0 : parseInt(valueB.split('-')[1] || '0');

        return orderA - orderB;
      });

      const gridRow: GridCell3D[] = [];

      sortedCells.forEach(cell => {
        cell.setAttribute('role', 'gridcell'); // for screen reader

        // Set first cell globally as focusable, others not focusable (so Tab focuses on first cell)
        if (globalCellIndex === 0) {
          cell.setAttribute('tabindex', '0');
        }
        globalCellIndex++;

        const focusables = findAllFocusableElements(cell) as HTMLElement[];

        if (focusables.length > 0) {
          cell.removeAttribute("tabindex");
        }
        gridRow.push({
          cell: cell,
          focusables: focusables
        });
      });

      if (gridRow.length > 0) {
        _grid.push(gridRow);
      }
    });
  }

  function setupEventListener() {
    if (!_rootEl) return;

    _rootEl.addEventListener('keydown', handleKeyDown);

    _rootEl.addEventListener('click', handleCellClick);

    // Listen for clicks outside the grid to reset focus indices -> remove focusing style
    document.addEventListener('click', handleOutsideClick);
  }

  function handleOutsideClick(event: MouseEvent) {
    if (_clickInsideGrid) {
      _clickInsideGrid = false;
      return;
    }

    if (!_rootEl?.contains(event.target as Node)) {
      resetFocusIndices();
    }
  }

  function resetFocusIndices() {
    cleanupOldCellFocus();

    _focusingRowIndex = 0;
    _focusingColIndex = 0;
    _focusingElementIndex = -1;
    _showKeyboardIcon = false;

    if (_grid[0] && _grid[0][0]) {
      const firstCellData = _grid[0][0];
      const firstCell = firstCellData.cell;
      const hasFocusableContent = firstCellData.focusables.length > 0;
      if (hasFocusableContent) {
        firstCell.removeAttribute('tabindex');
      } else {
        firstCell.setAttribute('tabindex', '0');
      }
    }
  }

  function listenForSlottedChanges() {
    if (!_rootEl) return;

    const slot = _rootEl.querySelector('slot');
    if (!slot) return;

    // Create observer to watch for changes in the slotted content such as sort table, delete items
    _mutationObserver = new MutationObserver((mutations) => {
      // Check if the mutations affect the grid structure
      let shouldRebuild = false;

      for (const mutation of mutations) {
        // Check if nodes were added or removed
        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          shouldRebuild = true;
          break;
        }

        // Check if attributes changed on grid elements
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-grid') {
          shouldRebuild = true;
          break;
        }

        // Check if the order of elements changed (for sorting)
        if (mutation.type === 'childList' && mutation.target instanceof HTMLElement) {
          const targetElement = mutation.target;
          if (targetElement.hasAttribute('data-grid') || targetElement.querySelector('[data-grid]')) {
            shouldRebuild = true;
            break;
          }
        }
      }

      if (shouldRebuild) {
        rebuild3DGrid();
      }
    });

    // Observe the slot and its assigned elements
    const assignedNodes = slot.assignedElements();
    assignedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        _mutationObserver?.observe(node, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['data-grid']
        });
      }
    });
  }

  function rebuild3DGrid() {
    if (_bindTimeoutId !== null) {
      clearTimeout(_bindTimeoutId);
      _bindTimeoutId = null;
    }
    _isRebuilding = true;

    _bindTimeoutId = setTimeout(() => {
      cleanupOldCellFocus();
      setup3DGrid();
      restoreFocusAfterRebuild(_focusingRowIndex, _focusingColIndex, _focusingElementIndex);
      // Re-enable navigation
      _bindTimeoutId = null;
      _isRebuilding = false;
    }, 1); // Small delay for DOM to settle
  }

  function cleanupOldCellFocus() {
    const currentCell = _grid[_focusingRowIndex]?.[_focusingColIndex]?.cell;
    if (currentCell) {
      removeFocusedStyle(currentCell);
      currentCell.removeAttribute("tabindex");
    }
  }

  function restoreFocusAfterRebuild(row: number, col: number, elementIndex: number) {
    if (!isValidCell(row, col)) {
      _focusingElementIndex = -1;
      moveToGridStart();
      return;
    }

    _focusingRowIndex = row;
    _focusingColIndex = col;
    _focusingElementIndex = elementIndex;
    focusCell(row, col);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      // setTimeout to allow the Tab focus change to complete first
      setTimeout(() => {
        updateFocusingIndex(); // let browser naturally focus on the next element, however we must update our index to highlight correctly
      }, 0);
      return;
    }

    // Prevent navigation during grid rebuild to avoid race conditions
    if (_isRebuilding || _navigationDisabled) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        moveUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveDown();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveRight();
        break;
      case 'Home':
        event.preventDefault();
        if (event.ctrlKey) {
          moveToGridStart();
        } else {
          moveToRowStart();
        }
        break;
      case 'End':
        event.preventDefault();
        if (event.ctrlKey) {
          moveToGridEnd();
        } else {
          moveToRowEnd();
        }
        break;
    }
  }

  function shouldFocusCell(row: number, col: number): boolean {
    if (!isValidCell(row, col)) return false;

    cleanupOldCellFocus();

    _focusingRowIndex = row;
    _focusingColIndex = col;

    const newCell = _grid[row][col]?.cell;
    newCell?.setAttribute('tabindex', '0');
    setFocusedStyle(newCell);

    // Only disable arrow key navigation for input elements
    _navigationDisabled = newCell.matches('input') || newCell.querySelector('input') !== null;

    return true;
  }

  function isValidCell(row: number, col: number): boolean {
    return row >= 0 && col >= 0 &&
      _grid && _grid.length > 0 &&
      row < _grid.length &&
      col < _grid[row].length;
  }

  function focusCell(row: number, col: number) {
    if (!shouldFocusCell(row, col)) {
      // Reset all indices when trying to focus an invalid cell
      _focusingRowIndex = 0;
      _focusingColIndex = 0;
      _focusingElementIndex = -1;
      return;
    }

    const cellData = _grid[row][col];
    const cell = cellData.cell;
    const focusableElements = cellData.focusables || [];

    _showKeyboardIcon = true;

    if (focusableElements.length === 0) {
      cell.setAttribute("tabindex", "0");
      cell.focus();
      _focusingElementIndex = -1;
    } else {
      if (_focusingElementIndex < 0 || _focusingElementIndex >= focusableElements.length) {
        _focusingElementIndex = 0; // We will focus on the first item of the cell's focusable elements
      }
      // Remove tabindex from cell and focus the element
      cell.removeAttribute("tabindex");
      removeFocusedStyle(cell);

      setTimeout(() => {
        focusableElements[_focusingElementIndex].focus();
      }, 0); // small delay for angular
    }
  }

  function setFocusedStyle(el: HTMLElement) {
    if (!el) return;
    el.style.outline = '2px solid var(--goa-color-interactive-focus)';
    // Use negative offset to draw outline inside the cell, preventing clipping on table headers
    el.style.outlineOffset = '-2px';
  }

  function removeFocusedStyle(el: HTMLElement) {
    if (!el) return;
    el.style.outline = '';
    el.style.outlineOffset = '';
    el.style.boxShadow = '';
  }

  function moveUp() {
    focusCell(_focusingRowIndex - 1, _focusingColIndex);
  }

  function moveDown() {
    focusCell(_focusingRowIndex + 1, _focusingColIndex);
  }

  function moveLeft() {
    // move within the cell first, ex: second button will move to first button, same cell
    const currentCellData = _grid[_focusingRowIndex] && _grid[_focusingRowIndex][_focusingColIndex];

    if (currentCellData && currentCellData.focusables.length > 0 && _focusingElementIndex > 0) {
      _focusingElementIndex = _focusingElementIndex - 1;
      focusCell(_focusingRowIndex, _focusingColIndex);
      return;
    }

    // Check if we're at the first column
    if (_focusingColIndex === 0) {
      // If layout mode and not at first row, wrap to previous row's last cell
      if (keyboardNav === "layout" && _focusingRowIndex > 0) {
        const previousRowLength = _grid[_focusingRowIndex - 1] ? _grid[_focusingRowIndex - 1].length : 0;
        if (previousRowLength > 0) {
          focusCell(_focusingRowIndex - 1, previousRowLength - 1);
        }
      }

      return;
    }

    // Move to previous cell in the same row
    focusCell(_focusingRowIndex, _focusingColIndex - 1);
  }

  function moveRight() {
    // Move within the cell first, ex: first button will move to second button, same cell
    const currentCellData = _grid[_focusingRowIndex] && _grid[_focusingRowIndex][_focusingColIndex];

    if (currentCellData && currentCellData.focusables.length > 0 && _focusingElementIndex !== -1 && _focusingElementIndex < currentCellData.focusables.length - 1) {
      _focusingElementIndex = _focusingElementIndex + 1;
      focusCell(_focusingRowIndex, _focusingColIndex);
      return;
    }

    // Check if we're at the last column of current row
    const currentRowLength = _grid[_focusingRowIndex] ? _grid[_focusingRowIndex].length : 0;
    if (_focusingColIndex >= currentRowLength - 1) {
      // If layout mode and not at last row, wrap to next row's first cell
      if (keyboardNav === "layout" && _focusingRowIndex < _grid.length - 1) {
        const nextRowLength = _grid[_focusingRowIndex + 1] ? _grid[_focusingRowIndex + 1].length : 0;
        if (nextRowLength > 0) {
          focusCell(_focusingRowIndex + 1, 0);
        }
      }

      return;
    }

    // Move to next cell in the same row
    focusCell(_focusingRowIndex, _focusingColIndex + 1);
  }

  function moveToRowStart() {
    focusCell(_focusingRowIndex, 0);
  }

  function moveToRowEnd() {
    if (_grid[_focusingRowIndex]) {
      focusCell(_focusingRowIndex, _grid[_focusingRowIndex].length - 1);
    }
  }

  function moveToGridStart() {
    focusCell(0, 0);
  }

  function moveToGridEnd() {
    if (_grid.length > 0) {
      const lastRow = _grid.length - 1;
      const lastCol = _grid[lastRow].length - 1;
      focusCell(lastRow, lastCol);
    }
  }

  function findCellPosition(cell: HTMLElement): { row: number; col: number } | null {
    if (!_grid || _grid.length === 0) return null;

    for (let row = 0; row < _grid.length; row++) {
      for (let col = 0; col < _grid[row].length; col++) {
        if (_grid[row][col].cell === cell) {
          return { row, col };
        }
      }
    }
    return null;
  }

  function handleCellClick(event: Event) {
    _clickInsideGrid = true;

    // Prevent cell focus changes during grid rebuild to avoid race conditions
    if (_isRebuilding) return;

    const target = event.target as HTMLElement;
    const cell = target.closest('[role="gridcell"]') as HTMLElement;

    if (!cell) return;

    const position = findCellPosition(cell);
    if (position) {
      // Only reset elementIndex if clicking on a different cell
      if (position.row !== _focusingRowIndex || position.col !== _focusingColIndex) {
        _focusingElementIndex = -1;
      }
      focusCell(position.row, position.col);
    }
  }

  function updateFocusingIndex() {
    if (_isRebuilding) return;

    const focusedElement = document.activeElement as HTMLElement;

    if (!focusedElement) {
      return;
    }

    // First try to find via closest gridcell (works for shadow DOM too)
    const closestCell = focusedElement.closest('[role="gridcell"]') as HTMLElement;
    if (!closestCell) return;

    const position = findCellPosition(closestCell);
    if (!position) return;

    if (position.row !== _focusingRowIndex || position.col !== _focusingColIndex) {
      // Different cell, which means not focusing within the same cell, we can reset _focusingIndex
      _focusingElementIndex = -1;
      focusCell(position.row, position.col);
    } else {
      // Same cell - Tab moved focus to next focusable element within cell
      const cellData = _grid[position.row][position.col];
      const focusables = cellData.focusables;

      // Find which element is currently focused
      const currentFocusedIndex = focusables.indexOf(focusedElement as HTMLElement);

      if (currentFocusedIndex !== -1) {
        // Update the index to match the currently focused element
        _focusingElementIndex = currentFocusedIndex;
      }
    }
  }

  function findAllElementsWithDataGridAttributes(root: Element): Element[] {
    const elementsSet = new Set<Element>();

    // helper function for recursive
    function findAllNodesWithAttribute(nodes: NodeList | Node[]): void {
      for (const node of nodes) {
        // Check if current node has the attribute
        if (node instanceof Element && node.hasAttribute("data-grid")) {
          elementsSet.add(node);
        }

        if (node.hasChildNodes()) {
          findAllNodesWithAttribute(Array.from(node.childNodes));
        }

        // Check slot assigned nodes (similar to findFirstNodeOfSlot)
        if (node instanceof HTMLSlotElement) {
          findAllNodesWithAttribute([...node.assignedNodes()]);
        }

        // Check shadow DOM (similar to findFirstNodeOfShadowDOM)
        if (node instanceof HTMLElement && node.shadowRoot) {
          findAllNodesWithAttribute([...(node.shadowRoot?.childNodes || [])]);
        }
      }
    }

    findAllNodesWithAttribute([root]);

    return Array.from(elementsSet);
  }

  /**
   * Return focusable elements within a cell, excluding the cell itself
   * @param cell
   */
  function findAllFocusableElements(cell: HTMLElement): Element[] {
    const elementsSet = new Set<Element>();

    // recursive function helper
    function findAllFocusableNodes(nodes: NodeList | Node[]): void {
      for (const node of nodes) {
        if (node instanceof HTMLElement && node.shadowRoot) {
          findAllFocusableNodes([...(node.shadowRoot?.childNodes || [])]);
        }
        if (node.hasChildNodes()) {
          findAllFocusableNodes(Array.from(node.childNodes));
        }
        if (node instanceof HTMLSlotElement) {
          findAllFocusableNodes([...node.assignedNodes()]);
        }

        // Check the node to break recursive (final point)
        const focusableNode = shouldFocus(node);
        // Add to set only if it's focusable AND not the cell itself
        if (focusableNode && node !== cell) {
          elementsSet.add(node as Element);
        }
      }
    }

    findAllFocusableNodes([cell]);


    return Array.from(elementsSet);
  }

</script>

<style>
  :host {
    position: relative;
    display: block;
  }

  .keyboard-indicator {
    position: fixed;
    bottom: 12px;
    width: 78px;
    height: 54px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  .keyboard-indicator.left {
    left: 12px;
  }

  .keyboard-indicator.right {
    right: 12px;
  }

  .keyboard-indicator.show {
    opacity: 1;
  }

  .keyboard-indicator svg {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={_rootEl} role="grid">
  <slot />
  {#if keyboardIcon && _showKeyboardIcon}
    <div class="keyboard-indicator show {keyboardIconPosition}" aria-hidden="true">
      <svg width="78" height="54" viewBox="0 0 78 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="28" y="4" width="22" height="22" rx="3" fill="#333333"/>
        <path d="M39 12.8076C39.0718 12.8077 39.1428 12.8235 39.208 12.8535C39.2732 12.8835 39.3312 12.927 39.3779 12.9814L42.2812 16.3691C42.559 16.6925 42.329 17.1924 41.9033 17.1924H36.0967C35.6711 17.1922 35.4418 16.6924 35.7188 16.3691L38.6211 12.9814C38.6678 12.927 38.7259 12.8835 38.791 12.8535C38.8563 12.8235 38.9281 12.8076 39 12.8076Z" fill="white"/>
        <rect x="4" y="28" width="22" height="22" rx="3" fill="#333333"/>
        <path d="M16.3682 35.7188C16.6915 35.441 17.1914 35.671 17.1914 36.0967V41.9033C17.1913 42.329 16.6915 42.5583 16.3682 42.2812L12.9805 39.3789C12.926 39.3322 12.8825 39.2741 12.8525 39.209C12.8225 39.1437 12.8066 39.0719 12.8066 39C12.8067 38.9282 12.8226 38.8572 12.8525 38.792C12.8825 38.7268 12.926 38.6688 12.9805 38.6221L16.3682 35.7188Z" fill="white"/>
        <rect x="28" y="28" width="22" height="22" rx="3" fill="#333333"/>
        <path d="M41.9014 36.8076C42.3271 36.8076 42.5573 37.3075 42.2803 37.6309L39.377 41.0186C39.3302 41.073 39.2722 41.1165 39.207 41.1465C39.1418 41.1765 39.0708 41.1923 38.999 41.1924C38.9271 41.1924 38.8554 41.1765 38.79 41.1465C38.7249 41.1165 38.6668 41.073 38.6201 41.0186L35.7178 37.6309C35.44 37.3076 35.6692 36.8079 36.0947 36.8076H41.9014Z" fill="white"/>
        <rect x="52" y="28" width="22" height="22" rx="3" fill="#333333"/>
        <path d="M60.8066 36.0967C60.8066 35.671 61.3065 35.4408 61.6299 35.7178L65.0176 38.6211C65.072 38.6678 65.1155 38.7259 65.1455 38.791C65.1755 38.8562 65.1913 38.9273 65.1914 38.999C65.1914 39.0709 65.1755 39.1427 65.1455 39.208C65.1155 39.2731 65.072 39.3312 65.0176 39.3779L61.6299 42.2803C61.3066 42.5581 60.8068 42.3289 60.8066 41.9033V36.0967Z" fill="white"/>
      </svg>
    </div>
  {/if}
</div>
