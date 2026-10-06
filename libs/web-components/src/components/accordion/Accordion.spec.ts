import Accordion from "./Accordion.svelte";
import AccordionWithActions from "./AccordionWithActionsWrapper.test.svelte";
import { render } from "@testing-library/svelte";
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
    const { container, queryByRole } = render(Accordion, { heading: "Title" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute("open")).toBeNull();
    expect(queryByRole("alert")).toBeNull();
  });

  it("announces the content when expanded", async () => {
    vitest.useFakeTimers();

    try {
      const { getByRole, queryByRole } = render(Accordion, {
        heading: "Title",
        open: "true",
      });

      await vitest.advanceTimersByTimeAsync(99);
      expect(queryByRole("alert")).toBeNull();

      await vitest.advanceTimersByTimeAsync(1);
      expect(getByRole("alert")).toBeInTheDocument();
    } finally {
      vitest.useRealTimers();
    }
  });

  it("does not render the actions slot container when actions slot is empty", async () => {
    const { container } = render(Accordion, { heading: "Title" });
    const actionsDiv = container.querySelector("summary .actions");
    expect(actionsDiv).toBeNull();
  });

  it("renders the actions slot container when actions slot content exists", async () => {
    const { queryByTestId } = render(AccordionWithActions);
    const actionsButton = queryByTestId("actions-button");
    expect(actionsButton).toBeTruthy();
  });

  it("does not render the heading content container when the heading content slot is empty", () => {
    const { container } = render(Accordion, { heading: "Title" });
    const headingContent = container.querySelector("summary .heading-content");
    expect(headingContent).toBeNull();
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
});
