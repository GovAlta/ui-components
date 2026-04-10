import { render } from "vitest-browser-react";
import { useState } from "react";
import { GoabButton } from "../src";
import { GoabWorkSideMenu, GoabWorkSideMenuItem, GoabWorkSideMenuGroup } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

describe("WorkSideMenu", () => {
  describe("Desktop viewport", () => {
    it("renders with slots", async () => {
      await page.viewport(1024, 768);
      const Component = () => {
        return (
          <GoabWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={
              <GoabWorkSideMenuItem
                url="#item1"
                label="Item 1"
                testId="primary-menu-item"
              />
            }
            secondaryContent={
              <GoabWorkSideMenuItem
                url="#item2"
                label="Item 2"
                testId="secondary-menu-item"
              />
            }
            accountContent={
              <GoabWorkSideMenuItem
                url="#item3"
                label="Item 3"
                testId="account-menu-item"
              />
            }
            open={true}
          />
        );
      };
      const result = render(<Component />);

      await vi.waitFor(() => {
        const menu = result.getByTestId("work-side-menu");
        expect(menu).toBeTruthy();

        const primarySlot = result.baseElement.querySelector("[slot='primary']");
        const primaryMenuItem = result.getByTestId("primary-menu-item");
        const primaryLink = primaryMenuItem.element().querySelector("a");

        expect(primarySlot).toBeTruthy();
        expect(primaryLink?.getAttribute("href")).toBe("#item1");
        expect(primaryLink?.textContent).toContain("Item 1");
        expect(primaryLink?.role).toBe("menuitem");

        const secondarySlot = result.baseElement.querySelector("[slot='secondary']");
        const secondaryMenuItem = result.getByTestId("secondary-menu-item");
        const secondaryLink = secondaryMenuItem.element().querySelector("a");

        expect(secondarySlot).toBeTruthy();
        expect(secondaryLink?.getAttribute("href")).toBe("#item2");
        expect(secondaryLink?.textContent).toContain("Item 2");
        expect(secondaryLink?.role).toBe("menuitem");

        const accountSlot = result.baseElement.querySelector("[slot='account']");
        const accountMenuItem = result.getByTestId("account-menu-item");
        const accountLink = accountMenuItem.element().querySelector("a");

        expect(accountSlot).toBeTruthy();
        expect(accountLink?.getAttribute("href")).toBe("#item3");
        expect(accountLink?.textContent).toContain("Item 3");
        expect(accountLink?.role).toBe("menuitem");
      });
    });

    it("should close and open the menu when pressing the toggle button", async () => {
      const Component = () => {
        return (
          <GoabWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoabWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoabWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);
      const menu = result.getByTestId("work-side-menu");
      const toggle = result.getByTestId("toggle-menu");

      await toggle.click();

      expect(menu.element().classList.contains("closed")).toBeTruthy();

      await toggle.click();
      expect(menu.element().classList.contains("closed")).toBeFalsy();
    });

    it("should call onNavigate and prevent default navigation when menu item is clicked", async () => {
      await page.viewport(1024, 768);
      const onNavigate = vi.fn();

      const Component = () => {
        const [currentPage, setCurrentPage] = useState("/dashboard");

        return (
          <div>
            <GoabWorkSideMenu
              heading="Test App"
              url="/dashboard"
              open={true}
              testId="work-side-menu"
              onNavigate={(path: string) => {
                setCurrentPage(path);
                onNavigate(path);
              }}
              primaryContent={
                <>
                  <GoabWorkSideMenuItem
                    icon="grid"
                    label="Dashboard"
                    url="/dashboard"
                    testId="nav-dashboard"
                  />
                  <GoabWorkSideMenuItem
                    icon="search"
                    label="Search"
                    url="/search"
                    testId="nav-search"
                  />
                </>
              }
            />
            <div data-testid="current-page">{currentPage}</div>
          </div>
        );
      };

      const result = render(<Component />);

      await vi.waitFor(() => {
        const searchItem = result.getByTestId("nav-search");
        expect(searchItem).toBeTruthy();
      });

      const searchItem = result.getByTestId("nav-search");
      const link = searchItem.element().querySelector("a");
      expect(link).toBeTruthy();

      await searchItem.click();

      await vi.waitFor(() => {
        expect(onNavigate).toHaveBeenCalledWith("/search");
        const currentPageEl = result.getByTestId("current-page");
        expect(currentPageEl.element().textContent).toBe("/search");
      });

      // Verify no full page navigation occurred
      expect(window.location.pathname).not.toBe("/search");
    });
  });

  describe("Mobile viewport", () => {
    it("should close the menu when selecting the background", async () => {
      await page.viewport(390, 844);
      const Component = () => {
        return (
          <GoabWorkSideMenu
            heading="Test Heading"
            url="https://example.com/"
            userName="John Doe"
            userSecondaryText="test@example.com"
            testId="work-side-menu"
            primaryContent={<GoabWorkSideMenuItem url="#item1" label="Item 1" />}
            secondaryContent={<GoabWorkSideMenuItem url="#item2" label="Item 2" />}
            accountContent={<GoabWorkSideMenuItem url="#item3" label="Item 3" />}
            open={true}
          />
        );
      };
      const result = render(<Component />);
      const menu = result.getByTestId("work-side-menu");
      const background = result.getByTestId("work-side-menu-background");

      await background.click({ position: { x: 380, y: 10 } });
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeTruthy();
      });
    });

    it("should open the menu when clicking an external button", async () => {
      const Component = () => {
        const [open, setOpen] = useState(false);
        function onClick() {
          setOpen(!open);
        }

        function menuOnToggle() {
          setOpen(!open);
        }
        return (
          <>
            <GoabWorkSideMenu
              heading="Test Heading"
              url="https://example.com/"
              userName="John Doe"
              userSecondaryText="test@example.com"
              testId="work-side-menu"
              primaryContent={<GoabWorkSideMenuItem url="#item1" label="Item 1" />}
              secondaryContent={<GoabWorkSideMenuItem url="#item2" label="Item 2" />}
              accountContent={<GoabWorkSideMenuItem url="#item3" label="Item 3" />}
              open={open}
              onToggle={menuOnToggle}
            />
            <GoabButton onClick={onClick}>Toggle menu</GoabButton>
          </>
        );
      };
      const result = render(<Component />);
      const menu = result.getByTestId("work-side-menu");
      const button = result.getByText("Toggle menu");

      await button.click();
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("closed")).toBeFalsy();
      });
    });
  });

  describe("Scroll pinning (#3548)", () => {
    it("should keep secondary menu visible when primary nav overflows", async () => {
      await page.viewport(1024, 400);

      const Component = () => {
        return (
          <GoabWorkSideMenu
            heading="Test App"
            url="https://example.com/"
            testId="scroll-menu"
            open={true}
            primaryContent={
              <>
                {Array.from({ length: 15 }, (_, i) => (
                  <GoabWorkSideMenuItem
                    key={i}
                    url={`#item-${i}`}
                    label={`Primary item ${i + 1}`}
                    icon="document"
                  />
                ))}
              </>
            }
            secondaryContent={
              <GoabWorkSideMenuItem
                url="#secondary"
                label="Secondary item"
                icon="search"
                testId="pinned-secondary"
              />
            }
          />
        );
      };

      const result = render(<Component />);
      const menu = result.getByTestId("scroll-menu");
      const secondary = result.getByTestId("pinned-secondary");

      await vi.waitFor(() => {
        expect(menu.element().classList.contains("scrolling")).toBe(true);
        expect(secondary).toBeVisible();
      });
    });

    it("should show scroll indicators when overflow is triggered by expanding a group", async () => {
      await page.viewport(1024, 500);

      const Component = () => {
        return (
          <GoabWorkSideMenu
            heading="Test App"
            url="https://example.com/"
            testId="scroll-menu-dynamic"
            open={true}
            primaryContent={
              <>
                <GoabWorkSideMenuItem url="#item-1" label="Item 1" icon="home" />
                <GoabWorkSideMenuItem url="#item-2" label="Item 2" icon="mail" />
                <GoabWorkSideMenuGroup
                  heading="Expandable group"
                  icon="folder"
                  testId="expand-group"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <GoabWorkSideMenuItem
                      key={i}
                      url={`#group-item-${i}`}
                      label={`Group item ${i + 1}`}
                      icon="document"
                    />
                  ))}
                </GoabWorkSideMenuGroup>
                <GoabWorkSideMenuItem url="#item-3" label="Item 3" icon="list" />
              </>
            }
            secondaryContent={
              <GoabWorkSideMenuItem
                url="#secondary"
                label="Secondary item"
                icon="search"
                testId="pinned-secondary-dynamic"
              />
            }
          />
        );
      };

      const result = render(<Component />);
      const menu = result.getByTestId("scroll-menu-dynamic");
      const group = result.getByTestId("expand-group");

      // Initially no overflow — group is collapsed
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("scrolling")).toBe(false);
      });

      // Expand the group to trigger overflow
      const summary = group.element().querySelector("summary");
      await summary?.click();

      // Scroll indicators should appear dynamically
      await vi.waitFor(() => {
        expect(menu.element().classList.contains("scrolling")).toBe(true);
        const secondary = result.getByTestId("pinned-secondary-dynamic");
        expect(secondary).toBeVisible();
      });
    });
  });

  describe("WorkSideMenuGroup", () => {
    let isOpen = false;
    const Component = () => {
      return (
        <GoabWorkSideMenu
          heading="Test Heading"
          url="https://example.com/"
          userName="John Doe"
          userSecondaryText="test@example.com"
          testId="work-side-menu"
          primaryContent={
            <>
              <GoabWorkSideMenuItem icon="grid" label="Dashboard" url="/dashboard" />
              <GoabWorkSideMenuGroup
                icon="document"
                heading="Group heading"
                open={isOpen}
                testId="test-group"
              >
                <GoabWorkSideMenuItem
                  label="Invoices"
                  url="/test-url"
                  testId="test-item"
                />
                <GoabWorkSideMenuItem label="Contracts" url="/contracts" />
                <GoabWorkSideMenuItem label="Reports" url="/reports" />
              </GoabWorkSideMenuGroup>
              <GoabWorkSideMenuItem icon="list" label="Cases" url="/cases" />
            </>
          }
          open={true}
        />
      );
    };

    it("should render a group expanded when open is true", async () => {
      isOpen = true;
      await page.viewport(1024, 768);

      const result = render(<Component />);
      const group = result.getByTestId("test-group");

      await vi.waitFor(() => {
        const heading = group.getByText("Group heading");
        const detailsEl = heading.element().closest("details");
        const item = result.getByTestId("test-item");

        expect(detailsEl).toHaveAttribute("open");
        expect(item).toBeVisible();
      });
    });

    it("should render a group collapsed when open is false", async () => {
      isOpen = false;
      await page.viewport(1024, 768);

      const result = render(<Component />);
      const group = result.getByTestId("test-group");

      await vi.waitFor(() => {
        const heading = group.getByText("Group heading");
        const detailsEl = heading.element().closest("details");
        const item = result.getByTestId("test-item");

        expect(detailsEl).not.toHaveAttribute("open");
        expect(item).not.toBeVisible();
      });
    });

    it("should render a group expanded when it has a current menu item", async () => {
      isOpen = false;
      await page.viewport(1024, 768);

      window.history.pushState({}, "", "/test-url");
      window.dispatchEvent(new PopStateEvent("popstate"));

      const result = render(<Component />);
      const group = result.getByTestId("test-group");

      await vi.waitFor(() => {
        const heading = group.getByText("Group heading");
        const detailsEl = heading.element().closest("details");
        const item = result.getByTestId("test-item");
        const link = item.element().querySelector("a");

        expect(detailsEl).toHaveAttribute("open");
        expect(item).toBeVisible();
        expect(link?.classList.contains("current")).toBe(true);
      });
    });
  });
});
