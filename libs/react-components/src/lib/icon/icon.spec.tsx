import { render } from "@testing-library/react";
import { GoAIcon } from "./icon";

describe("GoA Icon", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoAIcon type="information" mt="s" mr="m" mb="l" ml="xl" />
    );
    const el = container.querySelector("goa-icon");

    expect(el?.getAttribute("type")).toBe("information");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
