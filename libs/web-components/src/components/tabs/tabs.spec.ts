import Tabs from "./TabsWrapper.test.svelte";
import {render} from "@testing-library/svelte";
import {tick} from "svelte";
describe("Tabs", () => {
  it("should render", async() => {
    const result = render(Tabs);
    const tabs = result.container.querySelectorAll("goa-tab");
    expect(tabs.length).toBe(2);
    expect(result.container.querySelector('div[role="tablist"]')).not.toBeNull();
    expect(result.container.querySelector('div[role="tabpanel"]').getAttribute('tabindex')).toBe('0');
  });
  it("should set childindex on the children", async() => {
    const result = render(Tabs);
    const tabs = result.container.querySelectorAll("goa-tab");
    await tick();
    tabs.forEach((tab, index) => {
      expect(tab.getAttribute("childindex")).toBe(`${index}`);
    });
    // should replace content to the tabpanel for opening tab
    expect(result.container.querySelector('div[role="tabpanel"]').innerHTML).toContain("Tab 1 content");
  })
})
