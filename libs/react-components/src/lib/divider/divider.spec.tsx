import { render } from "@testing-library/react";

import GoADivider from "./divider";

describe("Divider", () => {
  it("should render successfully", () => {
    const { container } = render(<GoADivider mt="s" mr="m" mb="l" ml="xl" />);

    const el = container.querySelector("goa-divider");

    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
