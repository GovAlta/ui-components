import { render } from "@testing-library/react";
import GoabCard from "./card";

describe("GoAB Card", () => {
  it("should render properties", () => {
    const { container } = render(
      <GoabCard elevation={2} width="50ch" mt="s" mr="m" mb="l" ml="xl" />,
    );

    const el = container.querySelector("goa-card");

    expect(el?.getAttribute("elevation")).toBe("2");
    expect(el?.getAttribute("width")).toBe("50ch");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
