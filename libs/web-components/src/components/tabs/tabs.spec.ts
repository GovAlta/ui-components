import Tabs from "./TabsWrapper.test.svelte";
import { render, waitFor } from "@testing-library/svelte";
import { it, describe } from "vitest";

describe("Tabs", () => {
  it("should render", async () => {
    const { container } = render(Tabs);

    const panel = container.querySelector('div.tabpanel');
    const tabs = container.querySelectorAll("goa-tab");

    await waitFor(() => {
      expect(container.querySelector('div[role="tablist"]')).toBeTruthy();

      expect(panel).toBeTruthy();
      expect(panel?.getAttribute("tabindex")).toBe("0");

      expect(tabs.length).toBe(2);
    })
  });

  it("should initialize the children and tab 1 as active", async () => {
    const { container, queryByTestId } = render(Tabs);

    const tab1Button = queryByTestId("tab-1");
    const tab = tab1Button?.querySelector("div.tab");
    const tab2Button = container.querySelector("button#tab-2");
    const tab2 = tab2Button?.querySelector("div.tab");
    const tabPanel = container.querySelector('div[role="tabpanel"]');
    const tab3 = tabPanel?.querySelector("goa-tab");

    await waitFor(() => {
      expect(tab1Button).toBeTruthy();
      expect(tab1Button?.getAttribute("aria-controls")).toBe("tabpanel-1");
      expect(tab1Button?.getAttribute("aria-selected")).toBe("true");
      expect(tab1Button?.getAttribute("role")).toBe("tab");

      expect(tab).toBeTruthy();
      expect(tab?.innerHTML).toContain("Tab1");

      // Should add button tab-2
      expect(tab2Button).toBeTruthy();
      expect(tab2Button?.getAttribute("aria-controls")).toBe("tabpanel-2");
      expect(tab2Button?.getAttribute("aria-selected")).toBe("false");
      expect(tab2Button?.getAttribute("role")).toBe("tab");

      expect(tab2).toBeTruthy();
      expect(tab2?.innerHTML).toContain("Tab2");
      expect(tab2Button?.getAttribute("tabIndex")).toBe("-1");

      // should replace content to the tabpanel for opening tab
      expect(tabPanel).toBeTruthy();

      expect(tab3).toBeTruthy();
      expect(tab3?.getAttribute("heading")).toBe("Tab1");
      expect(tabPanel?.getAttribute("aria-labelledby")).toBe("tab-1");
      expect(tabPanel?.getAttribute("tabindex")).toBe("0");
    });
  });

  it("should select specified tab if the tab property is set", async () => {
    const result = render(Tabs, { initialtab: 2 });
    const tab1Button = result.container.querySelector("button#tab-1");
    const tab2Button = result.container.querySelector("button#tab-2");
    const tabPanel = result.container.querySelector("div[role=tabpanel]");
    const goaTabs = result.container.querySelectorAll("goa-tab");

    await waitFor(() => {
      expect(tab1Button).toBeTruthy();
      expect(tab1Button?.getAttribute("aria-selected")).toBe("false");

      expect(tab2Button).toBeTruthy();
      expect(tab2Button?.getAttribute("aria-selected")).toBe("true");

      expect(tabPanel).toBeTruthy();
      expect(tabPanel?.getAttribute("id")).toBe("tabpanel-2");

      expect(goaTabs[0].getAttribute("open")).toBe("false");
      expect(goaTabs[1].getAttribute("open")).toBe("true");
    });
  });

  it("should select the last tab if the tab exceeds the number of tabs", async () => {
    const result = render(Tabs, { initialtab: 3 });

    // last tab
    await waitFor(() => {
      const tab = result.container.querySelector("button#tab-2");
      expect(tab).toBeTruthy();
      expect(tab?.getAttribute("aria-selected")).toBe("true");
    });
  });

  it("should select the first tab if the tab is less than 1", async () => {
    const result = render(Tabs, { initialtab: 0 });

    // first tab
    await waitFor(() => {
      const tab1Button = result.container.querySelector("button#tab-1");
      expect(tab1Button).toBeTruthy();
      expect(tab1Button?.getAttribute("aria-selected")).toBe("true");
    });
  });
});
