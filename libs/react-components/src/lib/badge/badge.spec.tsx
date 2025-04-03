import { configure, render } from "@testing-library/react";
import { GoabBadge } from "./badge";

configure({
  testIdAttribute: "testId",
});

describe("GoabBadge", () => {
  it("should render", () => {
    const { container } = render(<GoabBadge type="information" content="Text Content" />);

    const el = container.querySelector("goa-badge");
    expect(el?.getAttribute("icon")).toBeNull();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoabBadge
        type="information"
        content="Text Content"
        icon
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel="text"
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("type")).toBe("information");
    expect(el?.getAttribute("content")).toBe("Text Content");
    expect(el?.getAttribute("icon")).toBe("true");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialabel")).toBe("text");
  });
});
