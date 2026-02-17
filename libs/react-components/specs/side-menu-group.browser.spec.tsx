import { render } from "vitest-browser-react";
import { GoabSideMenu, GoabSideMenuGroup } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page } from "vitest/browser";

describe("SideMenuGroup", () => {
  it("should render a side menu group with heading", async () => {
    await page.viewport(1024, 768);
    
    const Component = () => {
      return (
        <GoabSideMenu testId="side-menu">
          <GoabSideMenuGroup heading="Test Group" testId="test-group">
            <a href="#item1">Item 1</a>
            <a href="#item2">Item 2</a>
          </GoabSideMenuGroup>
        </GoabSideMenu>
      );
    };
    
    const result = render(<Component />);
    
    await vi.waitFor(() => {
      expect(result.getByTestId("side-menu")).toBeTruthy();
      expect(result.getByTestId("test-group")).toBeTruthy();
      
      const testGroup = result.getByTestId("test-group");
      const groupHeading = testGroup.element().querySelector("a.heading");
      expect(groupHeading).toBeTruthy();
      expect(groupHeading?.textContent).toContain("Test Group");
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
      expect(result.getByTestId("test-group")).toBeTruthy();
    });

    const testGroup = result.getByTestId("test-group");
    const groupHeading = testGroup.element().querySelector("a.heading") as HTMLElement;
    expect(groupHeading).toBeTruthy();

    // Initially the group should be closed (hidden)
    let groupContent = testGroup.element().querySelector('.group') as HTMLElement;
    expect(groupContent).toBeTruthy();
    expect(groupContent.classList.contains("hidden")).toBeTruthy();

    // Click to open
    await groupHeading!.click();

    await vi.waitFor(() => {
      const groupContent = testGroup.element().querySelector('.group') as HTMLElement;
      expect(groupContent.classList.contains("hidden")).toBeFalsy();
      expect(groupHeading!.classList.contains("open")).toBeTruthy();
    });

    // Click to close
    await groupHeading!.click();

    await vi.waitFor(() => {
      const groupContent = testGroup.element().querySelector('.group') as HTMLElement;
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

  it("should display chevron icons that change when toggling", async () => {
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

    const chevronGroup = result.getByTestId("chevron-group");
    const groupHeading = chevronGroup.element().querySelector("a.heading") as HTMLElement;
    
    // Wait for the icon to be rendered and get initial state
    let initialIconType: string | null = null;
    await vi.waitFor(() => {
      const trailingIcon = chevronGroup.element().querySelector(".trailing-icon goa-icon");
      expect(trailingIcon).toBeTruthy();
      initialIconType = trailingIcon?.getAttribute("type") || null;
      expect(initialIconType).toBeTruthy();
    });

    // Click to toggle
    await groupHeading!.click();

    await vi.waitFor(() => {
      const trailingIcon = chevronGroup.element().querySelector(".trailing-icon goa-icon");
      const newIconType = trailingIcon?.getAttribute("type");
      // Icon should change after clicking
      expect(newIconType).not.toBe(initialIconType);
      // Should be one of the two chevron types
      expect(["chevron-down", "chevron-forward"]).toContain(newIconType);
    });
  });

  it("should render nested side menu groups", async () => {
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

    // Verify parent group can be opened
    const parentGroup = result.getByTestId("parent-group");
    const parentHeadingLink = parentGroup.element().querySelector("a.heading") as HTMLElement;
    expect(parentHeadingLink).toBeTruthy();
    await parentHeadingLink.click();

    await vi.waitFor(() => {
      const parentGroupContent = parentGroup.element().querySelector('.group') as HTMLElement;
      expect(parentGroupContent.classList.contains("hidden")).toBeFalsy();
    });

    // Verify child group exists and can be opened
    const childGroup = result.getByTestId("child-group");
    const childHeadingLink = childGroup.element().querySelector("a.heading") as HTMLElement;
    expect(childHeadingLink).toBeTruthy();
    await childHeadingLink.click();

    await vi.waitFor(() => {
      const childGroupContent = childGroup.element().querySelector('.group') as HTMLElement;
      expect(childGroupContent.classList.contains("hidden")).toBeFalsy();
    });
  });
});
