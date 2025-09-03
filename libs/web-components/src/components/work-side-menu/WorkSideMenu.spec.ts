import { it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import GoaWorkSideMenu from "./WorkSideMenu.svelte";

describe("WorkSideMenu", () => {
  const menuOptions = {
    heading: "Test menu",
    url: "https://localhost/",
    userName: "Test User",
    userSecondaryText: "test@example.com",
    testid: "work-side-menu",
  };

  it("renders", async () => {
    const { container } = render(GoaWorkSideMenu, menuOptions);

    expect(container).toBeTruthy();
  });
});
