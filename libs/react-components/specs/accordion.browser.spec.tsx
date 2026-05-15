import { render } from "vitest-browser-react";
import { GoabAccordion, GoabButton } from "../src";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";

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
    const accordionChangeSpy = vi.fn();

    const Component = () => {
      return (
        <GoabAccordion
          heading="Heading"
          headingSize="medium"
          headingContent={
            <GoabButton testId="heading-button" onClick={handleClick}>
              This is a button
            </GoabButton>
          }
          onChange={accordionChangeSpy}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi
        </GoabAccordion>
      );
    };

    const result = render(<Component />);
    const button = result.getByTestId("heading-button");
    await userEvent.click(button);

    await vi.waitFor(() => {
      expect(accordionChangeSpy).not.toHaveBeenCalled();
    });
  });

  it("should set the aria-expanded attribute on the heading element", async () => {
    const Component = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <GoabButton testId="openButton" onClick={() => setOpen(true)}>
            This button opens the Accordion
          </GoabButton>
          <GoabButton testId="closeButton" onClick={() => setOpen(false)}>
            This button closes the Accordion
          </GoabButton>
          <GoabAccordion
            testId="testAccordion"
            heading="Heading"
            headingSize="medium"
            open={open}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi
          </GoabAccordion>
        </>
      );
    };

    const result = render(<Component />);
    const openButton = result.getByTestId("openButton");
    const closeButton = result.getByTestId("closeButton");
    const summary = result.getByTestId("testAccordion-summary");

    await vi.waitFor(() => {
      expect(summary).toHaveAttribute("aria-expanded", "false");
    });

    await openButton.click();

    await vi.waitFor(() => {
      expect(summary).toHaveAttribute("aria-expanded", "true");
    });

    await closeButton.click();

    await vi.waitFor(() => {
      expect(summary).toHaveAttribute("aria-expanded", "false");
    });

    await openButton.click();

    await vi.waitFor(() => {
      expect(summary).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("should not expand the accordion when a button in the actions slot is clicked", async () => {
    const accordionChangeSpy = vi.fn();

    const Component = () => {
      return (
        <GoabAccordion
          heading="Heading"
          testId="testAccordion"
          actions={
            <GoabButton testId="actions-button">Action</GoabButton>
          }
          onChange={accordionChangeSpy}
        >
          Accordion content
        </GoabAccordion>
      );
    };

    const result = render(<Component />);
    const button = result.getByTestId("actions-button");
    await userEvent.click(button);

    await vi.waitFor(() => {
      expect(accordionChangeSpy).not.toHaveBeenCalled();
    });
  });

  it("should fire the actions button onClick when the actions button is clicked", async () => {
    const handleClick = vi.fn();

    const Component = () => {
      return (
        <GoabAccordion
          heading="Heading"
          testId="testAccordion"
          actions={
            <GoabButton testId="actions-button" onClick={handleClick}>Action</GoabButton>
          }
        >
          Accordion content
        </GoabAccordion>
      );
    };

    const result = render(<Component />);
    const button = result.getByTestId("actions-button");
    await userEvent.click(button);

    await vi.waitFor(() => {
      expect(handleClick).toHaveBeenCalled();
    });
  });

  it("should set the open attribute on the details element", async () => {
    const Component = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <GoabButton testId="openButton" onClick={() => setOpen(true)}>
            This button opens the Accordion
          </GoabButton>
          <GoabButton testId="closeButton" onClick={() => setOpen(false)}>
            This button closes the Accordion
          </GoabButton>
          <GoabAccordion
            testId="testAccordion"
            heading="Heading"
            headingSize="medium"
            open={open}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi
          </GoabAccordion>
        </>
      );
    };

    const result = render(<Component />);
    const openButton = result.getByTestId("openButton");
    const closeButton = result.getByTestId("closeButton");
    const details = result.getByTestId("testAccordion-details");

    await vi.waitFor(() => {
      expect(details).not.toHaveAttribute("open");
    });

    await openButton.click();

    await vi.waitFor(() => {
      expect(details).toHaveAttribute("open");
    });

    await closeButton.click();

    await vi.waitFor(() => {
      expect(details).not.toHaveAttribute("open");
    });

    await openButton.click();

    await vi.waitFor(() => {
      expect(details).toHaveAttribute("open");
    });
  });
});
