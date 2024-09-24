import React from "react";
import { render } from "@testing-library/react";
import GoACallout from "./callout";

describe("Callout", () => {
  test("Callout shall render", async () => {
    const result = render(
      <GoACallout
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
      </GoACallout>,
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
        <GoACallout
          type="information"
          heading="Callout Title"
          ariaLive={ariaLive as "off" | "polite" | "assertive" | undefined}
        >
          Test content
        </GoACallout>,
      );

      const el = result.container.querySelector("goa-callout");
      expect(el?.getAttribute("arialive")).toBe(expected);
    });
  });
});
