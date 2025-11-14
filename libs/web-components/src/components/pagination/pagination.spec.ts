import Pagination from "./Pagination.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { it, describe, expect, vi } from "vitest";

describe("GoAPagination", () => {
  it("it renders all parts", async () => {
    const { getByTestId } = render(Pagination, {
      pagenumber: 1,
      itemcount: 100,
    });

    const pageSelector = getByTestId("page-selector");
    const pageLinks = getByTestId("page-links");

    // page number dropdown
    const dropdown = pageSelector.querySelector("goa-dropdown");
    expect(dropdown).toBeTruthy();
    expect(dropdown?.getAttribute("value")).toBe("1");

    const items = pageSelector.querySelectorAll("goa-dropdown-item");
    expect(items.length).toBe(10);
    for (let pageNumber = 1; pageNumber < 10; pageNumber++) {
      const item = pageSelector.querySelector(
        `goa-dropdown-item:nth-child(${pageNumber})`,
      );
      expect(item).toBeTruthy();
      expect(item?.getAttribute("value")).toBe(`${pageNumber}`);
      expect(item?.getAttribute("label")).toBe(`${pageNumber}`);
    }

    const prev = pageLinks.querySelector("goa-button:first-child");
    const next = pageLinks.querySelector("goa-button:last-child");

    expect(prev?.getAttribute("type")).toBe("tertiary");
    expect(next?.getAttribute("type")).toBe("tertiary");
    expect(prev?.getAttribute("leadingicon")).toBe("arrow-back");
    expect(next?.getAttribute("trailingicon")).toBe("arrow-forward");
    expect(prev?.getAttribute("disabled")).toBe("true");
    expect(next?.getAttribute("disabled")).toBe("false");
  });

  it("handles the page dropdown select events", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 100 });
    const dropdown = container.querySelector("goa-dropdown");

    expect(dropdown).toBeTruthy();

    const fn = vi.fn();

    dropdown?.addEventListener("_change", fn);

    dropdown &&
      (await fireEvent(
        dropdown,
        new CustomEvent("_change", { detail: { page: 2 } }),
      ));
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
  });

  it("handles nav link click events", async () => {
    const { container, getByTestId } = render(Pagination, {
      pagenumber: 2,
      itemcount: 100,
    });

    const el = getByTestId("page-links");
    const links = [
      el.querySelector("goa-button:first-child"),
      el.querySelector("goa-button:last-child"),
    ];
    const fn = vi.fn();

    container.addEventListener("_change", fn);

    expect(links.length).toBe(2);
    for (const link of links) {
      expect(link).toBeTruthy();
      link && (await fireEvent.click(link));
    }
    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it("prevents the user from navigating to an out of bounds negative page number", async () => {
    const { container, getByTestId } = render(Pagination, {
      pagenumber: 1,
      itemcount: 100,
    });

    const el = getByTestId("page-links");
    const prevLink = el.querySelector("goa-button:first-child");
    const fn = vi.fn();

    expect(prevLink).toBeTruthy();

    container.addEventListener("_change", fn);

    prevLink && (await fireEvent.click(prevLink));
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });
  });

  it("prevents the user from navigating to an out of bounds positive page number", async () => {
    const { container, getByTestId } = render(Pagination, {
      pagenumber: 10,
      itemcount: 100,
    });

    const el = getByTestId("page-links");
    const nextLink = el.querySelector("goa-button:last-child");
    const fn = vi.fn();

    expect(nextLink).toBeTruthy();

    container.addEventListener("_change", fn);

    nextLink && (await fireEvent.click(nextLink));
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });
  });

  it("validates the required params", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => {
      /* do nothing */
    });
    render(Pagination, {});

    await waitFor(() => {
      const calls: string[] = console.warn["mock"].calls.flat();
      expect(calls.find((msg) => msg.includes("pagenumber"))).toBeTruthy();
      expect(calls.find((msg) => msg.includes("itemcount"))).toBeTruthy();
    });
    mock.mockRestore();
  });

  it("validates the variant", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => {
      /* do nothing */
    });
    render(Pagination, { pagenumber: 1, itemcount: 100, variant: "bad" });

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    });
    mock.mockRestore();
  });

  it("fires the change event only once when page number is changed", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 100 });

    const dropdown = container.querySelector("goa-dropdown");
    expect(dropdown).toBeTruthy();

    const changeSpy = vi.fn();
    container.addEventListener("_change", changeSpy);

    dropdown &&
      (await fireEvent(
        dropdown,
        new CustomEvent("_change", {
          bubbles: true,
          composed: true,
          detail: { value: "3" },
        }),
      ));

    // Wait and verify the event is fired exactly once
    await waitFor(() => {
      expect(changeSpy).toHaveBeenCalledTimes(1);
      // Verify the correct page was passed
      expect(changeSpy.mock.calls[0][0].detail.page).toBe(3);
    });

    // Fire a second event to ensure it's still handled properly
    dropdown &&
      (await fireEvent(
        dropdown,
        new CustomEvent("_change", {
          bubbles: true,
          composed: true,
          detail: { value: "5" },
        }),
      ));

    // Verify one more time
    await waitFor(() => {
      expect(changeSpy).toHaveBeenCalledTimes(2);
      expect(changeSpy.mock.calls[1][0].detail.page).toBe(5);
    });
  });

  it("shows 'page 1 of 1' when there are no records", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 0 });

    const pageSelector = container.querySelector(
      "[data-testid='page-selector']",
    );
    expect(pageSelector).toBeTruthy();

    // Check the dropdown has value="1"
    const dropdown = pageSelector?.querySelector("goa-dropdown");
    expect(dropdown).toBeTruthy();
    expect(dropdown?.getAttribute("value")).toBe("1");

    const dropdownItem = pageSelector?.querySelector("goa-dropdown-item");
    expect(dropdownItem?.getAttribute("value")).toBe("1");
    expect(dropdownItem?.getAttribute("label")).toBe("1");

    // Verify the "of 1" text is displayed
    const textElements = Array.from(
      pageSelector?.querySelectorAll("span") || [],
    );
    const ofText = textElements.find((el) => el.textContent?.includes("of 1"));
    expect(ofText).toBeTruthy();
  });

  it("includes the DOM event in _change detail when navigating", async () => {
    const { container, getByTestId } = render(Pagination, {
      pagenumber: 1,
      itemcount: 100,
    });

    let capturedEvent: CustomEvent | undefined;
    container.addEventListener("_change", (e: Event) => {
      capturedEvent = e as CustomEvent;
    });

    const pageLinks = getByTestId("page-links");
    const nextButton = pageLinks.querySelector("goa-button:last-child");
    nextButton && (await fireEvent.click(nextButton));

    await waitFor(() => {
      expect(capturedEvent).toBeDefined();
      const detail = capturedEvent?.detail as
        | { event?: Event; page?: number }
        | undefined;
      expect(detail?.page).toBe(2);
      expect(detail?.event).toBeInstanceOf(Event);
    });
  });
});
