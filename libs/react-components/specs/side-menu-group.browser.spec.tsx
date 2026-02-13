import React from "react";
import { render } from "vitest-browser-react";
import { GoabSideMenu, GoabSideMenuGroup } from "../src";
import { vi } from "vitest";

describe("SideMenuGroup", () => {
  it("parent group stays open when navigating from child item to parent item", async () => {
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
      expect(result.getByTestId("side-menu").element()).toBeTruthy();
    });

    const sideMenu = result.getByTestId("side-menu").element() as HTMLElement;
    const parentGroup = result.getByTestId("parent-group").element() as HTMLElement;
    const childGroup = result.getByTestId("child-group").element() as HTMLElement;

    const parentHeading = parentGroup.querySelector(".heading") as HTMLElement;
    const childHeading = childGroup.querySelector(".heading") as HTMLElement;

    // Initially, both groups should be closed
    expect(parentHeading.classList.contains("open")).toBe(false);
    expect(childHeading.classList.contains("open")).toBe(false);

    // Step 1: Navigate to item2 (child item) by changing the URL hash
    // We need to trigger a DOM mutation for the SideMenu's MutationObserver to detect
    window.location.hash = "#item2";
    
    // Trigger a DOM mutation by adding/removing a temp element
    const tempEl = document.createElement("div");
    document.body.appendChild(tempEl);
    document.body.removeChild(tempEl);
    
    // Wait for SideMenu to process the URL change
    await new Promise(resolve => setTimeout(resolve, 500));

    // Both parent and child groups should be open because child item is current
    await vi.waitFor(() => {
      expect(parentHeading.classList.contains("open")).toBe(true);
      expect(childHeading.classList.contains("open")).toBe(true);
      expect(parentGroup.classList.contains("current")).toBe(true);
      expect(childGroup.classList.contains("current")).toBe(true);
    }, { timeout: 5000 });

    // Step 2: Navigate to item1 (parent item)
    // This tests the regression fix: parent should stay open even though child becomes non-current
    window.location.hash = "#item1";
    
    // Trigger a DOM mutation
    const tempEl2 = document.createElement("div");
    document.body.appendChild(tempEl2);
    document.body.removeChild(tempEl2);
    
    // Wait for SideMenu to process the URL change
    await new Promise(resolve => setTimeout(resolve, 500));

    // Parent group should remain open (it has the current item)
    // Child group should close (it no longer has a current item)
    await vi.waitFor(() => {
      expect(parentHeading.classList.contains("open")).toBe(true);
      expect(parentGroup.classList.contains("current")).toBe(true);
      expect(childHeading.classList.contains("open")).toBe(false);
      expect(childGroup.classList.contains("current")).toBe(false);
    }, { timeout: 5000 });
  });
});
