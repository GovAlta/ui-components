import { it, expect } from "vitest";
import { render, waitFor } from "@testing-library/svelte";
import SideMenuWrapper from "./SideMenuWrapper.test.svelte";

describe("SideMenu should render with children and set highlighted menu item correctly", () => {
  const originalUrl = window.location.href;

  afterEach(() => {
    window.history.replaceState({}, "", originalUrl);
  });

  it("should render", async () => {
    window.history.replaceState({}, "", "/get-started");
    const { container } = render(SideMenuWrapper);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(4);
    await waitFor(() => {
      expect(container.querySelector("a.current")?.getAttribute("href")).toBe(
        "get-started",
      );
    });
  });
});

describe("SideMenu", () => {
  const originalUrl = window.location.href;

  afterEach(() => {
    window.history.replaceState({}, "", originalUrl);
  });

  it("should set active link correctly", async () => {
    window.history.replaceState({}, "", "/get-started/designers");

    const { container } = render(SideMenuWrapper);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(4);
    await waitFor(() => {
      expect(container.querySelector("a.current")?.getAttribute("href")).toBe(
        "get-started/designers",
      );
    });
  });
});
