import { render } from "@testing-library/react";
import GoACallout from "./callout";

describe("Callout", () => {
  test("Callout shall render", async () => {
    const result = render(
      <GoACallout
        type="information"
        heading="Callout Title"
        size="medium"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        Information to the user goes in the content. Information can include
        markup as desired.
      </GoACallout>
    );

    const el = result.container.querySelector("goa-callout");
    expect(el?.getAttribute("heading")).toContain("Callout Title");
    expect(el?.getAttribute("type")).toContain("information");
    expect(el?.getAttribute("size")).toContain("medium");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
