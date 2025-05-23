import Tabs from "./TabsWrapper.test.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { it, describe } from "vitest";

describe("Tabs", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    if (window.location.hash) {
      window.location.hash = "";
    }
  });
  afterEach(() => {
    window.history.pushState({}, "", "/");
    vi.clearAllMocks();
  });

  it("should render", async () => {
    const { container } = render(Tabs);

    const panel = container.querySelector("div.tabpanel");
    const tabs = container.querySelectorAll("goa-tab");

    await waitFor(() => {
      expect(container.querySelector('div[role="tablist"]')).toBeTruthy();

      expect(panel).toBeTruthy();
      expect(panel?.getAttribute("tabindex")).toBe("0");

      expect(tabs.length).toBe(2);
    });
  });

  it("should initialize the children and tab 1 as active", async () => {
    const { container, queryByTestId } = render(Tabs);

    await waitFor(() => {
      const tab1Link = queryByTestId("tab-1");
      const tab = tab1Link?.querySelector("div.tab");
      const tab2Link = container.querySelector("a#tab-2");
      const tab2 = tab2Link?.querySelector("div.tab");
      const tabPanel = container.querySelector('div[role="tabpanel"]');

      expect(tab1Link).toBeTruthy();
      expect(tab1Link?.getAttribute("aria-controls")).toBe("tabpanel-1");
      expect(tab1Link?.getAttribute("aria-selected")).toBe("true");
      expect(tab1Link?.getAttribute("role")).toBe("tab");

      expect(tab).toBeTruthy();
      expect(tab?.innerHTML).toContain("Tab1");

      // Should add button tab-2
      expect(tab2Link).toBeTruthy();
      expect(tab2Link?.getAttribute("aria-controls")).toBe("tabpanel-2");
      expect(tab2Link?.getAttribute("aria-selected")).toBe("false");
      expect(tab2Link?.getAttribute("role")).toBe("tab");

      expect(tab2).toBeTruthy();
      expect(tab2?.innerHTML).toContain("Tab2");
      expect(tab2Link?.getAttribute("tabIndex")).toBe("-1");

      // should replace content to the tabpanel for opening tab
      expect(tabPanel).toBeTruthy();
    });
  });

  it("should select the first tab if the tab is less than 1", async () => {
    const result = render(Tabs, { initialtab: 0 });

    // first tab
    await waitFor(() => {
      const tab1Link = result.container.querySelector("a#tab-1");
      expect(tab1Link).toBeTruthy();
      expect(tab1Link?.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("should dispatch _change event when tab changes", async () => {
    const { container } = render(Tabs);

    await waitFor(() => {
      const tab1Link = container.querySelector("a#tab-1");
      const tab2Link = container.querySelector("a#tab-2");
      expect(tab1Link).toBeTruthy();
      expect(tab2Link).toBeTruthy();
    });

    const tabsComponent = container.querySelector('div[role="tablist"]');
    expect(tabsComponent).toBeTruthy();

    const onChangeSpy = vi.fn();
    tabsComponent?.addEventListener("_change", onChangeSpy);

    const tab2Link = container.querySelector("a#tab-2") as HTMLElement;
    await fireEvent.click(tab2Link);

    await waitFor(() => {
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(tab2Link.getAttribute("aria-selected")).toBe("true");
      const tabPanel = container.querySelector("div[role=tabpanel]");
      expect(tabPanel?.getAttribute("id")).toBe("tabpanel-2");

      const goaTabs = tabPanel?.querySelectorAll("goa-tab");
      expect(goaTabs?.length).toBe(2);
      expect(goaTabs?.[0].getAttribute("open")).toBe("false");
      expect(goaTabs?.[1].getAttribute("open")).toBe("true");
    });
  });

  it("should select the last tab if the tab exceeds the number of tabs", async () => {
    const result = render(Tabs, { initialtab: 3 });

    // last tab
    await waitFor(() => {
      const tab = result.container.querySelector("a#tab-2");
      expect(tab).toBeTruthy();
      expect(tab?.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("should select specified tab if the tab property is set", async () => {
    const result = render(Tabs, { initialtab: 2 });

    await waitFor(() => {
      const tab1Link = result.container.querySelector("a#tab-1");
      const tab2Link = result.container.querySelector("a#tab-2");
      const tabPanel = result.container.querySelector("div[role=tabpanel]");
      const goaTabs = result.container.querySelectorAll("goa-tab");

      expect(tab1Link).toBeTruthy();
      expect(tab1Link?.getAttribute("aria-selected")).toBe("false");

      expect(tab2Link).toBeTruthy();
      expect(tab2Link?.getAttribute("aria-selected")).toBe("true");

      expect(tabPanel).toBeTruthy();
      expect(tabPanel?.getAttribute("id")).toBe("tabpanel-2");

      expect(goaTabs[0].getAttribute("open")).toBe("false");
      expect(goaTabs[1].getAttribute("open")).toBe("true");
    });
  });

  it("should not set any tab when initialtab is -1 and no hash exists", async () => {
    const { container } = render(Tabs, { initialtab: -1 });

    await waitFor(() => {
      const tabs = container.querySelectorAll('[role="tab"]');
      expect(tabs.length).toBeGreaterThan(0);

      // Check that no tab is selected
      tabs.forEach(tab => {
        expect(tab.getAttribute("aria-selected")).toBe(null); // Nothing should be pre-selected
      });
    });
  });

  it("should handle multiple hash fragments in URL", async () => {
    // Mock window.location
    const originalLocation = window.location;
    const mockLocation = new URL("http://localhost/test#tab-1#anchorPoint");
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    });

    const { container } = render(Tabs);

    await waitFor(() => {
      const tab2 = container.querySelector('[data-testid="tab-2"]');
      expect(tab2?.getAttribute("aria-selected")).toBe("true");
    });

    // Restore original location
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true
    });
  });

  it("should scroll to anchor element when present", async () => {
    // Create an anchor element
    const anchorElement = document.createElement('div');
    anchorElement.id = 'anchorPoint';
    document.body.appendChild(anchorElement);

    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn();
    anchorElement.scrollIntoView = scrollIntoViewMock;

    // Mock window.location with hash
    const originalLocation = window.location;
    const mockLocation = new URL("http://localhost/test#anchorPoint");
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true
    });

    const { container } = render(Tabs);

    // Wait for component to be mounted and processed
    await waitFor(() => {
      expect(container.querySelector('[role="tablist"]')).toBeTruthy();
    });

    // Give time for the anchor scroll to be triggered
    await new Promise(resolve => setTimeout(resolve, 0));

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    }, { timeout: 2000 });

    // Cleanup
    document.body.removeChild(anchorElement);
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true
    });
  });
});
