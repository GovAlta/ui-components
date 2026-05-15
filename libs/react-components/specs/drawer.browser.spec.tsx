import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";
import { GoabDrawer } from "../src";

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
});
