import { it, expect } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import WorkSideMenuWrapper from "./WorkSideMenuWrapper.test.svelte";

describe("WorkSideMenu", () => {
  const menuOptions = {
    title: "Test menu",
    url: "https://localhost/",
    username: "Test User",
    useremail: "test@example.com",
    testid: "work-side-menu",
  };

  it("renders", async () => {
    const el = render(WorkSideMenuWrapper, menuOptions);
    expect(el).toBeTruthy();

    const menu = await el.findByTestId("work-side-menu");
    expect(menu).toBeTruthy();
  });

  it("toggles the menu when clicking the toggle button", async () => {
    const el = render(WorkSideMenuWrapper, menuOptions);
    expect(el).toBeTruthy();

    const menu = await el.findByTestId("work-side-menu");
    expect(menu).toBeTruthy();

    const toggleButton = await el.findByTestId("work-side-menu-toggle-button");
    expect(toggleButton).toBeTruthy();

    // initial state
    expect(menu.classList.contains("closed")).toBeFalsy();

    // close
    await fireEvent.click(toggleButton);
    expect(menu.classList.contains("closed")).toBeTruthy();

    // open
    await fireEvent.click(toggleButton);
    expect(menu.classList.contains("closed")).toBeFalsy();
  });

  describe("Mobile", () => {
    beforeEach(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        value: 480,
      });
    });

    it("renders", async () => {
      const el = render(WorkSideMenuWrapper, menuOptions);
      expect(el).toBeTruthy();

      const menu = await el.findByTestId("work-side-menu");
      expect(menu).toBeTruthy();
      expect(menu.classList.contains("mobile")).toBeTruthy();
    });

    it("closes when clicking the background", async () => {
      const el = render(WorkSideMenuWrapper, menuOptions);
      expect(el).toBeTruthy();

      const menu = await el.findByTestId("work-side-menu");
      expect(menu).toBeTruthy();

      const background = await el.findByTestId("work-side-menu-background");
      expect(background).toBeTruthy();

      // initial state
      expect(menu.classList.contains("closed")).toBeFalsy();

      // close
      await fireEvent.click(background);
      expect(menu.classList.contains("closed")).toBeTruthy();
    });

    it("toggles menu when firing a toggle event", async () => {
      const el = render(WorkSideMenuWrapper, menuOptions);
      expect(el).toBeTruthy();

      const menu = await el.findByTestId("work-side-menu");
      expect(menu).toBeTruthy();

      // initial state
      expect(menu.classList.contains("closed")).toBeFalsy();

      // close
      menu.dispatchEvent(new CustomEvent("work-side-menu:toggle"));
      await waitFor(
        () => expect(menu.classList.contains("closed")).toBeTruthy(),
        { timeout: 1 },
      );

      // open
      menu.dispatchEvent(new CustomEvent("work-side-menu:toggle"));
      await waitFor(
        () => expect(menu.classList.contains("closed")).toBeFalsy(),
        { timeout: 1 },
      );
    });
  });
});
