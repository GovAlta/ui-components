import { render } from "vitest-browser-react";
import { GoaxWorkSideMenu, GoaxWorkSideMenuItem } from "../src/experimental";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

describe("WorkSideMenu", () => {
  describe("Desktop viewport", () => {
    it("should close and open the menu when pressing the toggle button", async () => {
      await page.viewport(1024, 768);
      const Component = () => {
        return (
          <GoaxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoaxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoaxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoaxWorkSideMenuItem url="#item3" label="Item 3" />}
          />
        );
      };
      const result = render(<Component />);

      // Wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(result.getByTestId("work-side-menu")).toBeTruthy();
      });

      const menu = result.getByTestId("work-side-menu");
      const toggle = result.getByTestId("toggle-menu");

      await toggle.click();
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeTruthy();
      });

      await toggle.click();
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeFalsy();
      });
    });

    it("menu item fires a mount event when rendered", async () => {
      const handler = vi.fn();
      window.addEventListener("work-side-menu-item:mount", handler);

      const Component = () => {
        return (
          <GoaxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoaxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoaxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoaxWorkSideMenuItem url="#item3" label="Item 3" />}
          />
        );
      };
      const result = render(<Component />);

      await vi.waitFor(() => {
        expect(result.getByTestId("work-side-menu")).toBeTruthy();
        expect(handler).toBeCalled();
      });
    });

    it("selecting a menu item navigates to a new location", async () => {
      const handler = vi.fn();
      window.addEventListener("work-side-menu:update", handler);

      const Component = () => {
        return (
          <GoaxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={
              <GoaxWorkSideMenuItem url="#item1" label="Item 1" testId="menu-item-1" />
            }
            secondaryContent={<GoaxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoaxWorkSideMenuItem url="#item3" label="Item 3" />}
          />
        );
      };
      const result = render(<Component />);
      // Wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(result.getByTestId("work-side-menu")).toBeTruthy();
      });

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
          <GoaxWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoaxWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoaxWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoaxWorkSideMenuItem url="#item3" label="Item 3" />}
          />
        );
      };
      const result = render(<Component />);

      // Wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(result.getByTestId("work-side-menu")).toBeTruthy();
      });

      const menu = result.getByTestId("work-side-menu");
      const background = result.getByTestId("work-side-menu-background");

      await background.click({ force: true });
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeFalsy();
      });
    });
  });
});
