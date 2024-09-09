import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Pagination from "./pagination";
import { GoabPaginationOnChangeDetail } from "@abgov/ui-components-common";

describe("Pagination", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <Pagination
        onChange={() => { /* do nothing */ }}
        pageNumber={1}
        itemCount={100}
        perPageCount={20}
        variant="all"
        mt="s"
        mb="m"
        ml="l"
        mr="xl"
      />
    );

    const el = baseElement.querySelector("goa-pagination");

    expect(el?.getAttribute("pagenumber")).toBe("1");
    expect(el?.getAttribute("itemcount")).toBe("100");
    expect(el?.getAttribute("perpagecount")).toBe("20");
    expect(el?.getAttribute("variant")).toBe("all");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mb")).toBe("m");
    expect(el?.getAttribute("ml")).toBe("l");
    expect(el?.getAttribute("mr")).toBe("xl");
  });

  it("should handle the onChange event", async () => {
    const fn = vi.fn();

    const { baseElement } = render(
      <Pagination onChange={fn} pageNumber={1} itemCount={100} />
    );
    const detail: GoabPaginationOnChangeDetail = { page: 2 };

    const el = baseElement.querySelector("goa-pagination");
    el && fireEvent(el, new CustomEvent("_change", { detail: detail }));

    await waitFor(() => {
      expect(fn).toBeCalledWith(detail);
    });
  });
});
