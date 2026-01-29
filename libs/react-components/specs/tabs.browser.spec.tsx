import { render } from "vitest-browser-react";

import { GoabTabs, GoabTab } from "../src";
import { expect, describe, it, vi } from "vitest";
import { GoabBadge } from "../src/lib/badge/badge";

describe("Tabs Browser Tests", () => {
  describe("bug-2433", () => {
    it("should not automatically scroll to tab on initial load", async () => {
      /**
       * When loading a page with a Tab on it, the initial tab is loaded into the URL automatically, despite never being selected.
       * If the tab is lower down on the page, this causes the page to scroll automatically down to the Tab location, this is undesirable on an initial page load.
       *
       */

      // GIVEN
      const Component = () => {
        return (
          <>
            <div style={{ height: "2000px" }}>Tall content before tabs</div>
            <GoabTabs testId="test-tabs">
              <GoabTab heading="Tab 1">Content 1</GoabTab>
              <GoabTab heading="Tab 2">Content 2</GoabTab>
            </GoabTabs>
          </>
        );
      };

      // Scroll to the top of the page
      window.scrollTo(0, 0);
      const initialScrollY = window.scrollY;

      // WHEN
      const result = render(<Component />);

      // Wait for component to fully render
      await vi.waitFor(() => {
        expect(result.getByTestId("test-tabs")).toBeTruthy();
      });

      // THEN - Scroll position should not have changed
      expect(window.scrollY).toBe(initialScrollY);
    });

    it("should preserve query string and multiple hashes in URL", async () => {
      // Setup - Mock initial URL with query string and multiple hashes
      // Setup - Add query string and hash to current URL
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("param", "value");
      const newUrl = `${window.location.pathname}?${searchParams.toString()}#tab-2#anchorPoint`;
      window.history.pushState({}, "", newUrl);

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Tab 1">Content 1</GoabTab>
            <GoabTab heading="Tab 2">Content 2</GoabTab>
          </GoabTabs>
        );
      };

      render(<Component />);

      // Verify URL components are preserved
      await vi.waitFor(() => {
        expect(window.location.search.indexOf("param=value")).toBeGreaterThan(0);
        // Check for both hashes in the URL
        expect(window.location.hash).toBe("#tab-2#anchorPoint");
        expect(window.location.href).toContain("#tab-2#anchorPoint");
      });
    });

    it("should return to previous page URL when using browser back button", async () => {
      // Set initial page URL
      const initialPage = "/abc";
      window.history.pushState({}, "", initialPage);

      // Navigate to tabs page
      const tabsPage = "/tabs";
      window.history.pushState({}, "", tabsPage);

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Tab 1">Content 1</GoabTab>
            <GoabTab heading="Tab 2">Content 2</GoabTab>
          </GoabTabs>
        );
      };

      const { getByRole } = render(<Component />);
      const tablist = getByRole("tab");

      // wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(tablist.elements().length).toBe(2);
      });

      // Click on Tab 2
      const tab2 = tablist.elements()[1];
      await tab2.click();

      // Verify we're on tab 2
      expect(window.location.pathname).toBe(tabsPage);
      expect(window.location.hash).toBe("#tab-2");

      // Go back in history
      window.history.back();

      // Wait and verify we return to the initial page
      await vi.waitFor(
        () => {
          expect(window.location.pathname, "Should return to initial page").toBe(
            initialPage,
          );
          expect(window.location.hash, "Should have no hash").toBe("");
        },
        {
          timeout: 1000,
        },
      );
    });

    it("should not override anchor links when loading page", async () => {
      // Set initial URL with an anchor link
      const pageUrl = "/docs/page";
      const anchorTarget = "toc-3";
      window.history.pushState({}, "", `${pageUrl}#${anchorTarget}`);

      const Component = () => {
        return (
          <>
            <GoabTabs testId="test-tabs">
              <GoabTab heading="Overview">
                <h2>Overview Content</h2>
              </GoabTab>
              <GoabTab heading="Details">
                <h2>Details Content</h2>
              </GoabTab>
            </GoabTabs>

            {/* Content with anchor target */}
            <div style={{ marginTop: "500px" }}>
              <h2 id="toc-3" data-testid="anchor-target">
                Page Content Section
              </h2>
              <p>This is the content we want to anchor to</p>
            </div>
          </>
        );
      };

      const { getByTestId } = render(<Component />);

      // Wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
        expect(getByTestId("anchor-target")).toBeTruthy();
      });

      // Verify URL still contains our original anchor and hasn't been changed to #tab-0
      expect(window.location.href).toEqual(
        expect.stringContaining(`${window.location.origin}/docs/page#${anchorTarget}`),
      );
    });

    it("should activate correct tab when hash changes programmatically", async () => {
      // GIVEN - Component with multiple tabs
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Tab 1">Content 1</GoabTab>
            <GoabTab heading="Tab 2">Content 2</GoabTab>
            <GoabTab heading="Tab 3">Content 3</GoabTab>
          </GoabTabs>
        );
      };

      const { getByTestId } = render(<Component />);

      // Wait for full render
      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // Get tab elements directly
      const getTabs = () => document.querySelectorAll("goa-tab");
      const goaTabs = getTabs();
      expect(goaTabs.length).toBe(3);

      window.location.hash = "#tab-1";
      window.dispatchEvent(new Event("hashchange"));

      await vi.waitFor(
        () => {
          const goaTabs = getTabs();
          expect(goaTabs[0].getAttribute("open")).toBe("true");
          expect(goaTabs[1].getAttribute("open")).toBe("false");
          expect(goaTabs[2].getAttribute("open")).toBe("false");
        },
        { timeout: 2000 },
      );

      window.location.hash = "#tab-2";
      window.dispatchEvent(new Event("hashchange"));

      await vi.waitFor(
        () => {
          const goaTabs = getTabs();
          expect(goaTabs[0].getAttribute("open")).toBe("false");
          expect(goaTabs[1].getAttribute("open")).toBe("true");
          expect(goaTabs[2].getAttribute("open")).toBe("false");
        },
        { timeout: 2000 },
      );

      window.location.hash = "#tab-3";
      window.dispatchEvent(new Event("hashchange"));

      await vi.waitFor(
        () => {
          const goaTabs = getTabs();
          expect(goaTabs[0].getAttribute("open")).toBe("false");
          expect(goaTabs[1].getAttribute("open")).toBe("false");
          expect(goaTabs[2].getAttribute("open")).toBe("true");
        },
        { timeout: 2000 },
      );
    });

    it("should handle hash changes with multiple hashes", async () => {
      // GIVEN - Component with tabs and initial multiple hash URL
      window.history.pushState({}, "", "/test#Tab 2#anchorPoint");

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Home">Home content</GoabTab>
            <GoabTab heading="Tab 2">About content</GoabTab>
            <GoabTab heading="Contact">Contact content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByTestId, getByText } = render(<Component />);

      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // THEN - Initially, Tab 2 content should be visible due to hash
      await vi.waitFor(() => {
        expect(getByText("About content")).toBeTruthy();
      });

      // WHEN - Change tab while preserving other hash
      window.location.hash = "#Contact#anchorPoint";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace(
            "#Contact#anchorPoint",
            "#Tab%202#anchorPoint",
          ),
          newURL: window.location.href,
        }),
      );

      // THEN - Contact tab content should now be visible
      await vi.waitFor(() => {
        expect(getByText("Contact content")).toBeTruthy();
      });
    });

    it("should ignore hash changes that don't match any tabs", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="First">First content</GoabTab>
            <GoabTab heading="Second">Second content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByTestId, getByText } = render(<Component />);

      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // THEN - Initially, first tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("First content")).toBeTruthy();
      });

      // WHEN - Change to a hash that doesn't match any tab
      window.location.hash = "#nonexistent";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace("#nonexistent", ""),
          newURL: window.location.href,
        }),
      );

      // THEN - First tab content should still be visible (component ignores invalid hash)
      await vi.waitFor(() => {
        expect(getByText("First content")).toBeTruthy();
      });
    });

    it("should handle browser back/forward navigation with tab changes", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Home">Home content</GoabTab>
            <GoabTab heading="About">About content</GoabTab>
            <GoabTab heading="Contact">Contact content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByTestId, getByText } = render(<Component />);

      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // THEN - Initially, Home tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("Home content")).toBeTruthy();
      });

      // Navigate through different tabs to create history
      window.location.hash = "#About";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace("#About", ""),
          newURL: window.location.href,
        }),
      );

      // THEN - About tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("About content")).toBeTruthy();
      });

      window.location.hash = "#Contact";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace("#Contact", "#About"),
          newURL: window.location.href,
        }),
      );

      // THEN - Contact tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("Contact content")).toBeTruthy();
      });

      // WHEN - Use browser back navigation
      window.history.back();
      await vi.waitFor(() => {
        // THEN - Should return to About tab content being visible
        expect(getByText("About content")).toBeTruthy();
      });

      // WHEN - Use browser forward navigation
      window.history.forward();
      await vi.waitFor(() => {
        // THEN - Should return to Contact tab content being visible
        expect(getByText("Contact content")).toBeTruthy();
      });
    });

    it("should work with URL-encoded tab names", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Tab & More">Content with special chars</GoabTab>
            <GoabTab heading="Tab/Slash">Content with slash</GoabTab>
            <GoabTab heading="Normal">Normal content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByTestId, getByText } = render(<Component />);

      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // THEN - Initially, first tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("Content with special chars")).toBeTruthy();
      });

      // WHEN - Change to tab with slash
      window.location.hash = "#Tab/Slash";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace("#Tab/Slash", ""),
          newURL: window.location.href,
        }),
      );

      // THEN - Tab with slash content should be visible
      await vi.waitFor(() => {
        expect(getByText("Content with slash")).toBeTruthy();
      });

      // WHEN - Change to normal tab
      window.location.hash = "#Normal";
      window.dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: window.location.href.replace("#Normal", "#Tab/Slash"),
          newURL: window.location.href,
        }),
      );

      // THEN - Normal tab content should be visible
      await vi.waitFor(() => {
        expect(getByText("Normal content")).toBeTruthy();
      });
    });
  });

  describe("slug prop", () => {
    it("should use slug prop in tab href attribute", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Overview" slug="overview-tab">
              Overview content
            </GoabTab>
            <GoabTab heading="Details" slug="details-section">
              Details content
            </GoabTab>
            <GoabTab heading="Summary">Summary content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByRole } = render(<Component />);
      const tablist = getByRole("tab");

      await vi.waitFor(() => {
        expect(tablist.elements().length).toBe(3);
      });

      const tabs = tablist.elements();

      // First tab should have custom slug in href
      expect(tabs[0].getAttribute("href")).toContain("#overview-tab");

      // Second tab should have custom slug in href
      expect(tabs[1].getAttribute("href")).toContain("#details-section");

      // Third tab without slug should use default tab-{index} format
      expect(tabs[2].getAttribute("href")).toContain("#summary");
    });

    it("should navigate to correct hash when clicking tab with slug", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="First">First content</GoabTab>
            <GoabTab heading="Second" slug="second-custom">
              Second content
            </GoabTab>
          </GoabTabs>
        );
      };

      const { getByRole } = render(<Component />);
      const tablist = getByRole("tab");

      await vi.waitFor(() => {
        expect(tablist.elements().length).toBe(2);
      });

      const secondTab = tablist.elements()[1];
      await secondTab.click();

      // Hash should be the custom slug
      await vi.waitFor(() => {
        expect(window.location.hash).toBe("#second-custom");
      });
    });

    it("should activate tab when URL hash matches slug", async () => {
      // Set hash before rendering
      window.history.pushState({}, "", "/test#details-tab");

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Home">Home content</GoabTab>
            <GoabTab heading="Details" slug="details-tab">
              Details content
            </GoabTab>
            <GoabTab heading="About">About content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByText, getByRole } = render(<Component />);
      const tablist = getByRole("tab");

      await vi.waitFor(() => {
        expect(tablist.elements().length).toBe(3);
      });

      // The tab with matching slug should be active
      await vi.waitFor(() => {
        const tabs = tablist.elements();
        expect(tabs[1].getAttribute("aria-selected")).toBe("true");
        expect(getByText("Details content")).toBeTruthy();
      });
    });

    it("should use slug prop in href URL hash when provided", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Review pending">
              Review content
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Complete
                  <GoabBadge type="information" content="12" />
                </>
              }
              slug="complete-items"
            >
              Complete content
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Draft
                  <GoabBadge type="midtone" content="3" />
                </>
              }
            >
              Draft content
            </GoabTab>
          </GoabTabs>
        );
      };

      const { getByText, getByRole } = render(<Component />);
      const tablist = getByRole("tab");

      await vi.waitFor(() => {
        expect(tablist.elements().length).toBe(3);
      });

      const tabs = tablist.elements();

      // First tab with component heading should have custom slug in href
      expect(tabs[0].getAttribute("href")).toContain("#review-pending");

      // Second tab with component heading should have custom slug in href
      expect(tabs[1].getAttribute("href")).toContain("#complete-items");

      // Third tab with component heading but no slug should use default tab-{index} format
      expect(tabs[2].getAttribute("href")).toContain("#tab-2");
    });

    it("should navigate correctly when clicking tab with component heading and slug", async () => {
      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="Plain Tab">Plain content</GoabTab>
            <GoabTab
              heading={
                <>
                  Status Tab
                  <GoabBadge type="success" content="New" />
                </>
              }
              slug="status-updates"
            >
              Status content
            </GoabTab>
          </GoabTabs>
        );
      };

      const { getByText, getByRole } = render(<Component />);
      const tabs = getByRole("tab");

      await vi.waitFor(() => {
        expect(tabs.elements().length).toBe(2);
      });

      const secondTab = tabs.elements()[1];
      await secondTab.click();

      // Hash should be the custom slug
      await vi.waitFor(() => {
        expect(window.location.hash).toBe("#status-updates");
      });

      // Content should be visible
      await vi.waitFor(() => {
        expect(getByText("Status content")).toBeTruthy();
      });
    });

    it("should activate tab with component heading when URL hash matches slug", async () => {
      // Set hash before rendering
      window.history.pushState({}, "", "/test#active-tasks");

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="All">All content</GoabTab>
            <GoabTab
              heading={
                <>
                  Active
                  <GoabBadge type="emergency" content="5" />
                </>
              }
              slug="active-tasks"
            >
              Active content
            </GoabTab>
            <GoabTab heading="Archived">Archived content</GoabTab>
          </GoabTabs>
        );
      };


      const { getByText, getByRole } = render(<Component />);
      const tabs = getByRole("tab");

      await vi.waitFor(() => {
        expect(tabs.elements().length).toBe(3);
      });

      // The tab with matching slug should be active
      await vi.waitFor(() => {
        const els = tabs.elements();
        expect(els.length).toBe(3);
        expect(els[1].getAttribute("aria-selected")).toBe("true");
        expect(getByText("Active content")).toBeTruthy();
      });
    });

    /**
     * Previously if you clicked on a tab, then reloaded the page, the tab hash value
     * would be duplicated in the browser's url bar
     */
    it("should ensure that a hash value does not exist in duplicate", async () => {
      // set initial hash in the url
      window.location.hash = "active-tasks";

      const Component = () => {
        return (
          <GoabTabs testId="test-tabs">
            <GoabTab heading="All">All content</GoabTab>
            <GoabTab
              heading={
                <>
                  Active
                  <GoabBadge type="emergency" content="5" />
                </>
              }
              slug="active-tasks"
            >
              Active content
            </GoabTab>
            <GoabTab heading="Archived">Archived content</GoabTab>
          </GoabTabs>
        );
      };

      const { getByText, getByRole } = render(<Component />);
      const tabs = getByRole("tab");

      await vi.waitFor(() => {
        expect(tabs.elements().length).toBe(3);
      });

      // click the current tab
      const tab = tabs.elements()[1];
      await tab.click();

      // The url hash should not change. This logic was needed as without it, it would occasionally
      // pass and the vitest would see that as a fully passing test. The logic below ensure that
      // is passes all the time.
      const hashes = new Set();
      await vi.waitFor(() => {
        hashes.add(window.location.hash);
      }, { timeout: 500 });

      expect(hashes.size).toBe(1);
      expect(hashes.has("#active-tasks")).toBe(true);
    })
  });
});
