import { render } from "vitest-browser-react";
import {
  GoabWorkspaceLayout,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "../src";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

const paragraphs = Array.from({ length: 25 }, (_, i) => i + 1);

const Layout = () => (
  <GoabWorkspaceLayout
    pageHeader={<div data-testid="wl-header">Cases overview</div>}
    pageFooter={<div data-testid="wl-footer">Last updated 2 minutes ago</div>}
    sideMenu={
      <GoabWorkSideMenu
        heading="Workspace"
        url="/"
        open={true}
        testId="side-menu"
        primaryContent={
          <GoabWorkSideMenuGroup icon="grid" heading="Work">
            <GoabWorkSideMenuItem icon="document" label="Cases" url="/cases" />
            <GoabWorkSideMenuItem icon="folder" label="Documents" url="/documents" />
          </GoabWorkSideMenuGroup>
        }
      />
    }
  >
    <div>
      {paragraphs.map((n) => (
        <p key={n} data-testid={`wl-para-${n}`}>
          Paragraph {n} — long-running text content. The side menu, page header, and page
          footer stay fixed while content scrolls inside the card.
        </p>
      ))}
    </div>
  </GoabWorkspaceLayout>
);

async function getScrollCard(baseElement: Element): Promise<HTMLElement> {
  const host = baseElement.querySelector("goa-workspace-layout") as HTMLElement;
  await vi.waitFor(() => {
    const el = host.shadowRoot?.querySelector(".card") as HTMLElement | null;
    expect(el && el.scrollHeight > el.clientHeight).toBe(true);
  });
  return host.shadowRoot!.querySelector(".card") as HTMLElement;
}

describe("WorkspaceLayout", () => {
  describe("Desktop viewport", () => {
    it("keeps the page header and footer pinned while the body scrolls", async () => {
      await page.viewport(1024, 768);
      const result = render(<Layout />);

      const card = await getScrollCard(result.baseElement);
      const header = result.getByTestId("wl-header");
      const footer = result.getByTestId("wl-footer");
      const firstPara = result.getByTestId("wl-para-1");

      const headerTop = header.element().getBoundingClientRect().top;
      const footerBottom = footer.element().getBoundingClientRect().bottom;
      const paraTop = firstPara.element().getBoundingClientRect().top;

      const expectPinned = () => {
        expect(header.element().getBoundingClientRect().top).toBeCloseTo(headerTop, 0);
        expect(footer.element().getBoundingClientRect().bottom).toBeCloseTo(
          footerBottom,
          0,
        );
      };

      // Scroll down into the middle.
      card.scrollTop = 150;
      await vi.waitFor(() => {
        expect(card.scrollTop).toBeCloseTo(150, 0);
        expect(firstPara.element().getBoundingClientRect().top).toBeCloseTo(
          paraTop - 150,
          0,
        );
      });
      expectPinned();

      // Scroll all the way to the bottom.
      const max = card.scrollHeight - card.clientHeight;
      card.scrollTop = max;
      await vi.waitFor(() => {
        expect(card.scrollTop).toBeCloseTo(max, 0);
      });
      expectPinned();

      // Scroll back up to the top.
      card.scrollTop = 0;
      await vi.waitFor(() => {
        expect(card.scrollTop).toBeCloseTo(0, 0);
        expect(firstPara.element().getBoundingClientRect().top).toBeCloseTo(paraTop, 0);
      });
      expectPinned();
    });
  });

  describe("Mobile viewport", () => {
    it("shows the hamburger and keeps the side menu closed by default", async () => {
      await page.viewport(390, 844);
      const result = render(<Layout />);

      const hamburger = result.getByRole("button", { name: "Open menu" });
      const sideMenu = result.getByTestId("side-menu");

      await vi.waitFor(() => {
        expect(hamburger).toBeVisible();
      });

      await vi.waitFor(() => {
        const root = sideMenu.element();
        expect(root.classList.contains("closed")).toBe(true);
        expect(getComputedStyle(root).visibility).toBe("hidden");
      });
    });

    it("keeps the page header and footer visible while the body scrolls", async () => {
      await page.viewport(390, 844);
      const result = render(<Layout />);

      const card = await getScrollCard(result.baseElement);
      const header = result.getByTestId("wl-header");
      const footer = result.getByTestId("wl-footer");
      const firstPara = result.getByTestId("wl-para-1");

      const headerTop = header.element().getBoundingClientRect().top;
      const footerBottom = footer.element().getBoundingClientRect().bottom;
      const paraTop = firstPara.element().getBoundingClientRect().top;

      card.scrollTop = 150;
      await vi.waitFor(() => {
        expect(card.scrollTop).toBeCloseTo(150, 0);
        // Body content scrolled up...
        expect(firstPara.element().getBoundingClientRect().top).toBeCloseTo(
          paraTop - 150,
          0,
        );
      });

      expect(header).toBeVisible();
      expect(footer).toBeVisible();
      expect(header.element().getBoundingClientRect().top).toBeCloseTo(headerTop, 0);
      expect(footer.element().getBoundingClientRect().bottom).toBeCloseTo(
        footerBottom,
        0,
      );
    });

    it("opens the side menu via the hamburger and closes it via the background", async () => {
      await page.viewport(390, 844);
      const result = render(<Layout />);

      const hamburger = result.getByRole("button", { name: "Open menu" });
      const sideMenu = result.getByTestId("side-menu");

      // Closed by default.
      await vi.waitFor(() => {
        expect(sideMenu.element().classList.contains("closed")).toBe(true);
      });

      // Hamburger opens the drawer.
      await hamburger.click();
      await vi.waitFor(() => {
        const root = sideMenu.element();
        expect(root.classList.contains("closed")).toBe(false);
        expect(getComputedStyle(root).visibility).toBe("visible");
      });

      // Clicking the backdrop closes it again.
      const background = result.getByTestId("work-side-menu-background");
      await background.click({ position: { x: 370, y: 20 } });
      await vi.waitFor(() => {
        expect(sideMenu.element().classList.contains("closed")).toBe(true);
      });
    });
  });
});
