import { render } from "@testing-library/react";
import GoAText from "./text";
import { describe, it, expect } from "vitest";

describe("Text", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoAText>test</GoAText>);

    expect(baseElement.innerHTML).toContain("test");
  });

  it("should render with properties", async () => {
    render(
      <GoAText
        as="h1"
        maxWidth="100px"
        size="heading-xl"
        color="secondary"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        Test
      </GoAText>,
    );

    const el = document.querySelector("goa-text");
    expect(el?.innerHTML).toContain("Test");
    expect(el?.getAttribute("maxwidth")).toBe("100px");
    expect(el?.getAttribute("size")).toBe("heading-xl");
    expect(el?.getAttribute("color")).toBe("secondary");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
