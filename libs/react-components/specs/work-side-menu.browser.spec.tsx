import { render } from "vitest-browser-react";
import { useState } from "react";
import { GoabButton } from "../src";
import { GoabxWorkSideMenu, GoabxWorkSideMenuItem } from "../src/experimental";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

describe("WorkSideMenu", () => {
  describe("Desktop viewport", () => {
    it("should close and open the menu when pressing the toggle button", async () => {
      await page.viewport(1024, 768);
      const Component = () => {
        return (
          <GoabxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoabxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoabxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabxWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);

      expect(result.getByTestId("work-side-menu")).toBeTruthy();

      const menu = result.getByTestId("work-side-menu");
      const toggle = result.getByTestId("toggle-menu");

      await toggle.click();

      expect(menu.element().classList.contains("closed")).toBeTruthy();

      await toggle.click();
      expect(menu.element().classList.contains("closed")).toBeFalsy();
    });

    it("menu item fires a mount event when rendered", async () => {
      const handler = vi.fn();
      window.addEventListener("work-side-menu-item:mount", handler);

      const Component = () => {
        return (
          <GoabxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoabxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoabxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabxWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);
      expect(result.getByTestId("work-side-menu")).toBeTruthy();

      await vi.waitFor(() => {
        expect(handler).toBeCalled();
      });
    });

    it("selecting a menu item navigates to a new location", async () => {
      const handler = vi.fn();
      window.addEventListener("work-side-menu:update", handler);

      const Component = () => {
        return (
          <GoabxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={
              <GoabxWorkSideMenuItem url="#item1" label="Item 1" testId="menu-item-1" />
            }
            secondaryContent={<GoabxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabxWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);
      expect(result.getByTestId("work-side-menu")).toBeTruthy();

      const item1 = result.getByTestId("menu-item-1");

      await item1.click();
      await vi.waitFor(() => {
        expect(window.location.hash).toBe("#item1");
      });
    });
  });

  describe("Mobile viewport", () => {
    it("should close the menu when selecting the background", async () => {
      await page.viewport(390, 844);
      const Component = () => {
        return (
          <GoabxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoabxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoabxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabxWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);

      expect(result.getByTestId("work-side-menu")).toBeTruthy();

      const menu = result.getByTestId("work-side-menu");
      const background = result.getByTestId("work-side-menu-background");

      await background.click({ position: { x: 380, y: 10 } });
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeTruthy();
      });
    });

    it("should open the menu when pressing a button", async () => {
      const Component = () => {
        const [open, setOpen] = useState(false);
        function onClick() {
          setOpen(!open);
        }

        function menuOnToggle() {
          setOpen(!open);
        }
        return (
          <div style={{ display: "flex" }}>
            <GoabxWorkSideMenu
              heading="Test Heading"
              url="https://example.com/"
              userName="John Doe"
              userSecondaryText="test@example.com"
              testId="work-side-menu"
              primaryContent={<GoabxWorkSideMenuItem url="#item1" label="Item 1" />}
              secondaryContent={<GoabxWorkSideMenuItem url="#item2" label="Item 2" />}
              accountContent={<GoabxWorkSideMenuItem url="#item3" label="Item 3" />}
              open={open}
              onToggle={menuOnToggle}
            />
            <GoabButton onClick={onClick}>Toggle menu</GoabButton>
          </div>
        );
      };
      const result = render(<Component />);

      expect(result.getByTestId("work-side-menu")).toBeTruthy();

      const menu = result.getByTestId("work-side-menu");
      const button = result.getByText("Toggle menu");

      await button.click();
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeFalsy();
      });
    });
  });
});
