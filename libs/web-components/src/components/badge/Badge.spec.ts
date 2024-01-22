import { render } from "@testing-library/svelte";
import GoABadge from "./Badge.svelte";
import { it, describe } from "vitest";

describe("GoABadgeComponent", () => {

  const badgeTypes = [
    "success",
    "important",
    "information",
    "emergency",
    "dark",
    "midtone",
    "light",
  ]

  describe("Badge Types", () => {
    badgeTypes.forEach(type => {
      it(`should render - ${type}`, async () => {
        const baseElement = render(GoABadge, {
          testid: "badge-test",
          type,
          content: "Content",
        });
        const badge = await baseElement.findByTestId("badge-test");

        expect(badge).toHaveClass(`badge-${type}`);
        expect(badge).toContainHTML("Content");
      });
    });
  });

  describe("Icons", () => {
    badgeTypes.forEach((type) => {
      it(`should render icon - ${type}`, async () => {
        const baseElement = render(GoABadge, {
          testid: "badge-test",
          type,
          icon: "true",
          content: "Content",
        });
        const badge = await baseElement.findByTestId("badge-test");

        expect(badge).toBeTruthy();
        expect(badge.childElementCount).toBe(2);
        expect(badge).toHaveClass(`badge-${type}`);
        expect(badge).toContainHTML("Content");
      });
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoABadge, {
        testid: "badge-test",
        type: "success",
        content: "Content",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const badge = await baseElement.findByTestId("badge-test");

      expect(badge).toBeTruthy();
      expect(badge).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(badge).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(badge).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(badge).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  describe("AriaLabel", () => {
    it(`should add the text that screen reader should read if arialabel is set for icon-only badge`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "success",
        icon: "true",
        arialabel: "Text that screen reader should read",
      });
      const goaIcon = await result.container.querySelector("goa-icon");
      expect(goaIcon.getAttribute("arialabel")).toBe("Text that screen reader should read");
      expect(goaIcon.getAttribute("role")).toBe("presentation");
    });
    it(`should ignore arialabel for not icon-only badge`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "success",
        content: "abc",
        icon: "true",
        arialabel: "Text that screen reader should read",
      });
      const goaIcon = await result.container.querySelector("goa-icon");
      expect(goaIcon.getAttribute("arialabel")).toBe(null);
      expect(goaIcon.getAttribute("role")).toBe(null);
    });
  });
});
