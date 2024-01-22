import Pagination from './Pagination.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'
import { it, describe, expect, vi } from "vitest";

describe("GoAPagination", () => {
  it("it renders all parts", async () => {
    const { getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100 })

    const pageSelector = getByTestId("page-selector");
    const pageLinks = getByTestId("page-links");

    // page number dropdown
    const dropdown = pageSelector.querySelector("goa-dropdown");
    expect(dropdown).toBeTruthy();
    expect(dropdown?.getAttribute("value")).toBe("1");

    const items = pageSelector.querySelectorAll('goa-dropdown-item');
    expect(items.length).toBe(10);
    for (let pageNumber = 1; pageNumber < 10; pageNumber++) {
      const item = pageSelector.querySelector(`goa-dropdown-item:nth-child(${pageNumber})`);
      expect(item).toBeTruthy();
      expect(item?.getAttribute("value")).toBe(`${pageNumber}`);
      expect(item?.getAttribute("label")).toBe(`${pageNumber}`);
    }

    const prev = pageLinks.querySelector("goa-button:first-child");
    const next = pageLinks.querySelector("goa-button:last-child");

    expect(prev?.getAttribute("type")).toBe("tertiary")
    expect(next?.getAttribute("type")).toBe("tertiary")
    expect(prev?.getAttribute("leadingicon")).toBe("arrow-back")
    expect(next?.getAttribute("trailingicon")).toBe("arrow-forward")
    expect(prev?.getAttribute("disabled")).toBe("true")
    expect(next?.getAttribute("disabled")).toBe("false")
  })

  it("handles the page dropdown select events", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 100 })
    const dropdown = container.querySelector("goa-dropdown");

    expect(dropdown).toBeTruthy();

    const fn = vi.fn();

    dropdown?.addEventListener("_change", fn);

    dropdown && await fireEvent(dropdown, new CustomEvent("_change", { detail: { page: 2 } }))
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    })
  })

  it("handles nav link click events", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 2, itemcount: 100 })

    const el = getByTestId("page-links")
    const links = [
      el.querySelector("goa-button:first-child"),
      el.querySelector("goa-button:last-child"),
    ]
    const fn = vi.fn();

    container.addEventListener("_change", fn);

    expect(links.length).toBe(2);
    for (const link of links) {
      expect(link).toBeTruthy();
      link && await fireEvent.click(link)
    }
    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    })
  })

  it("prevents the user from navigating to an out of bounds negative page number", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100 })

    const el = getByTestId("page-links")
    const prevLink = el.querySelector("goa-button:first-child");
    const fn = vi.fn();

    expect(prevLink).toBeTruthy();

    container.addEventListener("_change", fn);

    prevLink && await fireEvent.click(prevLink)
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    })
  })

  it("prevents the user from navigating to an out of bounds positive page number", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 10, itemcount: 100 })

    const el = getByTestId("page-links")
    const nextLink = el.querySelector("goa-button:last-child");
    const fn = vi.fn();

    expect(nextLink).toBeTruthy();

    container.addEventListener("_change", fn);

    nextLink && await fireEvent.click(nextLink)
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    })
  })

  it("validates the required params", async () => {
    const mock = vi.spyOn(console, "warn").mockImplementation(() => { });
    render(Pagination, {})

    await waitFor(() => {
      const calls: string[] = console.warn["mock"].calls.flat()
      expect(calls.find(msg => msg.includes("pagenumber"))).toBeTruthy()
      expect(calls.find(msg => msg.includes("itemcount"))).toBeTruthy()
    })
    mock.mockRestore();
  })

  it("validates the variant", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => { });
    render(Pagination, { pagenumber: 1, itemcount: 100, variant: "bad" })

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  })
})
