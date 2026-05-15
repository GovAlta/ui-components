import { render, cleanup } from "@testing-library/svelte";
import Divider from "./Divider.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("Divider", () => {
  describe("Margins", () => {
    it("should add the margin", async () => {
      const baseElement = render(Divider, {
        testid: "divider-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const divider = await baseElement.findByTestId("divider-test");

      expect(divider).toBeTruthy();
      expect(divider.outerHTML).toContain("margin-top:var(--goa-space-s)");
      expect(divider.outerHTML).toContain("margin-right:var(--goa-space-m)");
      expect(divider.outerHTML).toContain("margin-bottom:var(--goa-space-l)");
      expect(divider.outerHTML).toContain("margin-left:var(--goa-space-xl)");
    });
  });
});
