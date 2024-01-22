import { render } from "@testing-library/react";

import { GoABlock } from "./block";

describe("Block", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoABlock />);
    expect(baseElement).toBeTruthy();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoABlock
        gap="s"
        direction="row"
        alignment="center"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />
    );
    const el = container.querySelector("goa-block");

    expect(el?.getAttribute("gap")).toBe("s");
    expect(el?.getAttribute("direction")).toBe("row");
    expect(el?.getAttribute("alignment")).toBe("center");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
