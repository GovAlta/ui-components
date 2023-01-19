import Pagination from './Pagination.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'

describe("GoAPagination", () => {
  it("it renders all parts", async () => {
    const { getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100 })

    const pageSelector = getByTestId("page-selector");
    const pageLinks = getByTestId("page-links");

    // input
    const pageInput = pageSelector.querySelector("goa-input")
    expect(pageInput.getAttribute("type")).toBe("number")
    expect(pageInput.getAttribute("value")).toBe("1")
    expect(pageInput.getAttribute("debounce")).toBe("500")

    // links
    const prev = pageLinks.querySelector("goa-button:first-child");
    const next = pageLinks.querySelector("goa-button:last-child");
    expect(prev.getAttribute("type")).toBe("tertiary")
    expect(next.getAttribute("type")).toBe("tertiary")
    expect(prev.getAttribute("leadingicon")).toBe("arrow-back")
    expect(next.getAttribute("trailingicon")).toBe("arrow-forward")
    expect(prev.getAttribute("disabled")).toBe("true")
    expect(next.getAttribute("disabled")).toBe("false")
  })

  it("handles the page input events", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 100 })
    const pageInput = container.querySelector("goa-input")

    const fn = jest.fn();

    pageInput.addEventListener("_change", fn);

    await fireEvent(pageInput, new CustomEvent("_change", { detail: { page: 2 } }))
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
    const fn = jest.fn();

    container.addEventListener("_change", fn);

    for (const link of links) {
      await fireEvent.click(link)
    }
    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    })
  })

  it("prevents the user from navigating to an out of bounds negative page number", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100 })

    const el = getByTestId("page-links")
    const prevLink = el.querySelector("goa-button:first-child");
    const fn = jest.fn();

    container.addEventListener("_change", fn);

    await fireEvent.click(prevLink)
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    })
  })

  it("prevents the user from navigating to an out of bounds positive page number", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 10, itemcount: 100 })

    const el = getByTestId("page-links")
    const nextLink = el.querySelector("goa-button:last-child");
    const fn = jest.fn();

    container.addEventListener("_change", fn);

    await fireEvent.click(nextLink)
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    })
  })

  it("does not fire an event for a non-numeric page number", async () => {
    const { container } = render(Pagination, { pagenumber: 1, itemcount: 100 })
    const input = container.querySelector("goa-input");
    const fn = jest.fn();

    container.addEventListener("_change", fn);

    // await fireEvent.keyUp(input, { target: { value: 2 }})
    await fireEvent(input, new CustomEvent("_change", { detail: { page: "2abc" } }))
    await waitFor(() => {
      expect(fn).not.toBeCalled();
    })
  })

  it("validates the required params", async () => {
    const mock = jest.spyOn(console, "warn").mockImplementation();
    render(Pagination, { })

    await waitFor(() => {
      const calls: string[] = console.warn["mock"].calls.flat()
      expect(calls.find(msg => msg.includes("pagenumber"))).toBeTruthy()
      expect(calls.find(msg => msg.includes("itemcount"))).toBeTruthy()
    })
    mock.mockRestore();
  })

  it("validates the variant", async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    render(Pagination, { pagenumber: 1, itemcount: 100, variant: "bad" })

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  })
})
