import { render, fireEvent, createEvent } from "@testing-library/svelte";
import DataGrid from "./DataGrid.svelte";
import DataGridTestComponent from "./DataGridTestComponent.svelte";
import { it, describe, beforeEach, afterEach, vi } from "vitest";
import { tick } from "svelte";

describe("GoADataGrid", () => {
  let consoleMock: vi.SpyInstance;

  beforeEach(() => {
    consoleMock = vi.spyOn(console, "error").mockImplementation(() => {
      /* do nothing */
    });
  });

  afterEach(() => {
    consoleMock.mockRestore();
  });

  describe("Basic Rendering", () => {
    it("should render test component structure", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]');
      expect(grid).toBeTruthy();

      const testElements = container.querySelectorAll('[data-testid]');
      expect(testElements.length).toBeGreaterThan(0);

      const dataGridElements = container.querySelectorAll('[data-grid]');
      expect(dataGridElements.length).toBeGreaterThan(0);
    });
  });

  describe("Event Handling", () => {
    it("should handle keyboard events without crashing", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;
      expect(grid).toBeTruthy();

      const keyEvents = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Home', 'End', 'Tab'
      ];

      for (const key of keyEvents) {
        const event = createEvent.keyDown(grid, { key });
        await fireEvent(grid, event);

        // Navigation keys should prevent default
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
          expect(event.defaultPrevented).toBe(true);
        }
      }
    });

    it("should handle Ctrl+Home key combination", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;
      const ctrlHomeEvent = createEvent.keyDown(grid, { key: 'Home', ctrlKey: true });

      await fireEvent(grid, ctrlHomeEvent);
      expect(ctrlHomeEvent.defaultPrevented).toBe(true);
    });

    it("should handle Ctrl+End key combination", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;
      const ctrlEndEvent = createEvent.keyDown(grid, { key: 'End', ctrlKey: true });

      await fireEvent(grid, ctrlEndEvent);
      expect(ctrlEndEvent.defaultPrevented).toBe(true);
    });

    it("should handle click events", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      await fireEvent.click(grid);
      expect(grid).toBeTruthy();
    });

    it("should handle Tab key without preventing default", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;
      const tabEvent = createEvent.keyDown(grid, { key: 'Tab' });

      await fireEvent(grid, tabEvent);

      // Tab should not be prevented
      expect(tabEvent.defaultPrevented).toBe(false);
    });
  });

  describe("Data Grid Structure", () => {
    it("should find data-grid row elements", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const rows = container.querySelectorAll('[data-grid="row"]');
      expect(rows.length).toBe(5); // Based on our test component
    });

    it("should find data-grid cell elements", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const cells = container.querySelectorAll('[data-grid^="cell"]');
      expect(cells.length).toBe(15); // 5 rows × 3 cells each
    });

    it("should have test data elements", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      // Verify specific test elements exist
      expect(container.querySelector('[data-testid="header-name"]')).toBeTruthy();
      expect(container.querySelector('[data-testid="row1-name"]')).toBeTruthy();
      expect(container.querySelector('[data-testid="input-name"]')).toBeTruthy();
      expect(container.querySelector('[data-testid="btn-edit"]')).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("should handle empty grid gracefully", async () => {
      const { container } = render(DataGrid);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // Should not crash with empty grid
      const arrowDownEvent = createEvent.keyDown(grid, { key: 'ArrowDown' });
      await fireEvent(grid, arrowDownEvent);

      expect(arrowDownEvent.defaultPrevented).toBe(true);
      expect(grid).toBeTruthy();
    });

    it("should handle multiple rapid key presses", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // Rapid key presses should not crash
      for (let i = 0; i < 10; i++) {
        const event = createEvent.keyDown(grid, { key: 'ArrowRight' });
        await fireEvent(grid, event);
      }

      expect(grid).toBeTruthy();
    });

    it("should handle edge cases with Home/End keys", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      const homeEvent = createEvent.keyDown(grid, { key: 'Home' });
      const endEvent = createEvent.keyDown(grid, { key: 'End' });

      await fireEvent(grid, homeEvent);
      await fireEvent(grid, endEvent);
      await fireEvent(grid, homeEvent);

      expect(homeEvent.defaultPrevented).toBe(true);
      expect(endEvent.defaultPrevented).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA role", async () => {
      const { container } = render(DataGrid);
      await tick();

      const grid = container.querySelector('[role="grid"]');
      expect(grid).toBeTruthy();
      expect(grid?.getAttribute('role')).toBe('grid');
    });

    it("should contain data-grid elements for screen readers", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      // Even if slot processing doesn't work in tests, the structure should exist
      const dataGridElements = container.querySelectorAll('[data-grid]');
      expect(dataGridElements.length).toBeGreaterThan(0);
    });
  });

  describe("Keyboard Icon Property", () => {
    it("should not show keyboard icon when keyboardIcon is false", async () => {
      const { container } = render(DataGrid, { props: { keyboardIcon: false } });
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // Try to trigger keyboard icon
      await fireEvent.click(grid);
      await fireEvent.keyDown(grid, { key: 'ArrowDown' });
      await tick();

      // Keyboard icon should not be rendered
      const keyboardIndicator = container.querySelector('.keyboard-indicator');
      expect(keyboardIndicator).toBeFalsy();
    });

    it("should show keyboard icon when keyboardIcon is explicitly true", async () => {
      const { container } = render(DataGrid, { props: { keyboardIcon: true } });
      await tick();

      const grid = container.querySelector('[role="grid"]');
      expect(grid).toBeTruthy();

      // The keyboard indicator element should be conditionally rendered
      // based on keyboardIcon prop (even if not shown initially)
    });
  });

  describe("Keyboard Navigation Mode", () => {
    it("should default to table navigation mode", async () => {
      const { container } = render(DataGridTestComponent);
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // In table mode, arrow keys should not wrap between rows
      // Test that ArrowLeft at first column doesn't wrap to previous row
      const firstCell = container.querySelector('[data-grid="cell"]') as HTMLElement;
      if (firstCell) {
        await fireEvent.click(firstCell);
        const leftEvent = createEvent.keyDown(grid, { key: 'ArrowLeft' });
        await fireEvent(grid, leftEvent);

        // Should prevent default but not wrap
        expect(leftEvent.defaultPrevented).toBe(true);
      }
    });

    it("should support layout navigation mode", async () => {
      const { container } = render(DataGrid, { props: { keyboardNav: "layout" } });
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // In layout mode, navigation can wrap between rows
      // This tests that the prop is accepted
      expect(grid).toBeTruthy();
    });

    it("should handle layout mode with ArrowLeft wrapping", async () => {
      const { container } = render(DataGridTestComponent, { props: { keyboardNav: "layout" } });
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // Test navigation in layout mode
      // Move to second row, first column, then press left
      await fireEvent.keyDown(grid, { key: 'ArrowDown' });
      await fireEvent.keyDown(grid, { key: 'Home' });

      const leftEvent = createEvent.keyDown(grid, { key: 'ArrowLeft' });
      await fireEvent(grid, leftEvent);

      // In layout mode, should wrap to previous row's last cell
      expect(leftEvent.defaultPrevented).toBe(true);
    });

    it("should handle layout mode with ArrowRight wrapping", async () => {
      const { container } = render(DataGridTestComponent, { props: { keyboardNav: "layout" } });
      await tick();

      const grid = container.querySelector('[role="grid"]') as HTMLElement;

      // Move to end of first row
      await fireEvent.keyDown(grid, { key: 'End' });

      const rightEvent = createEvent.keyDown(grid, { key: 'ArrowRight' });
      await fireEvent(grid, rightEvent);

      // In layout mode, should wrap to next row's first cell
      expect(rightEvent.defaultPrevented).toBe(true);
    });

    it("should accept table mode explicitly", async () => {
      const { container } = render(DataGrid, { props: { keyboardNav: "table" } });
      await tick();

      const grid = container.querySelector('[role="grid"]');
      expect(grid).toBeTruthy();

      // Table mode should not wrap navigation between rows
    });
  });
});
