import { render, waitFor } from "@testing-library/react";
import { GoabPushDrawer } from "./push-drawer";
import { GoabButton } from "../button/button";

function testElement(open: boolean, drawerWidth: string) {
  const closePushDrawer = vi.fn(() => {
    open = false;
  });

  const actions = (
    <div>
      <button>Action 1</button>
      <button>Action 2</button>
    </div>
  );

  const pushDrawerControls = (
    <div>
      <p>This is the content of the push drawer.</p>
    </div>
  );

  return (
    <GoabPushDrawer
      testid="test-drawer"
      open={open}
      heading="Push Drawer"
      width="400px"
      onClose={closePushDrawer}
      actions={actions}
    >
      {pushDrawerControls}
      <GoabButton onClick={closePushDrawer}>Close</GoabButton>
    </GoabPushDrawer>
  );
}

describe("GoabPushDrawer", () => {
  it("renders a goab-push-drawer", async () => {
    const { container } = render(testElement(true, "400px"));
    const el = container.querySelector("goa-push-drawer");
    await waitFor(() => {
      expect(el).toBeTruthy();
    });
  });

  describe("attributes", () => {
    it("renders with testid", async () => {
      const { container } = render(testElement(true, "400px"));
      const el = container.querySelector("goa-push-drawer");
      await waitFor(() => {
        expect(el?.getAttribute("testid")).toBe("test-drawer");
      });
    });

    it("opens when open is true", async () => {
      const { container } = render(testElement(true, "400px"));
      const el = container.querySelector("goa-push-drawer");

      await waitFor(() => {
        expect(el?.getAttribute("open")).toBe("");
      });
    });

    it("opens when open is false", async () => {
      const { container } = render(testElement(false, "400px"));
      const el = container.querySelector("goa-push-drawer");

      await waitFor(() => {
        expect(el?.getAttribute("open")).toBeFalsy();
      });
    });

    it("passes heading", async () => {
      const { container } = render(testElement(false, "400px"));
      const el = container.querySelector("goa-push-drawer");

      await waitFor(() => {
        expect(el?.getAttribute("heading")).toBe("Push Drawer");
      });
    });
  });
});
