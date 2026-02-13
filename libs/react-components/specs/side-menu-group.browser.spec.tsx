import React from "react";
import { render } from "vitest-browser-react";
import { GoabSideMenu, GoabSideMenuGroup } from "../src";
import { vi } from "vitest";

describe("SideMenuGroup", () => {
  it("opens parent and child groups when child item is clicked, closes child but keeps parent open when parent item is clicked", async () => {
    const SideMenu = () => {
      return (
        <GoabSideMenu testId="side-menu">
          <GoabSideMenuGroup heading="Parent" testId="parent-group">
            <a href="#item1" data-testid="item1">
              Item 1
            </a>
            <GoabSideMenuGroup heading="Child" testId="child-group">
              <a href="#item2" data-testid="item2">
                Item 2
              </a>
            </GoabSideMenuGroup>
          </GoabSideMenuGroup>
        </GoabSideMenu>
      );
    };

    const result = render(<SideMenu />);

    // Wait for components to mount
    await vi.waitFor(() => {
      expect(result.getByTestId("parent-group").element()).toBeTruthy();
    });

    const parentGroup = result.getByTestId("parent-group").element() as HTMLElement;
    const childGroup = result.getByTestId("child-group").element() as HTMLElement;

    const parentHeading = parentGroup.querySelector(".heading") as HTMLElement;
    const childHeading = childGroup.querySelector(".heading") as HTMLElement;

    const parentContent = parentGroup.querySelector(
      "[data-testid='group']",
    ) as HTMLElement;
    const childContent = childGroup.querySelector("[data-testid='group']") as HTMLElement;

    // Initially, both groups should be closed
    expect(parentHeading.classList.contains("open")).toBe(false);
    expect(childHeading.classList.contains("open")).toBe(false);
    expect(parentContent.classList.contains("hidden")).toBe(true);
    expect(childContent.classList.contains("hidden")).toBe(true);

    // Step 1: Open the parent group manually to access child
    await parentHeading.click();

    await vi.waitFor(() => {
      expect(parentHeading.classList.contains("open")).toBe(true);
      expect(parentContent.classList.contains("hidden")).toBe(false);
    });

    // Open the child group manually
    await childHeading.click();

    await vi.waitFor(() => {
      expect(childHeading.classList.contains("open")).toBe(true);
      expect(childContent.classList.contains("hidden")).toBe(false);
    });

    // Step 2: Click on Item 2 (inside the child group)
    const item2 = result.getByTestId("item2");
    await item2.click();

    // Wait for URL change and SideMenu to process
    await new Promise(resolve => setTimeout(resolve, 500));

    // Both Parent and Child Group should remain open since Item 2 is in the Child group
    // This tests the regression fix: when child becomes current, parent should also open
    await vi.waitFor(() => {
      expect(parentHeading.classList.contains("open")).toBe(true);
      expect(childHeading.classList.contains("open")).toBe(true);
      expect(parentContent.classList.contains("hidden")).toBe(false);
      expect(childContent.classList.contains("hidden")).toBe(false);
    }, { timeout: 5000 });

    // Step 3: Click on Item 1 (direct child of parent group)
    const item1 = result.getByTestId("item1");
    await item1.click();

    // Wait for URL change and SideMenu to process
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 4: Parent Group should remain open (Item 1 is its child),
    // but Child Group should close (Item 1 is not in the Child group)
    // This tests the regression fix: when child becomes non-current, parent should stay open
    // because parent itself has a current link
    await vi.waitFor(() => {
      expect(parentHeading.classList.contains("open")).toBe(true);
      expect(parentContent.classList.contains("hidden")).toBe(false);
      expect(childHeading.classList.contains("open")).toBe(false);
      expect(childContent.classList.contains("hidden")).toBe(true);
    }, { timeout: 5000 });
  });
});
