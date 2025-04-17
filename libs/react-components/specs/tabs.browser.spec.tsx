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
      searchParams.set('param', 'value');
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
      await vi.waitFor(() => {
        expect(window.location.pathname, 'Should return to initial page').toBe(initialPage);
        expect(window.location.hash, 'Should have no hash').toBe('');
      }, {
        timeout: 1000
      });
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
              <h2 id="toc-3" data-testid="anchor-target">Page Content Section</h2>
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
      expect(window.location.href).toEqual(expect.stringContaining(`${window.location.origin}/docs/page#${anchorTarget}`));
    });
  });
});
