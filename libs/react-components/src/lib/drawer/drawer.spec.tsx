import { render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import GoADrawer from "./drawer";

const noop = () => {/* nothing */}

describe("Drawer", () => {
  it("renders", async () => {
    const content = render(
      <GoADrawer 
        open={false} 
        position="bottom" 
        heading="The heading"
        maxSize="50ch"
        testId="the testid"
        onClose={noop}
      >
        The content
      </GoADrawer>
    );

    const el = content.container.querySelector("goa-drawer");
    expect(el).toBeTruthy();
    await waitFor(() => {
      expect(el?.getAttribute("open")).toBeNull();
      expect(el?.getAttribute("position")).toBe("bottom");
      expect(el?.getAttribute("heading")).toBe("The heading");
      expect(el?.getAttribute("maxsize")).toBe("50ch");
      expect(el?.getAttribute("data-testid")).toBe("the testid");
    })
  });
});
