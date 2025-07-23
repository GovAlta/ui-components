import React from "react";
import { render } from "@testing-library/react";
import GoabCallout from "./callout";

describe("Callout", () => {
  test("Callout shall render", async () => {
    const result = render(
      <GoabCallout
        type="information"
        heading="Callout Title"
        size="medium"
        maxWidth="480px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLive="polite"
        testId="test-callout"
      >
        Information to the user goes in the content. Information can include markup as
        desired.
      </GoabCallout>,
    );

    const el = result.container.querySelector("goa-callout");
    expect(el?.getAttribute("heading")).toContain("Callout Title");
    expect(el?.getAttribute("type")).toContain("information");
    expect(el?.getAttribute("size")).toContain("medium");
    expect(el?.getAttribute("maxwidth")).toBe("480px");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialive")).toBe("polite");
    expect(el?.getAttribute("testid")).toBe("test-callout");
    expect(el?.textContent).toContain("Information to the user goes");
  });

  test("Callout shall render with different ariaLive values", async () => {
    const testCases = [
      { ariaLive: "assertive", expected: "assertive" },
      { ariaLive: "polite", expected: "polite" },
      { ariaLive: "off", expected: "off" },
      { ariaLive: undefined, expected: "off" },
      { ariaLive: "", expected: "" },
    ];

    testCases.forEach(({ ariaLive, expected }) => {
      const result = render(
        <GoabCallout
          type="information"
          heading="Callout Title"
          ariaLive={ariaLive as "off" | "polite" | "assertive" | undefined}
        >
          Test content
        </GoabCallout>,
      );

      const el = result.container.querySelector("goa-callout");
      expect(el?.getAttribute("arialive")).toBe(expected);
    });
  });

  test("Callout shall render with different emphasis levels", async () => {
    const testCases = [
      { emphasis: "high", expected: "high" },
      { emphasis: "medium", expected: "medium" },
      { emphasis: "low", expected: "low" },
      { emphasis: undefined, expected: "medium" }, // default
    ];

    testCases.forEach(({ emphasis, expected }) => {
      const result = render(
        <GoabCallout
          type="information"
          emphasis={emphasis as "high" | "medium" | "low" | undefined}
        >
          Test content
        </GoabCallout>,
      );

      const el = result.container.querySelector("goa-callout");
      expect(el?.getAttribute("emphasis")).toBe(expected);
    });
  });

  test("Callout shall maintain backward compatibility with size prop", async () => {
    const result = render(
      <GoabCallout
        type="information"
        size="medium"
        emphasis="high"
      >
        Test content
      </GoabCallout>,
    );

    const el = result.container.querySelector("goa-callout");
    expect(el?.getAttribute("size")).toBe("medium");
    expect(el?.getAttribute("emphasis")).toBe("high");
  });
});
