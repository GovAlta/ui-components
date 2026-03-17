import { render } from "vitest-browser-react";
import { GoabAppHeaderMenu, GoabNotification } from "../src";
import { expect, describe, it, vi, beforeAll } from "vitest";
import { useState } from "react";
import { page, userEvent } from "@vitest/browser/context";

describe("AppHeaderMenu", () => {
  // AppHeaderMenu uses goa-popover only in desktop mode (>= 1024px)
  beforeAll(async () => {
    await page.viewport(1280, 800);
  });

  it("should work before and after dismissing a notification banner - issue 3499", async () => {
    const Component = () => {
      const [showBanner, setShowBanner] = useState(true);

      return (
        <>
          <GoabAppHeaderMenu heading="Test Menu" testId="test-menu">
            <a href="#" data-testid="menu-item-1">
              Menu Item 1
            </a>
            <a href="#" data-testid="menu-item-2">
              Menu Item 2
            </a>
            <a href="#" data-testid="menu-item-3">
              Menu Item 3
            </a>
          </GoabAppHeaderMenu>
          {showBanner && (
            <GoabNotification
              type="information"
              testId="test-banner"
              onDismiss={() => setShowBanner(false)}
            >
              Dismiss this notification, then verify AppHeaderMenu still works.
            </GoabNotification>
          )}
        </>
      );
    };

    const result = render(<Component />);
    const menuTrigger = result.getByText("Test Menu");

    // 1. Open menu while banner is visible
    await menuTrigger.click();
    await vi.waitFor(() => {
      const popoverContent = result.getByTestId("popover-content");
      expect(popoverContent.element().checkVisibility()).toBeTruthy();
    });
    expect(result.getByTestId("menu-item-1").element().checkVisibility()).toBeTruthy();

    // Close menu with Escape
    await userEvent.keyboard("{Escape}");
    await vi.waitFor(
      () => {
        const popoverContent = result.getByTestId("popover-content");
        expect(popoverContent.element().checkVisibility()).toBeFalsy();
      },
      { timeout: 10000 },
    );

    // 2. Dismiss the notification banner
    const banner = result.getByTestId("test-banner");
    const dismissButton = banner.getByRole("button");
    await dismissButton.click();

    // 3. Open menu again — should still work after banner is removed from DOM
    await menuTrigger.click();
    await vi.waitFor(() => {
      const popoverContent = result.getByTestId("popover-content");
      expect(popoverContent.element().checkVisibility()).toBeTruthy();
    });
    expect(result.getByTestId("menu-item-1").element().checkVisibility()).toBeTruthy();
  });
});
