import { render, waitFor } from "@testing-library/svelte";
import AppHeaderWrapper from "./AppHeaderWrapper.test.svelte";
import { describe, it } from "vitest";
import { tick } from "svelte";

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

describe.skip("AppHeader with correct highlighted link", () => {
  const heading = "Test heading";
  const url = "http://localhost/foo";

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 1200,
    });

    // Mock window.location
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete window.location;
  });

  it("should set #learnmore to be highlighted when navigating to /foo#learnmore", async () => {
    // Bug 1772
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.location = new URL("http://localhost/foo#learnmore");
    const { container } = render(AppHeaderWrapper, {
      heading,
      url,
      haschildren: true,
    });

    const event = new PopStateEvent("popstate", { state: {} });
    window.dispatchEvent(event);

    const currentLink = container.querySelector("a.current");
    expect(currentLink).toBeTruthy();
    expect(currentLink?.getAttribute("href")).toBe("#aboutus");
  });

  it("should set #seniors under app-header-menu to be highlighted when navigating to /foo#seniors", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.location = new URL("http://localhost/foo#seniors");
    const { container } = render(AppHeaderWrapper, {
      heading,
      url,
      haschildren: true,
    });

    const event = new PopStateEvent("popstate", { state: {} });
    window.dispatchEvent(event);

    await tick();
    await waitFor(() => {
      const currentLink = container.querySelector("a.current");
      expect(currentLink).toBeTruthy();
      expect(currentLink?.getAttribute("href")).toBe("#seniors");
    });
  });
});
