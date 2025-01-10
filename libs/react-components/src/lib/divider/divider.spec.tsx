import { render } from "@testing-library/react";

import GoabDivider from "./divider";

describe("Divider", () => {
  it("should render successfully", () => {
    const { container } = render(<GoabDivider mt="s" mr="m" mb="l" ml="xl" />);

    const el = container.querySelector("goa-divider");

    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
