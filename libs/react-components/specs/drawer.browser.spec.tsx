import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";
import { GoabDrawer } from "../src";
import { page } from "vitest/browser";

describe("Drawer", () => {
  const testId = "DrawerBrowserTestId";
  let isOpen = false;
  const handleOnClose = vi.fn();
  const Component = () => {
    return <GoabDrawer testId={testId} open={isOpen} onClose={handleOnClose} />;
  };

  it("renders", async () => {
    const { getByTestId } = await render(<Component />);

    await vi.waitFor(async () => {
      const drawer = getByTestId(testId);
      expect(drawer).toBeInTheDocument();
      expect(drawer).toHaveStyle({ pointerEvents: "none" });
    });
  });

  describe("when open is true", () => {
    beforeEach(() => {
      isOpen = true;
    });

    afterEach(() => {
      isOpen = false;
    });

    it("is visible", async () => {
      const { getByTestId } = await render(<Component />);

      await vi.waitFor(async () => {
        const drawer = getByTestId(testId);
        expect(drawer).toHaveStyle({ pointerEvents: "auto" });
      });
    });

    it("calls onClose when the close button is clicked", async () => {
      const { getByTestId } = await render(<Component />);

      const closeButton = getByTestId("drawer-close-button");
      await vi.waitFor(() => {
        expect(closeButton.element()).toBeTruthy();
      });
      await closeButton.click();
      await vi.waitFor(() => {
        expect(handleOnClose).toHaveBeenCalled();
      });
    });
  });

  describe("when open is false", () => {
    beforeEach(() => {
      isOpen = false;
    });

    it("is hidden", async () => {
      const { getByTestId } = await render(<Component />);

      await vi.waitFor(async () => {
        const drawer = getByTestId(testId);
        expect(drawer).toHaveStyle({ pointerEvents: "none" });
      });
    });
  });

  it.each(["left", "right"] as const)(
    "scrolls overflowing content when positioned on the %s",
    async (position) => {
      await page.viewport(800, 600);
      const rows = Array.from({ length: 30 }, (_, i) => i + 1);

      const result = render(
        <GoabDrawer
          heading="Scrollable drawer"
          position={position}
          open={true}
          onClose={handleOnClose}
        >
          {rows.map((row) => (
            <p key={row} data-testid={`drawer-row-${row}`}>
              Drawer row {row} — content that exceeds the viewport height.
            </p>
          ))}
        </GoabDrawer>,
      );

      const drawerHost = result.baseElement.querySelector("goa-drawer") as HTMLElement;

      await vi.waitFor(() => {
        const scrollPanel = drawerHost.shadowRoot?.querySelector(
          "goa-scroll-panel",
        ) as HTMLElement | null;
        const scrollContainer = scrollPanel?.shadowRoot?.querySelector(
          ".scroll-panel-scroll-container",
        ) as HTMLElement | null;
        expect(
          scrollContainer &&
            scrollContainer.clientHeight > 100 &&
            scrollContainer.scrollHeight > scrollContainer.clientHeight,
        ).toBe(true);
      });

      const scrollPanel = drawerHost.shadowRoot?.querySelector(
        "goa-scroll-panel",
      ) as HTMLElement | null;
      const scrollContainer = scrollPanel?.shadowRoot?.querySelector(
        ".scroll-panel-scroll-container",
      ) as HTMLElement | null;
      if (!scrollContainer) throw new Error("Drawer scroll container was not rendered");
      const finalRow = result.getByTestId("drawer-row-30");

      scrollContainer.scrollTop =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;

      await vi.waitFor(() => {
        expect(scrollContainer.scrollTop).toBeGreaterThan(0);
        expect(finalRow.element().getBoundingClientRect().bottom).toBeLessThanOrEqual(
          scrollContainer.getBoundingClientRect().bottom,
        );
      });
    },
  );
});
