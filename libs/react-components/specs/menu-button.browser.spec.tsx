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
          <GoabMenuAction
            text="Action 2"
            action="action2"
            testId="menu-action-2"
            icon="add"
          />
          <GoabMenuAction text="Action 3" action="action3" testId="menu-action-3" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button");
    const menuAction = result.getByTestId(/menu-action-*/);

    // Test each menu action
    for (let i = 1; i <= 3; i++) {
      await menuButton.click();

      // Click the action
      await menuAction.nth(i - 1).click();

      // Verify the correct action was triggered
      await vi.waitFor(() => {
        expect(onAction).toHaveBeenNthCalledWith(i, {
          action: `action${i}`,
        });
        expect(onAction).toHaveBeenCalledTimes(i);
      });
    }

    expect(onAction).toHaveBeenCalledTimes(3);
  });

  it("should render with icon", async () => {
    const Component = () => {
      return (
        <GoabMenuButton text="Show actions" testId="menu-button">
          <GoabMenuAction
            text="Action with icon"
            action="action-icon"
            testId="menu-action-icon"
            icon="add"
          />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button");
    const actionIcon = result.getByTestId("icon-add");

    await menuButton.click();

    // Check if the icon attribute is set correctly
    await vi.waitFor(() => {
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
    const firstAction = result.getByTestId("first-action");
    const secondAction = result.getByTestId("second-action");

    // open menu
    await menuButton.click();

    // Click first action
    await firstAction.click();

    await vi.waitFor(() => {
      expect(onAction).toHaveBeenNthCalledWith(1, {
        action: "first",
      });
      expect(onAction).toHaveBeenCalledTimes(1);
    });

    // Menu should close after clicking an action, so click again to reopen
    await menuButton.click();

    // Click second action
    await secondAction.click();

    await vi.waitFor(() => {
      expect(onAction).toHaveBeenNthCalledWith(2, {
        action: "second",
      });
      expect(onAction).toHaveBeenCalledTimes(2);
    });
  });

  it("should render with leadingIcon", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton
          text="Dual icons"
          testId="menu-button"
          leadingIcon="calendar"
          onAction={onAction}
        >
          <GoabMenuAction
            text="Add item"
            action="add"
            testId="menu-action-add"
            icon="add"
          />
          <GoabMenuAction
            text="Delete item"
            action="delete"
            testId="menu-action-delete"
            icon="trash"
          />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);

    // Verify leading icon on button
    await vi.waitFor(async () => {
      const leadingIcon = result.getByTestId("icon-calendar");
      expect(leadingIcon).toBeDefined();
    });
  });
});
