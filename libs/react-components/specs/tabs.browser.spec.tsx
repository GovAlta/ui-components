import { render } from "vitest-browser-react";
import { GoabTabs, GoabTab } from "../src";
import { expect, describe, it, vi } from "vitest";

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
        expect(window.location.search).toBe("?param=value");
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

      const { getByTestId } = render(<Component />);

      // Wait for component to be fully rendered
      await vi.waitFor(() => {
        expect(getByTestId("test-tabs")).toBeTruthy();
      });

      // Click on Tab 2
      const tab2 = getByTestId("tab-2");
      await tab2.click();

      // Verify we're on tab 2
      expect(window.location.pathname).toBe(tabsPage);
      expect(window.location.hash).toBe("#tab-1");

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
      let goaTabs = getTabs();
      expect(goaTabs.length).toBe(3);

      // WHEN - Change hash to #tab-1 (should activate "Tab 2" - second tab, zero-indexed)
      window.location.hash = "#tab-1";
      window.dispatchEvent(new Event("hashchange"));

      // THEN - Tab 2 should be open (index 1)
      await vi.waitFor(
        () => {
          goaTabs = getTabs();
          expect(goaTabs[1].getAttribute("open")).toBe("true");
          expect(goaTabs[0].getAttribute("open")).toBe("false");
          expect(goaTabs[2].getAttribute("open")).toBe("false");
        },
        { timeout: 2000 },
      );

      // WHEN - Change hash to #tab-2 (should activate "Tab 3" - third tab, zero-indexed)
      window.location.hash = "#tab-2";
      window.dispatchEvent(new Event("hashchange"));

      // THEN - Tab 3 should be open (index 2)
      await vi.waitFor(
        () => {
          goaTabs = getTabs();
          expect(goaTabs[2].getAttribute("open")).toBe("true"); // "Tab 3" at index 2
          expect(goaTabs[0].getAttribute("open")).toBe("false");
          expect(goaTabs[1].getAttribute("open")).toBe("false");
        },
        { timeout: 2000 },
      );

      // WHEN - Change hash to #tab-0 (should activate "Tab 1" - first tab, zero-indexed)
      window.location.hash = "#tab-0";
      window.dispatchEvent(new Event("hashchange"));

      // THEN - Tab 1 should be open (index 0)
      await vi.waitFor(
        () => {
          goaTabs = getTabs();
          expect(goaTabs[0].getAttribute("open")).toBe("true"); // "Tab 1" at index 0
          expect(goaTabs[1].getAttribute("open")).toBe("false");
          expect(goaTabs[2].getAttribute("open")).toBe("false");
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
});
