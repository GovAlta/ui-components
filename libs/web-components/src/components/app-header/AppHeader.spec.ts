import { render } from "@testing-library/svelte";
import AppHeaderWrapper from "./AppHeaderWrapper.test.svelte";
import { describe, it } from "vitest";

describe("AppHeader", () => {
  const heading = "Test heading";
  const url = "http://localhost/foo";

  it("should render the permanent layout", () => {
    const { container, queryByTestId } = render(AppHeaderWrapper, {
      heading,
      url,
    });

    const links = container.querySelectorAll("a");
    const serviceName = container.querySelector(".service-name");
    const structure = container.querySelector(".structure");

    expect(serviceName?.textContent).toBe(heading);
    expect((queryByTestId("logo-link") as HTMLLinkElement)?.href).toBe(url);
    expect(structure).toBeTruthy();
    expect(links.length).toBe(1);
  });

  it("should use the permanent layout on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 400,
    });

    const { container } = render(AppHeaderWrapper, {
      heading,
      url,
    });

    expect(container.querySelector(".container.mobile")).toBeTruthy();
    expect(container.querySelector("[data-testid='menu-toggle']")).toBeNull();
  });
});
