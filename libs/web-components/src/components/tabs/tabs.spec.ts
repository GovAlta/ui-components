import Tabs from "./TabsWrapper.test.svelte";
import {render} from "@testing-library/svelte";
import {tick} from "svelte";

describe("Tabs", () => {
  it("should render", async () => {
    const result = render(Tabs);
    expect(result.container.querySelector('div[role="tablist"]')).toBeTruthy();
    expect(result.container.querySelector('div.tabpanel').getAttribute("tabindex")).toBe("0");
    const tabs = result.container.querySelectorAll("goa-tab");
    expect(tabs.length).toBe(2);
  });
  it("should initialize the children and tab 1 as active", async () => {
    const result = render(Tabs);
    await tick();
    // Should add button tab-1
    const tab1Button = result.container.querySelector("button#tab-1");
    expect(tab1Button).toBeTruthy();
    expect(tab1Button.getAttribute("aria-controls")).toBe("tabpanel-1");
    expect(tab1Button.getAttribute("aria-selected")).toBe("true");
    expect(tab1Button.getAttribute("role")).toBe("tab");
    expect(tab1Button.querySelector("div.tab").innerHTML).toContain("Tab1");
    // Should add button tab-2
    const tab2Button = result.container.querySelector("button#tab-2");
    expect(tab2Button).toBeTruthy();
    expect(tab2Button.getAttribute("aria-controls")).toBe("tabpanel-2");
    expect(tab2Button.getAttribute("aria-selected")).toBe("false");
    expect(tab2Button.getAttribute("role")).toBe("tab");
    expect(tab2Button.querySelector("div.tab").innerHTML).toContain("Tab2");
    expect(tab2Button.getAttribute("tabIndex")).toBe("-1");

    // should replace content to the tabpanel for opening tab
    const tabPanel = result.container.querySelector('div[role="tabpanel"]');
    expect(tabPanel.querySelector("goa-tab").getAttribute("heading")).toBe("Tab1");
    expect(tabPanel.getAttribute("aria-labelledby")).toBe("tab-1");
    expect(tabPanel.getAttribute("tabindex")).toBe("0");
  });
  it('should select specified tab if the "tab" property is set', async () => {
    const result = render(Tabs, {initialtab: 2});
    await tick()
    const tab1Button = result.container.querySelector("button#tab-1");
    expect(tab1Button.getAttribute("aria-selected")).toBe("false");
    const tab2Button = result.container.querySelector("button#tab-2");
    expect(tab2Button.getAttribute("aria-selected")).toBe("true");
    const tabPanel = result.container.querySelector('div[role="tabpanel"]');
    expect(tabPanel.getAttribute("id")).toBe("tabpanel-2");
    const goaTabs = result.container.querySelectorAll("goa-tab");
    expect(goaTabs[0].getAttribute("open")).toBe("false");
    expect(goaTabs[1].getAttribute("open")).toBe("true");
  });
  it("should select the last tab if 'tab' is more than maximum number of tabs", async () => {
    const result = render(Tabs, {initialtab: 3});
    await tick()
    // Set to maximum tabs length
    const tab2Button = result.container.querySelector("button#tab-2");
    expect(tab2Button.getAttribute("aria-selected")).toBe("true");
  });
  it('should select the first tab if "tab" is less than 1', async () => {
    const result = render(Tabs, {initialtab: 0});
    await tick()
    // Set to first tab
    const tab1Button = result.container.querySelector("button#tab-1");
    expect(tab1Button.getAttribute("aria-selected")).toBe("true");
  });
});
