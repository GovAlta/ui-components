import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GoabAppHeader, GoabAppHeaderMenu, GoabBadge } from "../src";

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

function HeaderLayoutFixture({ utilities = 0, phase = false, secondary = false }) {
  return (
    <div data-testid="header-layout" style={{ width: "100vw" }}>
      <GoabAppHeader
        heading="My benefits"
        secondaryText={secondary ? "Manage your benefits" : undefined}
        phase={phase ? <GoabBadge type="information" content="Beta" /> : undefined}
        utilities={
          <>
            {/* Together with the utility gap, Messages and a name occupy 321px. */}
            {utilities > 0 && (
              <a href="#messages" style={{ width: "9rem" }}>
                Messages
              </a>
            )}
            {utilities > 1 && (
              <a href="#account" style={{ width: "10.3125rem" }}>
                Jordan Smith
              </a>
            )}
          </>
        }
      />
    </div>
  );
}

describe("AppHeader service name layout (#4364)", () => {
  let originalMargin: string;

  beforeEach(async () => {
    originalMargin = document.body.style.margin;
    document.body.style.margin = "0";
    await page.viewport(1280, 800);
    await document.fonts.ready;
  });

  afterEach(() => {
    document.body.style.margin = originalMargin;
    vi.restoreAllMocks();
  });

  async function getLayout() {
    const fixture = page.getByTestId("header-layout");
    const host = fixture.element().querySelector<HTMLElement>("goa-app-header")!;
    const serviceName = page.getByText("My benefits", { exact: true });
    await expect.element(serviceName).toBeVisible();
    const root = host.shadowRoot!;
    const header = root.querySelector<HTMLElement>(".header-placeholder")!;
    const service = root.querySelector<HTMLElement>(".service-phase-wrapper")!;
    const name = root.querySelector<HTMLElement>(".service-name")!;
    const items = root.querySelector<HTMLElement>(".utilities-items")!;
    const logo = root.querySelector<HTMLElement>(".logo-area")!;
    await vi.waitFor(() => {
      const style = getComputedStyle(header);
      const values = {
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        columnGap: style.columnGap,
        serviceMinWidth: getComputedStyle(service).minWidth,
      };
      for (const [property, value] of Object.entries(values)) {
        expect(
          Number.isFinite(parseFloat(value)),
          `Expected numeric header ${property}, received "${value}"`,
        ).toBe(true);
      }
    });
    await document.fonts.ready;
    return { host, root, header, service, name, items, logo };
  }

  function centre(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return rect.left + rect.width / 2;
  }

  for (const utilities of [0, 2]) {
    it(`centres the name within one pixel of the page with ${utilities} utilities and no phase`, async () => {
      render(<HeaderLayoutFixture utilities={utilities} />);
      const { root, name } = await getLayout();

      await vi.waitFor(() => {
        expect(Math.abs(centre(name) - window.innerWidth / 2)).toBeLessThanOrEqual(1);
      });
      expect(root.querySelector(".utilities-menu-button")).toBeNull();
    });
  }

  it("centres the service and phase together and keeps secondary text below the name", async () => {
    render(<HeaderLayoutFixture utilities={2} phase secondary />);
    const { root, service, name } = await getLayout();
    const phase = root.querySelector<HTMLElement>(".phase-placeholder")!;
    const secondary = root.querySelector<HTMLElement>(".secondary-text")!;

    await vi.waitFor(() => {
      expect(phase.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(Math.abs(centre(service) - window.innerWidth / 2)).toBeLessThanOrEqual(1);
      expect(phase.getBoundingClientRect().left).toBeGreaterThan(
        name.getBoundingClientRect().right,
      );
      expect(secondary.getBoundingClientRect().top).toBeGreaterThanOrEqual(
        name.getBoundingClientRect().bottom,
      );
    });
  });

  it("gives way by only the necessary distance when utilities are wide, keeping them visible", async () => {
    render(<HeaderLayoutFixture utilities={2} />);
    const { root, header, service, name, items } = await getLayout();
    const measurement = vi.spyOn(items, "getBoundingClientRect");
    await page.viewport(900, 800);

    await vi.waitFor(() => expect(measurement).toHaveBeenCalled());
    const row = header.getBoundingClientRect();
    const style = getComputedStyle(header);
    const gap = parseFloat(style.columnGap);
    const rightEdge = row.right - parseFloat(style.paddingRight);
    const serviceRect = service.getBoundingClientRect();
    const itemsRect = items.getBoundingClientRect();
    expect(root.querySelector(".utilities-menu-button")).toBeNull();
    expect(centre(name)).toBeLessThan(window.innerWidth / 2 - 1);
    expect(Math.abs(itemsRect.right - rightEdge)).toBeLessThanOrEqual(1);
    expect(Math.abs(serviceRect.right + gap - itemsRect.left)).toBeLessThanOrEqual(1);
    expect(serviceRect.width).toBeGreaterThanOrEqual(
      parseFloat(getComputedStyle(service).minWidth),
    );
  });

  it.each([false, true])(
    "folds only when the measured row no longer fits and stays folded on resize (custom tokens: %s)",
    async (customTokens) => {
      render(<HeaderLayoutFixture utilities={2} />);
      const { host, root, header, service, items, logo } = await getLayout();
      if (customTokens) {
        host.style.setProperty("--goa-app-header-logo-service-gap", "3.5rem");
        host.style.setProperty("--goa-app-header-min-width-service-name", "14rem");
        host.style.setProperty("--goa-app-header-padding-h-desktop", "3.25rem");
        host.style.setProperty("--goa-app-header-utilities-gap", "1rem");
      }
      const style = getComputedStyle(header);
      const logoWidth = Array.from(logo.children).reduce(
        (sum, child) => sum + child.getBoundingClientRect().width,
        0,
      );
      const fitsAt = Math.ceil(
        logoWidth +
          parseFloat(getComputedStyle(service).minWidth) +
          items.getBoundingClientRect().width +
          2 * parseFloat(style.columnGap) +
          parseFloat(style.paddingLeft) +
          parseFloat(style.paddingRight),
      );
      expect(
        Number.isFinite(fitsAt),
        `Expected a finite fold width, received ${fitsAt}`,
      ).toBe(true);
      const measurement = vi.spyOn(items, "getBoundingClientRect");

      async function resizeAndMeasure(width: number) {
        measurement.mockClear();
        await page.viewport(width, 800);
        await vi.waitFor(() => expect(measurement).toHaveBeenCalled());
      }

      await resizeAndMeasure(fitsAt);
      expect(root.querySelector(".utilities-menu-button")).toBeNull();
      expect(items.getBoundingClientRect().right).toBeLessThanOrEqual(
        header.getBoundingClientRect().right - parseFloat(style.paddingRight) + 1,
      );

      await resizeAndMeasure(fitsAt - 1);
      const menu = page.getByRole("button", { name: "Utilities menu" });
      await expect.element(menu).toHaveAttribute("aria-expanded", "false");
      await expect.element(page.getByText("Messages", { exact: true })).not.toBeVisible();

      await resizeAndMeasure(fitsAt - 2);
      await expect.element(menu).toHaveAttribute("aria-expanded", "false");

      await menu.click();
      await expect.element(page.getByText("Messages", { exact: true })).toBeVisible();
      await resizeAndMeasure(fitsAt - 3);
      await expect.element(menu).toHaveAttribute("aria-expanded", "true");

      await resizeAndMeasure(1280);
      expect(root.querySelector(".utilities-menu-button")).toBeNull();
      await expect.element(page.getByText("Messages", { exact: true })).toBeVisible();
    },
  );

  it("rechecks when row spacing or link widths change without a window resize", async () => {
    await page.viewport(900, 800);
    render(<HeaderLayoutFixture utilities={2} />);
    const { host } = await getLayout();
    const menu = page.getByRole("button", { name: "Utilities menu" });
    const messages = host.querySelector<HTMLElement>('[slot="utilities"]')!;

    host.style.setProperty("--goa-app-header-padding-h-desktop", "8rem");
    await expect.element(menu).toHaveAttribute("aria-expanded", "false");
    host.style.removeProperty("--goa-app-header-padding-h-desktop");
    await expect.element(menu).not.toBeInTheDocument();

    messages.style.width = "24rem";
    await expect.element(menu).toHaveAttribute("aria-expanded", "false");
    messages.style.width = "9rem";
    await expect.element(menu).not.toBeInTheDocument();
  });

  for (const utilities of [0, 1, 2]) {
    it(`keeps the mobile name left aligned and uses Menu only for two or more utilities (${utilities})`, async () => {
      await page.viewport(400, 800);
      render(<HeaderLayoutFixture utilities={utilities} phase secondary />);
      const { root, name } = await getLayout();
      const phase = root.querySelector<HTMLElement>(".phase-placeholder")!;
      const secondary = root.querySelector<HTMLElement>(".secondary-text")!;
      const menu = page.getByRole("button", { name: "Utilities menu" });

      await vi.waitFor(() => {
        expect(getComputedStyle(name.parentElement!).textAlign).toBe("left");
        expect(
          Math.abs(
            name.getBoundingClientRect().left - secondary.getBoundingClientRect().left,
          ),
        ).toBeLessThanOrEqual(1);
        expect(phase.getBoundingClientRect().top).toBeGreaterThanOrEqual(
          secondary.getBoundingClientRect().bottom,
        );
      });
      if (utilities >= 2) {
        await expect.element(menu).toHaveAttribute("aria-expanded", "false");
        await menu.click();
        await expect.element(page.getByText("Messages", { exact: true })).toBeVisible();
        await expect
          .element(page.getByText("Jordan Smith", { exact: true }))
          .toBeVisible();
      } else {
        expect(root.querySelector(".utilities-menu-button")).toBeNull();
      }
    });
  }

  it("switches from left alignment to centred alignment at 624px", async () => {
    await page.viewport(623, 800);
    render(<HeaderLayoutFixture />);
    const { name } = await getLayout();
    expect(getComputedStyle(name.parentElement!).textAlign).toBe("left");

    await page.viewport(624, 800);
    await vi.waitFor(() => {
      expect(getComputedStyle(name.parentElement!).textAlign).toBe("center");
      expect(Math.abs(centre(name) - window.innerWidth / 2)).toBeLessThanOrEqual(1);
    });
  });
});
