import { it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import SideMenuWrapper from "./SideMenuWrapper.test.svelte";
import { tick } from "svelte";

describe.skip("SideMenu should render with children and set highlighted menu item correctly", () => {
  it("should render", async () => {
    // Mock window.location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.location = new URL("http://localhost/get-started");
    const { container } = render(SideMenuWrapper);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(4);
    const currentLink = container.querySelector("a.current");
    expect(currentLink).toBeTruthy();
    expect(currentLink?.getAttribute("href")).toBe("get-started");
  });
});

describe("SideMenu", () => {
  let originalLocation: Location;

  it("should set active link correctly", async () => {
    originalLocation = window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any
    window.location = new URL("http://localhost/get-started/designers") as any;

    const { container } = render(SideMenuWrapper);
    await tick();

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(4);
    const currentLink = container.querySelector("a.current");

    expect(currentLink).toBeTruthy();
    expect(currentLink?.getAttribute("href")).not.toBe("get-started");
    expect(currentLink?.getAttribute("href")).toBe("get-started/designers");

    window.location = originalLocation;
  });
});
