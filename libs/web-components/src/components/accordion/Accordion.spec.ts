import Accordion from "./Accordion.svelte";
import AccordionWithHeadingContent from "./AccordionWithHeadingContentWrapper.test.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { it, describe } from "vitest";

describe("Accordion", () => {
  it("renders", async () => {
    const { container } = render(Accordion, {
      heading: "Title",
      secondarytext: "sub title",
    });
    const heading = container.querySelector("summary .heading");
    const secondaryText = container.querySelector("summary .secondary-text");
    expect(heading).toBeTruthy();
    expect(heading?.innerHTML).toContain("Title");
    expect(secondaryText).toBeTruthy();
    expect(secondaryText?.innerHTML).toContain("sub title");
  });

  it("renders larger heading text", async () => {
    const { container } = render(Accordion, {
      heading: "Title",
      headingsize: "medium",
    });
    const heading = container.querySelector("summary .heading");
    expect(heading).toBeTruthy();
    expect(heading?.classList.contains("heading-medium"));
  });

  it("renders with max width", async () => {
    const { container } = render(Accordion, {
      heading: "Title",
      maxwidth: "480px",
      testid: "accordion",
    });
    const elm = container.querySelector("[data-testid=accordion]");
    expect(elm?.getAttribute("style")).toContain("max-width: 480px;");
  });

  it("should expand the container when open prop is set", async () => {
    const { container } = render(Accordion, { heading: "Title", open: "true" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute("open")).not.toBeNull();
  });

  it("should not expand the container when open prop is not set", async () => {
    const { container } = render(Accordion, { heading: "Title" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute("open")).toBeNull();
  });

  // Although this test passes, it doesn't fail with the `position: relative` fix is removed.
  // This test will need to be moved to Cypress
  it.skip("should not expand the container if a clickable element within the header slot is clicked", async () => {
    const { container, queryByTestId } = render(AccordionWithHeadingContent);
    const button = queryByTestId("slot-button");
    const handler = vitest.fn();

    container.addEventListener("testClick", handler);

    expect(button).toBeTruthy();
    button && (await fireEvent(button, new CustomEvent("_click")));

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it("handle accessibility features", async () => {
    const { container } = render(Accordion, {
      heading: "Title",
    });

    // Summary div accessibility's attributes
    const summary = container.querySelector("summary");
    expect(summary?.getAttribute("aria-expanded")).toBe("false");
    expect(summary?.getAttribute("aria-controls")).length.greaterThan(0);
    const accordionId = summary
      ?.getAttribute("aria-controls")
      ?.split("-content")[0]; // generate random id
    expect(summary?.getAttribute("aria-controls")).toBe(
      `${accordionId}-content`,
    );
    // Content div accessibility attributes
    const contentDiv = container.querySelector("div.content");
    expect(contentDiv?.getAttribute("id")).toBe(`${accordionId}-content`);
    expect(contentDiv?.getAttribute("role")).toBe("region");
    // announce by heading
    expect(contentDiv?.getAttribute("aria-labelledby")).toBe(
      `${accordionId}-heading`,
    );
    const title = container.querySelector("summary .title");
    expect(title?.getAttribute("id")).toBe(`${accordionId}-heading`);
  });

  it("emits the original event on _change detail when toggled", async () => {
    const { container } = render(Accordion, {
      heading: "Toggle heading",
      testid: "accordion",
    });

    const accordionRoot = container.querySelector(".goa-accordion");
    const summary = container.querySelector("summary");
    const changeEvents: CustomEvent[] = [];

    accordionRoot?.addEventListener("_change", (e: Event) => {
      changeEvents.push(e as CustomEvent);
    });

    summary && (await fireEvent.click(summary));

    await waitFor(() => {
      expect(changeEvents.length).toBeGreaterThan(0);
      const detail = changeEvents.at(-1)?.detail as
        | { event?: Event }
        | undefined;
      expect(detail?.event).toBeInstanceOf(Event);
    });
  });
});
