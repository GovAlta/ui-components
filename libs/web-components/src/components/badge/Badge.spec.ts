import { render } from "@testing-library/svelte";
import GoABadge from "./Badge.svelte";
import { it, describe } from "vitest";

describe("GoABadgeComponent", () => {
  const badgeTypes = [
    "information",
    "important",
    "emergency",
    "success",
    "dark",
    "midtone",
    "light",
    "archived",
    "aqua",
    "black",
    "blue",
    "green",
    "orange",
    "pink",
    "red",
    "violet",
    "white",
    "yellow",
    "aqua-light",
    "black-light",
    "blue-light",
    "green-light",
    "orange-light",
    "pink-light",
    "red-light",
    "violet-light",
    "yellow-light",
  ];

  describe("Badge Types", () => {
    badgeTypes.forEach((type) => {
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
      expect(goaIcon!.getAttribute("arialabel")).toBe(
        "Text that screen reader should read",
      );
      expect(goaIcon!.getAttribute("role")).toBe("presentation");
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
      expect(goaIcon!.getAttribute("arialabel")).toBe(null);
      expect(goaIcon!.getAttribute("role")).toBe(null);
    });
  });

  describe("Custom Icon Type", () => {
    it(`should render custom icon type when icontype is provided`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "information",
        content: "Custom Icon",
        icontype: "home",
      });
      const goaIcon = await result.container.querySelector("goa-icon");
      expect(goaIcon!.getAttribute("type")).toBe("home");
    });

    it(`should render default icon type when icontype is not provided`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "success",
        content: "Default Icon",
        icon: "true",
      });
      const goaIcon = await result.container.querySelector("goa-icon");
      expect(goaIcon!.getAttribute("type")).toBe("checkmark-circle");
    });

    it(`should render custom icon type for emergency badge`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "emergency",
        content: "Custom Emergency",
        icontype: "alert-circle",
      });
      const goaIcon = result.container.querySelector("goa-icon");
      expect(goaIcon!.getAttribute("type")).toBe("alert-circle");
    });

    it(`should NOT render icon when icon="false" even with icontype provided`, async () => {
      const result = render(GoABadge, {
        testid: "badge-test",
        type: "success",
        content: "No Icon",
        icon: "false",
        icontype: "star",
      });
      const badge = await result.findByTestId("badge-test");
      const goaIcon = result.container.querySelector("goa-icon");
      
      expect(goaIcon).toBeNull(); // No icon should be rendered
      expect(badge).toContainHTML("No Icon");
      expect(badge).toHaveClass("badge-success");
    });
  });
});
