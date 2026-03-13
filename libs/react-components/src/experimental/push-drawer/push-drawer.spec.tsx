import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import GoabxPushDrawer from "./push-drawer";

const noop = () => {
  /* nothing */
};

describe("GoabxPushDrawer", () => {
  it("should render", async () => {
    const content = render(<GoabxPushDrawer onClose={noop}>The content</GoabxPushDrawer>);

    const el = content.container.querySelector("goa-push-drawer");

    expect(el?.getAttribute("open")).toBeNull();
    expect(el?.getAttribute("version")).toBe("2");
  });

  it("should render with properties", async () => {
    const content = render(
      <GoabxPushDrawer
        open
        heading="The heading"
        width="600px"
        testId="the testid"
        onClose={noop}
      >
        The content
      </GoabxPushDrawer>,
    );

    const el = content.container.querySelector("goa-push-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("open")).not.toBeNull();
      expect(el?.getAttribute("heading")).toBe("The heading");
      expect(el?.getAttribute("width")).toBe("600px");
      expect(el?.getAttribute("testid")).toBe("the testid");
      expect(el?.getAttribute("version")).toBe("2");
    });
  });

  it("renders with React node heading", async () => {
    const headingNode = <div>Custom Heading</div>;
    const content = render(
      <GoabxPushDrawer open heading={headingNode} onClose={noop}>
        The content
      </GoabxPushDrawer>,
    );

    const el = content.container.querySelector("goa-push-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("heading")).toBeNull();
      const headingSlot = el?.querySelector('[slot="heading"]');
      expect(headingSlot).toBeTruthy();
      expect(headingSlot?.textContent).toBe("Custom Heading");
    });
  });

  it("renders with actions", async () => {
    const actionsNode = <button>Action Button</button>;
    const content = render(
      <GoabxPushDrawer open heading="The heading" actions={actionsNode} onClose={noop}>
        The content
      </GoabxPushDrawer>,
    );

    const el = content.container.querySelector("goa-push-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      const actionsSlot = el?.querySelector('[slot="actions"]');
      expect(actionsSlot).toBeTruthy();
      const actionButton = actionsSlot?.querySelector("button");
      expect(actionButton).toBeTruthy();
      expect(actionButton?.textContent).toBe("Action Button");
    });
  });
});
