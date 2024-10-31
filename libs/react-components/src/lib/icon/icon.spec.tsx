import { render } from "@testing-library/react";
import { GoabIcon } from "./icon";

describe("GoabIcon", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoabIcon
        type="information"
        size="large"
        theme="filled"
        inverted="true"
        fillColor="blue"
        opacity={0.5}
        title="foo"
        ariaLabel="bar"
        testId="foo"
        mt="s"
        mr="m"
        mb="l"
        ml="xl" />
    );
    const el = container.querySelector("goa-icon");

    expect(el?.getAttribute("type")).toBe("information");
    expect(el?.getAttribute("size")).toBe("large");
    expect(el?.getAttribute("theme")).toBe("filled");
    expect(el?.getAttribute("inverted")).toBe("true");
    expect(el?.getAttribute("fillcolor")).toBe("blue");
    expect(el?.getAttribute("opacity")).toBe("0.5");
    expect(el?.getAttribute("title")).toBe("foo");
    expect(el?.getAttribute("arialabel")).toBe("bar");
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
