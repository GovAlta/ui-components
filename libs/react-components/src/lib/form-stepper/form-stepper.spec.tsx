import { render } from "@testing-library/react";

import FormStepper from "./form-stepper";

describe("FormStepper", () => {
  it("should render successfully", () => {
    const { container } = render(
      <FormStepper
        testId="form-test-id"
        step={2}
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />
    );

    const el = container.querySelector("goa-form-stepper");

    expect(el?.getAttribute("data-testid")).toBe("form-test-id");
    expect(el?.getAttribute("step")).toBe("2");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });
});
