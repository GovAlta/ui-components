import { render } from "@testing-library/react";
import ABGovContainer from "./container";
import { ABGovButton } from "../button/button";

describe("Container", () => {
  it("should render the properties", () => {
    const { container } = render(
      <ABGovContainer
        type="interactive"
        accent="thick"
        padding="relaxed"
        title={"Text title"}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        actions={<ABGovButton onClick={() => { /* do nothing */ }}>Save</ABGovButton>}
      >
        Container content
      </ABGovContainer>
    );

    const el = container.querySelector("goa-container");

    expect(el).toBeTruthy();
    expect(el?.getAttribute("type")).toEqual("interactive");
    expect(el?.getAttribute("accent")).toEqual("thick");
    expect(el?.getAttribute("padding")).toEqual("relaxed");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");

    expect(el?.querySelector("*[slot=title]")?.innerHTML).toContain("Text title");
    expect(
      el?.querySelector("*[slot=actions]")?.querySelector("goa-button")
    ).not.toBeFalsy();
  });
});
