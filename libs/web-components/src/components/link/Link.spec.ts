import { render } from "@testing-library/svelte";
import GoALink from "./Link.svelte";
import { it, describe } from "vitest";

describe("Link", () => {
  it("should render", async () => {
    const baseElement = render(GoALink, {
      testid: "link-test",
    });
    const link = await baseElement.findByTestId("link-test");
    expect(link).toBeTruthy();
  });

  describe("Icons", () => {
    it("should render a leading icon", async () => {
      const baseElement = render(GoALink, {
        testid: "link-test",
        leadingicon: "home",
      });
      const icon = await baseElement.getByTestId("leading-icon");
      expect(icon).toBeTruthy();
    });

    it("should render a trailing icon", async () => {
      const baseElement = render(GoALink, {
        testid: "link-test",
        trailingicon: "home",
      });
      const icon = await baseElement.container.querySelector("goa-icon");
      expect(icon).toBeTruthy();
    });
  });

  describe("Margins", () => {
    it("should add margins", async () => {
      const baseElement = render(GoALink, {
        testid: "link-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const link = await baseElement.findByTestId("link-test");

      expect(link).toBeTruthy();
      expect(link).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(link).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(link).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(link).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
