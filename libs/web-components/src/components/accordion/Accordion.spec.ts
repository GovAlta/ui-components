import Accordion from "./Accordion.svelte"
import AccordionWithHeadingContent from "./AccordionWithHeadingContentWrapper.test.svelte"
import { fireEvent, render, waitFor } from "@testing-library/svelte"
import { it, describe } from "vitest";

describe("Accordian", () => {
  it("renders", async () => {
    const { container } = render(Accordion, { heading: "Title", secondarytext: "sub title" });
    const heading = container.querySelector("summary .heading");
    const secondaryText = container.querySelector("summary .secondary-text");
    expect(heading).toBeTruthy();
    expect(heading?.innerHTML).toContain("Title");
    expect(secondaryText).toBeTruthy();
    expect(secondaryText?.innerHTML).toContain("sub title");
  })

  it("renders larger heading text", async () => {
    const { container } = render(Accordion, { heading: "Title", headingsize: "medium" });
    const heading = container.querySelector("summary .heading");
    expect(heading).toBeTruthy();
    expect(heading?.classList.contains("heading-medium"));
  })

  it("should expand the container when open prop is set", async () => {
    const { container } = render(Accordion, { heading: "Title", open: "true" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute("open")).not.toBeNull();
  })

  it("should not expand the container when open prop is not set", async () => {
    const { container } = render(Accordion, { heading: "Title" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute("open")).toBeNull();
  })

  // Although this test passes, it doesn't fail with the `position: relative` fix is removed.
  // This test will need to be moved to Cypress
  it.skip("should not expand the container if a clickable element within the header slot is clicked", async () => {
    const { container, queryByTestId } = render(AccordionWithHeadingContent);
    const button = queryByTestId("slot-button");
    const handler = vitest.fn();

    container.addEventListener("testClick", handler)

    expect(button).toBeTruthy();
    button && await fireEvent(button, new CustomEvent("_click"))

    await waitFor(() => {
      expect(handler).toBeCalled();
    })
  })
})
