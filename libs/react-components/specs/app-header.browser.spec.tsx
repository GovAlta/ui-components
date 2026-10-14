import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GoabAppHeader, GoabAppHeaderMenu } from "../src";

function AppHeaderFixture() {
  return (
    <GoabAppHeader
      heading="Test heading"
      url="http://localhost/foo"
      testId="app-header"
      navigation={
        <>
          <a href="#learnmore" data-testid="learnmore-link">
            Learn more
          </a>
          <a href="#aboutus" data-testid="aboutus-link">
            About Us
          </a>
          <GoabAppHeaderMenu heading="Apply Now" testId="apply-menu">
            <a href="#seniors" data-testid="seniors-link">
              Seniors
            </a>
            <a href="#family">Family</a>
            <a href="#children">Children</a>
          </GoabAppHeaderMenu>
        </>
      }
    />
  );
}

describe("AppHeader highlighted navigation", () => {
  const originalUrl = window.location.href;

  beforeEach(async () => {
    await page.viewport(1280, 800);
  });

  afterEach(() => {
    window.history.replaceState({}, "", originalUrl);
  });

  it("highlights the matching direct navigation link", async () => {
    window.history.replaceState({}, "", "/foo");
    render(<AppHeaderFixture />);

    const appHeader = page.getByTestId("app-header");
    await vi.waitFor(() => {
      expect(
        appHeader.element().shadowRoot?.querySelector('slot[name="navigation"]'),
      ).not.toBeNull();
    });

    window.history.replaceState({}, "", "/foo#learnmore");
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));

    const learnMore = page.getByTestId("learnmore-link");

    await vi.waitFor(() => {
      expect(learnMore.element().classList.contains("current")).toBe(true);
    });
  });

  it("highlights a matching link nested inside AppHeaderMenu", async () => {
    window.history.replaceState({}, "", "/foo");
    render(<AppHeaderFixture />);

    const appHeader = page.getByTestId("app-header");
    await vi.waitFor(() => {
      expect(
        appHeader.element().shadowRoot?.querySelector('slot[name="navigation"]'),
      ).not.toBeNull();
    });

    window.history.replaceState({}, "", "/foo#seniors");
    window.dispatchEvent(new PopStateEvent("popstate", { state: {} }));

    const seniors = page.getByTestId("seniors-link");

    await vi.waitFor(() => {
      expect(seniors.element().classList.contains("current")).toBe(true);
    });
  });
});
