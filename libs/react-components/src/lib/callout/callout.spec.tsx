import { render } from "@testing-library/react";
import GoABCallout from "./callout";

describe("Callout", () => {
  test("Callout shall render", async () => {
    const result = render(
      <GoABCallout
        type="information"
        heading="Callout Title"
        size="medium"
        maxWidth="480px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        Information to the user goes in the content. Information can include markup as
        desired.
      </GoABCallout>,
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
  });
});
