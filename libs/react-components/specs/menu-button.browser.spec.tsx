import { render } from "vitest-browser-react";
import { describe, expect, it, vi, beforeAll } from "vitest";
import { page } from "@vitest/browser/context";
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

describe("GoabMenuButton", () => {
  it("should render icon-only without text and trigger action", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton
          leadingIcon="ellipsis-horizontal"
          testId="icon-menu"
          onAction={onAction}
        >
          <GoabMenuAction text="View" action="view" />
          <GoabMenuAction text="Delete" action="delete" icon="trash" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("icon-menu");

    await menuButton.click();
    await result.getByText("View").click();

    await vi.waitFor(() => {
      expect(onAction).toHaveBeenCalledWith({ action: "view" });
    });
  });

  it("should render with size compact and text", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton text="Actions" size="compact" onAction={onAction}>
          <GoabMenuAction text="Edit" action="edit" icon="pencil" />
          <GoabMenuAction text="Delete" action="delete" icon="trash" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByText("Actions");

    await menuButton.click();
    await result.getByText("Edit").click();

    await vi.waitFor(() => {
      expect(onAction).toHaveBeenCalledWith({ action: "edit" });
    });
  });

  it("should render icon-only with size compact", async () => {
    const onAction = vi.fn();

    const Component = () => {
      return (
        <GoabMenuButton
          leadingIcon="ellipsis-horizontal"
          size="compact"
          testId="icon-compact-menu"
          onAction={onAction}
        >
          <GoabMenuAction text="Assign" action="assign" />
          <GoabMenuAction text="Delete" action="delete" icon="trash" />
        </GoabMenuButton>
      );
    };

    const result = render(<Component />);
    const menuButton = result.getByTestId("icon-compact-menu");

    await menuButton.click();
    await result.getByText("Assign").click();

    await vi.waitFor(() => {
      expect(onAction).toHaveBeenCalledWith({ action: "assign" });
    });
  });

  it("should open only one MenuButton at a time", async () => {
    const Component = () => {
      return (
        <>
          <GoabMenuButton text="Menu 1" testId="menu-1">
            <GoabMenuAction text="Action 1" action="action1" testId="action-1" />
          </GoabMenuButton>
          <GoabMenuButton text="Menu 2" testId="menu-2">
            <GoabMenuAction text="Action 2" action="action2" testId="action-2" />
          </GoabMenuButton>
        </>
      );
    };

    const result = render(<Component />);
    const menu1 = result.getByTestId("menu-1");
    const menu2 = result.getByTestId("menu-2");

    // Open first menu only
    await menu1.click();
    await vi.waitFor(() => {
      expect(result.getByTestId("action-1")).toBeVisible();
      expect(result.getByTestId("action-2")).not.toBeVisible();
    });

    // Open second menu, close the first
    await menu2.click();
    await vi.waitFor(() => {
      expect(result.getByTestId("action-1")).not.toBeVisible();
      expect(result.getByTestId("action-2")).toBeVisible();
    });

    // Open first menu, close the second
    await menu1.click();
    await vi.waitFor(() => {
      expect(result.getByTestId("action-1")).toBeVisible();
      expect(result.getByTestId("action-2")).not.toBeVisible();
    });
  });
});

describe("MenuButton popover position", () => {
  beforeAll(async () => {
    await page.viewport(1280, 800);
  });

  it("opens the menu left-aligned under its button when there is room on the right", async () => {
    const Component = () => (
      <div style={{ position: "absolute", top: 0, left: "100px" }}>
        <GoabMenuButton text="Show actions" testId="menu-button-position">
          <GoabMenuAction text="Organization settings and preferences" action="a1" />
          <GoabMenuAction text="Notification preferences" action="a2" />
          <GoabMenuAction text="Sign out" action="a3" />
        </GoabMenuButton>
      </div>
    );

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button-position");
    const popoverContent = result.getByTestId("popover-content");
    const popoverTarget = result.getByTestId("popover-target");

    await menuButton.click();

    await vi.waitFor(() => {
      expect(popoverContent).toBeVisible();
      const content = popoverContent.element().getBoundingClientRect();
      const target = popoverTarget.element().getBoundingClientRect();
      // Left-aligned: the menu opens at the button's left edge and stays on screen
      expect(Math.abs(content.left - target.left)).toBeLessThanOrEqual(2);
      expect(content.right).toBeLessThanOrEqual(window.innerWidth);
    });
  });

  it("opens the menu right-aligned when it would be squeezed against the screen edge", async () => {
    const Component = () => (
      <div style={{ position: "absolute", top: 0, left: "1080px" }}>
        <GoabMenuButton text="More" testId="menu-button-edge">
          <GoabMenuAction text="Organization settings and preferences" action="a1" />
          <GoabMenuAction text="Notification preferences" action="a2" />
          <GoabMenuAction text="Sign out" action="a3" />
        </GoabMenuButton>
      </div>
    );

    const result = render(<Component />);
    const menuButton = result.getByTestId("menu-button-edge");
    const popoverContent = result.getByTestId("popover-content");
    const popoverTarget = result.getByTestId("popover-target");

    await menuButton.click();

    await vi.waitFor(() => {
      expect(popoverContent).toBeVisible();
      const content = popoverContent.element().getBoundingClientRect();
      const target = popoverTarget.element().getBoundingClientRect();
      // Right-aligned: the menu's right edge meets the button's right edge and the
      // menu keeps its full width on screen.
      expect(Math.abs(content.right - target.right)).toBeLessThanOrEqual(2);
      expect(content.right).toBeLessThanOrEqual(window.innerWidth);
    });
  });
});
