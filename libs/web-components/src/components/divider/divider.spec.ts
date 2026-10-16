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
      expect(divider.style.marginTop).toBe("var(--goa-space-s)");
      expect(divider.style.marginRight).toBe("var(--goa-space-m)");
      expect(divider.style.marginBottom).toBe("var(--goa-space-l)");
      expect(divider.style.marginLeft).toBe("var(--goa-space-xl)");
    });
  });
});
