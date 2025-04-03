import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import GoabDrawer from "./drawer";

const noop = () => {
  /* nothing */
};

describe("Drawer", () => {
  it("should render", async () => {
    const content = render(
      <GoabDrawer position="bottom" onClose={noop}>
        The content
      </GoabDrawer>,
    );

    const el = content.container.querySelector("goa-drawer");

    expect(el?.getAttribute("position")).toBe("bottom");
    expect(el?.getAttribute("open")).toBeNull();
  });

  it("should render with properties", async () => {
    const content = render(
      <GoabDrawer
        open
        position="bottom"
        heading="The heading"
        maxSize="50ch"
        testId="the testid"
        onClose={noop}
      >
        The content
      </GoabDrawer>
    );

    const el = content.container.querySelector("goa-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("open")).toBe("true");
      expect(el?.getAttribute("position")).toBe("bottom");
      expect(el?.getAttribute("heading")).toBe("The heading");
      expect(el?.getAttribute("maxsize")).toBe("50ch");
      expect(el?.getAttribute("testid")).toBe("the testid");
    });
  });

  it("should render with open false", async () => {
    const content = render(
      <GoabDrawer open={false} position="bottom" onClose={noop}>
        The content
      </GoabDrawer>,
    );

    const el = content.container.querySelector("goa-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("position")).toBe("bottom");
      expect(el?.getAttribute("open")).toBe("false");
    });
  });

  it("renders with React node heading", async () => {
    const headingNode = <div>Custom Heading</div>;
    const content = render(
      <GoabDrawer
        open={true}
        position="right"
        heading={headingNode}
        onClose={noop}
      >
        The content
      </GoabDrawer>
    );

    const el = content.container.querySelector("goa-drawer");
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
      <GoabDrawer
        open={true}
        position="right"
        heading="The heading"
        actions={actionsNode}
        onClose={noop}
      >
        The content
      </GoabDrawer>
    );

    const el = content.container.querySelector("goa-drawer");
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
