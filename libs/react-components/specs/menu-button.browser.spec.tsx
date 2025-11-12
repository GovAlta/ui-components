import { render } from "vitest-browser-react";
import { vi } from "vitest";
import { GoabMenuAction, GoabMenuButton } from "../src";

describe("MenuButton", () => {
  it("should render and trigger action when clicked", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton text="Show actions" testId="menu-button" onAction={onAction}>
          <GoabMenuAction text="Action 1" action="action1" testId="menu-action-1" />
          <GoabMenuAction text="Action 2" action="action2" testId="menu-action-2" icon="add" />
          <GoabMenuAction text="Action 3" action="action3" testId="menu-action-3" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button");

    // Menu actions should not be visible initially
    for (let i = 1; i <= 3; i++) {
      try {
        result.getByTestId(`menu-action-${i}`).element();
        expect(true).toBe(false); // Should not reach here
      } catch (e) {
        // Expected - elements should not be found
      }
    }

    // Test each menu action
    for (let i = 1; i <= 3; i++) {
      await vi.waitFor(async () => {
        // open menu
        await menuButton.click();

        const menuAction = result.getByTestId(`menu-action-${i}`);
        expect(menuAction).toBeDefined();

        // Verify the action is visible
        const element = menuAction.element();
        expect(element).toBeDefined();

        // Click the action
        await menuAction.click();

        // Verify the correct action was triggered
        expect(onAction).toHaveBeenCalledWith({
          action: `action${i}`
        });
      });
    }
  });

  it("should render with icon", async () => {
    const Component = () => {
      return (
        <GoabMenuButton text="Show actions" testId="menu-button">
          <GoabMenuAction text="Action with icon" action="action-icon" testId="menu-action-icon" icon="add" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button");

    // Verify the action with icon is rendered
    await vi.waitFor(async () => {
      // open menu
      await menuButton.click();

      const actionIcon = result.getByTestId("icon-add");
      expect(actionIcon).toBeDefined();

      // Check if the icon attribute is set correctly
      const element = actionIcon.element();
      expect(element.getAttribute("type")).toBe("add");
    });
  });

  it("should handle multiple actions correctly", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton text="Multiple actions" testId="menu-button" onAction={onAction}>
          <GoabMenuAction text="First action" action="first" testId="first-action" />
          <GoabMenuAction text="Second action" action="second" testId="second-action" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button");

    // Click first action
    await vi.waitFor(async () => {
      // open menu
      await menuButton.click();

      const firstAction = result.getByTestId("first-action");
      await firstAction.click();
      expect(onAction).toHaveBeenCalledWith({
        action: "first"
      });
    });

    // Click second action
    await vi.waitFor(async () => {
      // Menu should close after clicking an action, so click again to reopen
      await menuButton.click();

      const secondAction = result.getByTestId("second-action");
      await secondAction.click();
      expect(onAction).toHaveBeenCalledWith({
        action: "second"
      });
    });

    // Verify the correct number of calls and order
    expect(onAction).toHaveBeenCalledTimes(2);
    expect(onAction.mock.calls[0][0].action).toBe("first");
    expect(onAction.mock.calls[1][0].action).toBe("second");
  });
});
