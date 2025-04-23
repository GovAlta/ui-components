import { render } from "vitest-browser-react";
import { GoabAccordion, GoabButton } from "../src";
import { useState } from "react";
import { vi } from "vitest";

describe("Accordion", () => {
  it("should pass", async () => {
    const ButtonAccordion = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <GoabButton testId="open-button" onClick={() => setOpen(true)}>
            This is a button
          </GoabButton>
          <GoabAccordion heading="Heading" headingSize="medium" open={open}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi
            <GoabButton testId="my-button" onClick={() => console.log("foobar")}>
              This is a button
            </GoabButton>
          </GoabAccordion>
        </>
      );
    };

    const result = render(<ButtonAccordion />);
    const button = result.getByTestId("open-button");
    await button.click();
    const myButton = result.getByTestId("my-button");
    expect(myButton).toBeTruthy();
  });

  it("should not expand the accordion if a clickable element exists within the header slot", async () => {
    const handleClick = vi.fn();
    const spy = vi.fn();

    const Component = () => {
      return (
        <>
          <GoabAccordion
            heading="Heading"
            headingSize="medium"
            headingContent={
              <GoabButton testId="heading-button" onClick={() => handleClick}>
                This is a button
              </GoabButton>
            }
            onChange={spy}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dol;ore ma;gna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi
          </GoabAccordion>
        </>
      );
    };

    const result = render(<Component />);
    const button = result.getByTestId("heading-button");
    await button.click();

    expect(spy).not.toHaveBeenCalled();
  });
})
