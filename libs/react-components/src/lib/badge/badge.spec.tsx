import { render } from "@testing-library/react";
import { GoABadge } from "./badge";
import { screen } from "@testing-library/dom";

describe("GoA Badge", () => {
  it("should render", () => {
    render(
      <GoABadge type="information" testId="badge-test" content="Text Content" />
    );

    const badge = screen.findByTestId("badge-test");
    expect(badge).toBeTruthy();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoABadge
        type="information"
        content="Text Content"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel="text"
      />
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("type")).toBe("information");
    expect(el?.getAttribute("content")).toBe("Text Content");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialabel")).toBe("text");
  });
});
