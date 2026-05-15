import { render } from "vitest-browser-react";
import { expect, describe, it, vi } from "vitest";
import { GoabPushDrawer } from "../src";

describe("PushDrawer", () => {
  const testId = "PushDrawerBrowserTestId";
  let isOpen = false;
  const handleOnClose = vi.fn();
  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    minWidth: "1024px", // Prevent the drawer from falling back to mobile drawer
    minHeight: "80vh",
  };

  const pageContainerStyles: React.CSSProperties = {
    flex: "1 1 0%",
    overflow: "hidden",
    border: "1px solid green",
  };
  const Component = () => {
    return (
      <div style={pageStyle}>
        <div style={pageContainerStyles} data-testid="container">
          <h1>Pushed In Content</h1>
          <p>This is pushed in</p>
        </div>
        <GoabPushDrawer
          testId={testId}
          open={isOpen}
          heading="Push Drawer"
          width={"450px"}
          onClose={handleOnClose}
        >
          <h2>Drawer Content</h2>
          <p>This is the content of the push drawer.</p>
        </GoabPushDrawer>
      </div>
    );
  };

  it("renders", async () => {
    const result = await render(<Component />);
    console.log(result.baseElement.innerHTML);

    await vi.waitFor(async () => {
      const drawer = result.getByTestId(testId);
      console.log(drawer, drawer.element());
      expect(drawer).toBeInTheDocument();
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
        const drawer = getByTestId(`drawer-${testId}`);
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
        const drawer = getByTestId(`drawer-${testId}`);
        expect(drawer).toHaveStyle({ pointerEvents: "none" });
      });
    });
  });
});
