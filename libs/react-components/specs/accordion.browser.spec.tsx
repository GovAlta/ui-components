import { render } from "vitest-browser-react";
import { GoabAccordion, GoabButton } from "../src";

describe("Accordion", () => {
  it("should pass", () => {
    const result = render(
      <GoabAccordion heading="Heading" headingSize="medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        <GoabButton>This is a button</GoabButton>
      </GoabAccordion>
    )

    expect(result.baseElement.querySelector("goa-accordion")).toBeTruthy();
  })
})
