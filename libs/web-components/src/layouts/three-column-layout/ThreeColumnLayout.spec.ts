import { render } from '@testing-library/svelte';
import GoAThreeColumnLayout from './ThreeColumnLayoutWrapper.test.svelte';
import { it, describe } from "vitest";

describe("ThreeColumnLayout", () => {
  it("should render", async () => {
    const baseElement = render(GoAThreeColumnLayout);
    const el = baseElement.container;
    const header = el.querySelector("[slot=header]");
    const footer = el.querySelector("[slot=footer]");
    const nav = el.querySelector("[slot=nav]");
    const sidebar = el.querySelector("[slot=sidebar]");
    const sideMenu = el.querySelector("[slot=side-menu]");
    const layout = el.querySelector("goa-three-column-layout");


    expect(el).toBeTruthy();
    expect(el.innerHTML).toContain("Main content.");
    expect(layout).toBeTruthy();
    expect(layout.getAttribute("leftcolumnwidth")).toBe("200px");
    expect(layout.getAttribute("maxcontentwidth")).toBe("50%");
    expect(layout.getAttribute("rightcolumnwidth")).toBe("300px");
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(nav).toBeTruthy();
    expect(nav.querySelectorAll("a").length).toBe(5);
    expect(sidebar).toBeTruthy();
    expect(sidebar.querySelector("h2").innerHTML).toContain("Sidebar");
    expect(sidebar.querySelector("p").innerHTML).toContain("Sidebar content.");
    expect(sideMenu).toBeTruthy();
    expect(sideMenu.querySelector("h2").innerHTML).toContain("SideMenu");
    expect(sideMenu.querySelector("p").innerHTML).toContain("Side menu content.");
  })
})
