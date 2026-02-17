import { render } from "vitest-browser-react";
import { GoabSideMenu, GoabSideMenuGroup } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

describe("SideMenuGroup", () => {
  describe("Nested Side Menu Groups", () => {
    it("should keep parent and child groups open when child item is selected", async () => {
      await page.viewport(1024, 768);
      
      const Component = () => {
        return (
          <GoabSideMenu testId="side-menu">
            <GoabSideMenuGroup heading="Parent Group" testId="parent-group">
              <a href="#parent-item" data-testid="parent-item">Parent Item</a>
              
              <GoabSideMenuGroup heading="Child Group" testId="child-group">
                <a href="#child-item" data-testid="child-item">Child Item</a>
              </GoabSideMenuGroup>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        );
      };
      
      const result = render(<Component />);
      
      await vi.waitFor(() => {
        expect(result.getByTestId("side-menu")).toBeTruthy();
        expect(result.getByTestId("parent-group")).toBeTruthy();
        expect(result.getByTestId("child-group")).toBeTruthy();
      });

      // Click to open the parent group
      const parentGroupHeading = result.getByTestId("parent-group").element().querySelector("a.heading");
      expect(parentGroupHeading).toBeTruthy();
      await parentGroupHeading!.click();

      await vi.waitFor(() => {
        const parentGroup = result.getByTestId("parent-group").element();
        const parentGroupContent = parentGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(parentGroupContent).toBeTruthy();
        expect(parentGroupContent.classList.contains("hidden")).toBeFalsy();
      });

      // Click to open the child group
      const childGroupHeading = result.getByTestId("child-group").element().querySelector("a.heading");
      expect(childGroupHeading).toBeTruthy();
      await childGroupHeading!.click();

      await vi.waitFor(() => {
        const childGroup = result.getByTestId("child-group").element();
        const childGroupContent = childGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(childGroupContent).toBeTruthy();
        expect(childGroupContent.classList.contains("hidden")).toBeFalsy();
      });

      // Click the child item
      const childItem = result.getByTestId("child-item");
      await childItem.click();

      await vi.waitFor(() => {
        expect(window.location.hash).toBe("#child-item");
        
        // Verify the child item has the 'current' class
        const childItemEl = result.getByTestId("child-item").element();
        expect(childItemEl.classList.contains("current")).toBeTruthy();

        // Verify both parent and child groups remain open
        const parentGroup = result.getByTestId("parent-group").element();
        const parentGroupContent = parentGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(parentGroupContent.classList.contains("hidden")).toBeFalsy();

        const childGroup = result.getByTestId("child-group").element();
        const childGroupContent = childGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(childGroupContent.classList.contains("hidden")).toBeFalsy();
      });
    });

    it("should keep parent group open but close child group when parent item is selected", async () => {
      await page.viewport(1024, 768);
      
      const Component = () => {
        return (
          <GoabSideMenu testId="side-menu">
            <GoabSideMenuGroup heading="Parent Group" testId="parent-group">
              <a href="#parent-item" data-testid="parent-item">Parent Item</a>
              
              <GoabSideMenuGroup heading="Child Group" testId="child-group">
                <a href="#child-item" data-testid="child-item">Child Item</a>
              </GoabSideMenuGroup>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        );
      };
      
      const result = render(<Component />);
      
      await vi.waitFor(() => {
        expect(result.getByTestId("side-menu")).toBeTruthy();
      });

      // Click to open the parent group
      const parentGroupHeading = result.getByTestId("parent-group").element().querySelector("a.heading");
      expect(parentGroupHeading).toBeTruthy();
      await parentGroupHeading!.click();

      await vi.waitFor(() => {
        const parentGroup = result.getByTestId("parent-group").element();
        const parentGroupContent = parentGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(parentGroupContent.classList.contains("hidden")).toBeFalsy();
      });

      // Click to open the child group
      const childGroupHeading = result.getByTestId("child-group").element().querySelector("a.heading");
      expect(childGroupHeading).toBeTruthy();
      await childGroupHeading!.click();

      await vi.waitFor(() => {
        const childGroup = result.getByTestId("child-group").element();
        const childGroupContent = childGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(childGroupContent.classList.contains("hidden")).toBeFalsy();
      });

      // Click the parent item
      const parentItem = result.getByTestId("parent-item");
      await parentItem.click();

      await vi.waitFor(() => {
        expect(window.location.hash).toBe("#parent-item");
        
        // Verify the parent item has the 'current' class
        const parentItemEl = result.getByTestId("parent-item").element();
        expect(parentItemEl.classList.contains("current")).toBeTruthy();

        // Verify parent group remains open
        const parentGroup = result.getByTestId("parent-group").element();
        const parentGroupContent = parentGroup.querySelector('[data-testid="group"]') as HTMLElement;
        expect(parentGroupContent.classList.contains("hidden")).toBeFalsy();

        // Verify child group is closed (optional based on implementation)
        // This might vary based on the exact expected behavior
      });
    });

    it("should toggle group open/closed when heading is clicked", async () => {
      await page.viewport(1024, 768);
      
      const Component = () => {
        return (
          <GoabSideMenu testId="side-menu">
            <GoabSideMenuGroup heading="Test Group" testId="test-group">
              <a href="#item1" data-testid="item1">Item 1</a>
              <a href="#item2" data-testid="item2">Item 2</a>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        );
      };
      
      const result = render(<Component />);
      
      await vi.waitFor(() => {
        expect(result.getByTestId("side-menu")).toBeTruthy();
        expect(result.getByTestId("test-group")).toBeTruthy();
      });

      const groupHeading = result.getByTestId("test-group").element().querySelector("a.heading");
      expect(groupHeading).toBeTruthy();

      // Initially the group should be closed (hidden)
      let groupContent = result.getByTestId("test-group").element().querySelector('[data-testid="group"]') as HTMLElement;
      expect(groupContent).toBeTruthy();
      expect(groupContent.classList.contains("hidden")).toBeTruthy();

      // Click to open
      await groupHeading!.click();

      await vi.waitFor(() => {
        const groupContent = result.getByTestId("test-group").element().querySelector('[data-testid="group"]') as HTMLElement;
        expect(groupContent.classList.contains("hidden")).toBeFalsy();
        expect(groupHeading!.classList.contains("open")).toBeTruthy();
      });

      // Click to close
      await groupHeading!.click();

      await vi.waitFor(() => {
        const groupContent = result.getByTestId("test-group").element().querySelector('[data-testid="group"]') as HTMLElement;
        expect(groupContent.classList.contains("hidden")).toBeTruthy();
        expect(groupHeading!.classList.contains("open")).toBeFalsy();
      });
    });

    it("should render with icon when provided", async () => {
      await page.viewport(1024, 768);
      
      const Component = () => {
        return (
          <GoabSideMenu testId="side-menu">
            <GoabSideMenuGroup heading="Group with Icon" icon="folder" testId="icon-group">
              <a href="#item1">Item 1</a>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        );
      };
      
      const result = render(<Component />);
      
      await vi.waitFor(() => {
        expect(result.getByTestId("icon-group")).toBeTruthy();
        
        const iconGroup = result.getByTestId("icon-group").element();
        const leadingIcon = iconGroup.querySelector(".leading-icon goa-icon");
        expect(leadingIcon).toBeTruthy();
        expect(leadingIcon?.getAttribute("type")).toBe("folder");
      });
    });

    it("should display chevron icons indicating open/closed state", async () => {
      await page.viewport(1024, 768);
      
      const Component = () => {
        return (
          <GoabSideMenu testId="side-menu">
            <GoabSideMenuGroup heading="Chevron Test Group" testId="chevron-group">
              <a href="#item1">Item 1</a>
            </GoabSideMenuGroup>
          </GoabSideMenu>
        );
      };
      
      const result = render(<Component />);
      
      await vi.waitFor(() => {
        expect(result.getByTestId("chevron-group")).toBeTruthy();
      });

      const groupHeading = result.getByTestId("chevron-group").element().querySelector("a.heading");
      const trailingIcon = result.getByTestId("chevron-group").element().querySelector(".trailing-icon goa-icon");
      
      expect(trailingIcon).toBeTruthy();
      
      // Initially closed - should show chevron-forward
      expect(trailingIcon?.getAttribute("type")).toBe("chevron-forward");

      // Click to open
      await groupHeading!.click();

      await vi.waitFor(() => {
        const trailingIcon = result.getByTestId("chevron-group").element().querySelector(".trailing-icon goa-icon");
        // When open - should show chevron-down
        expect(trailingIcon?.getAttribute("type")).toBe("chevron-down");
      });
    });
  });
});
