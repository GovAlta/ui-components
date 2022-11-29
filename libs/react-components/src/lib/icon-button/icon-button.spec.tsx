import { render } from "@testing-library/react";
import { GoAIconButton } from "./icon-button";

describe("GoA IconButton", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoAIconButton icon="information" mt="s" mr="m" mb="l" ml="xl" />
    );
    const el = container.querySelector("goa-icon-button");

    expect(el.getAttribute("icon")).toBe("information");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });
});
