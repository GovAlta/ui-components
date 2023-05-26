import {render} from "@testing-library/svelte";
import SidebarWrapper from './SidebarWrapper.test.svelte';

describe("Sidebar", () => {
  it("should render", async() => {
    // GIVEN
    const navItems = [
      {
        displayname: "test1",
        url: "test1",
        name: "test1",
        active: true
      },
      {
        displayname: "test2",
        url: "test2",
        name: "test2",
        active: false
      }
    ];
    const level = 1; // to make it skip getChildren()
    // WHEN
    const result = render(SidebarWrapper, {navItems, level});
    // THEN
    const ul = result.getByRole("menu");
    expect(ul.getAttribute("aria-label")).toBe("Side Menu");
    const goaLeftNavItemsDom = result.container.querySelectorAll("goax-sidebar-item");
    expect(goaLeftNavItemsDom.length).toBe(navItems.length);

    const liItems = result.container.querySelectorAll("li");
    expect(liItems.length).toBe(navItems.length);

    const liItem1 = liItems[0];
    expect(liItem1.getAttribute("aria-label")).toBe(navItems[0].displayname);
    expect(liItem1.getAttribute("aria-selected")).toBe("true");
    expect(liItem1.getAttribute("role")).toBe("menuitem");
    const liItemLabel1 = liItem1.querySelector("span.label");
    expect(liItemLabel1.innerHTML).toBe(navItems[0].displayname);
    const liItem2 = liItems[1];
    expect(liItem2.getAttribute("aria-label")).toBe(navItems[1].displayname);
    expect(liItem2.getAttribute("aria-selected")).toBe("false");
    expect(liItem2.getAttribute("role")).toBe("menuitem");
    const liItemLabel2 = liItem2.querySelector("span.label");
    expect(liItemLabel2.innerHTML).toBe(navItems[1].displayname);
  });
});
