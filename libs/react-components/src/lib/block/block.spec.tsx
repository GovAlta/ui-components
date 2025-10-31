import { render } from "@testing-library/react";

import { GoabBlock } from "./block";

describe("Block", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<GoabBlock />);
    expect(baseElement).toBeTruthy();
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoabBlock
        gap="s"
        direction="row"
        alignment="center"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />,
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

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabBlock
        data-grid="cell"
      >
        Content
      </GoabBlock>,
    );
    const el = container.querySelector("goa-block");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
