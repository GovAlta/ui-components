import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import GoADrawer from "./drawer";

const noop = () => {
  /* nothing */
};

describe("Drawer", () => {
  it("should render", async () => {
    const content = render(
      <GoADrawer position="bottom" onClose={noop}>
        The content
      </GoADrawer>,
    );

    const el = content.container.querySelector("goa-drawer");

    expect(el?.getAttribute("position")).toBe("bottom");
    expect(el?.getAttribute("open")).toBeNull();
  });

  it("should render with properties", async () => {
    const content = render(
      <GoADrawer
        open
        position="bottom"
        heading="The heading"
        maxSize="50ch"
        testId="the testid"
        onClose={noop}
      >
        The content
      </GoADrawer>,
    );

    const el = content.container.querySelector("goa-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("open")).toBe("true");
      expect(el?.getAttribute("position")).toBe("bottom");
      expect(el?.getAttribute("heading")).toBe("The heading");
      expect(el?.getAttribute("maxsize")).toBe("50ch");
      expect(el?.getAttribute("data-testid")).toBe("the testid");
    });
  });

  it("should render with open false", async () => {
    const content = render(
      <GoADrawer open={false} position="bottom" onClose={noop}>
        The content
      </GoADrawer>,
    );

    const el = content.container.querySelector("goa-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("position")).toBe("bottom");
      expect(el?.getAttribute("open")).toBe("false");
    });
  });
});
