import { render } from "@testing-library/react";

import Pages from "./pages";

describe("Pages", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Pages current={1} ml="s" mr="m" mt="l" mb="xl" />
    );
    const el = baseElement.querySelector("goa-pages");
    expect(el?.getAttribute("current")).toBe("1");
    expect(el?.getAttribute("ml")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mt")).toBe("l");
    expect(el?.getAttribute("mb")).toBe("xl");
  });
});
