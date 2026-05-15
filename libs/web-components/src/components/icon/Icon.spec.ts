import { render } from "@testing-library/svelte";
import GoAIcon from "./Icon.svelte";
import { it, describe } from "vitest";

describe("Icon", () => {
  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAIcon, {
        testid: "icon-test",
        type: "ellipse",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const icon = await baseElement.findByTestId("icon-test");

      expect(icon).toBeTruthy();
      expect(icon).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(icon).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(icon).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(icon).toHaveStyle("margin-left:var(--goa-space-xl)");
      expect(icon.getAttribute("role")).toBe("img");
    });
    it("should render the goa-icon with accessibility add-ons attribute accordingly", async () => {
      const baseElement = render(GoAIcon, {
        testid: "icon-test",
        type: "ellipse",
        role: "button",
        arialabel: "Clear input",
        ariacontrols: "menuId",
        ariaexpanded: "true",
      });
      const icon = await baseElement.findByTestId("icon-test");
      expect(icon.getAttribute("role")).toBe("button");
      expect(icon.getAttribute("aria-label")).toBe("Clear input");
      expect(icon.getAttribute("aria-controls")).toBe("menuId");
      expect(icon.getAttribute("aria-expanded")).toBe("true");
    });
    it(`should change icon's role to be 'img' and add aria-label so the screen reader can read, when aria-label is set`, async () => {
      const baseElement = render(GoAIcon, {
        testid: "icon-test",
        type: "ellipse",
        arialabel: "aria-label-test",
      });
      const icon = await baseElement.findByTestId("icon-test");
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("role")).toBe("img");
      expect(icon.getAttribute("aria-label")).toBe("aria-label-test");
    });
  });
});

describe("Icon Theme", () => {
  it("should render the filled variant when provided in the type", async () => {
    const filled = render(GoAIcon, {
      testid: "icon-filled",
      type: "ellipse:filled",
    });

    const filledIcon = await filled.findByTestId("icon-filled");
    const filledIonIcon = filledIcon.querySelector("ion-icon");

    expect(filledIcon.getAttribute("data-type")).toBe("ellipse");
    expect(filledIonIcon?.getAttribute("name")).toBe("ellipse"); // filled variant has no "-outline"

    const outline = render(GoAIcon, {
      testid: "icon-outline",
      type: "ellipse",
    });

    const outlineIcon = await outline.findByTestId("icon-outline");
    const outlineIonIcon = outlineIcon.querySelector("ion-icon");

    expect(outlineIonIcon?.getAttribute("name")).toBe("ellipse-outline"); // default outline theme
  });
});

describe("Icon Sizes", () => {
  const sizes = [
    {
      size: "1",
      expectedWidth: "var(--goa-icon-size-1)",
      expectedHeight: "var(--goa-icon-size-1)",
    },
    {
      size: "2",
      expectedWidth: "var(--goa-icon-size-2)",
      expectedHeight: "var(--goa-icon-size-2)",
    },
    {
      size: "3",
      expectedWidth: "var(--goa-icon-size-3)",
      expectedHeight: "var(--goa-icon-size-3)",
    },
    {
      size: "4",
      expectedWidth: "var(--goa-icon-size-4)",
      expectedHeight: "var(--goa-icon-size-4)",
    },
    {
      size: "5",
      expectedWidth: "var(--goa-icon-size-5)",
      expectedHeight: "var(--goa-icon-size-5)",
    },
    {
      size: "6",
      expectedWidth: "var(--goa-icon-size-6)",
      expectedHeight: "var(--goa-icon-size-6)",
    },
    {
      size: "2xsmall",
      expectedWidth: "var(--goa-icon-size-s)",
      expectedHeight: "var(--goa-icon-size-s)",
    },
    { size: "xsmall", expectedWidth: "18px", expectedHeight: "18px" },
    {
      size: "small",
      expectedWidth: "var(--goa-icon-size-m)",
      expectedHeight: "var(--goa-icon-size-m)",
    },
    {
      size: "medium",
      expectedWidth: "var(--goa-icon-size-l)",
      expectedHeight: "var(--goa-icon-size-l)",
    },
    { size: "large", expectedWidth: "2rem", expectedHeight: "2rem" },
    { size: "xlarge", expectedWidth: "2.5rem", expectedHeight: "2.5rem" },
  ];

  sizes.forEach(({ size, expectedWidth, expectedHeight }) => {
    it(`should render the correct width and height for size "${size}"`, async () => {
      const baseElement = render(GoAIcon, {
        testid: "icon-test",
        type: "ellipse",
        size,
      });
      const icon = await baseElement.findByTestId("icon-test");
      expect(icon).toHaveStyle(`width: ${expectedWidth}`);
      expect(icon).toHaveStyle(`height: ${expectedHeight}`);
    });
  });
});
