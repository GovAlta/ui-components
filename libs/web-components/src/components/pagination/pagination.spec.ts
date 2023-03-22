import Pagination from './Pagination.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'

describe("GoAPagination", () => {
  it("it renders all parts", async () => {
    const { getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100, perpagecount: "10, 20" })

    const pageSelector = getByTestId("page-selector");
    const itemCountSelector = getByTestId("item-count-selector");
    const pageLinks = getByTestId("page-links");

    // input
    const pageInput = pageSelector.querySelector("goa-input")
    expect(pageInput.getAttribute("type")).toBe("number")
    expect(pageInput.getAttribute("value")).toBe("1")
    expect(pageInput.getAttribute("debounce")).toBe("500")

    //item count dropdown
    const itemCount = itemCountSelector.querySelector("goa-dropdown");
    expect(itemCount.getAttribute("value")).toBe("10")
    expect(itemCount.getAttribute("width")).toBe("8ch")
    const itemCountOptions = itemCount.querySelectorAll("goa-dropdown-item");
    expect(itemCountOptions.length).toBe(2);
    expect(itemCountOptions[0].getAttribute("value")).toBe("10");
    expect(itemCountOptions[1].getAttribute("value")).toBe("20");

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

  it("should handle the item count change event", async () => {
    const { container, getByTestId } = render(Pagination, { pagenumber: 1, itemcount: 100, perpagecount: "10, 20" })
    const itemCountSelector = getByTestId("item-count-selector");
    const itemCount = itemCountSelector.querySelector("goa-dropdown");
    const totalPageCount = getByTestId("page-selector");

    const fn = jest.fn(() => {});

    container.addEventListener("_changeItemCount", fn);
    await waitFor(async () => {
      await fireEvent(itemCount, new CustomEvent("_change", { detail: { value: 20 } }))
      expect(fn).toBeCalledTimes(1);
      // total page count should be 5 when item count is 20
      expect(totalPageCount.innerHTML).toContain("of 5");
    });
  });
})
