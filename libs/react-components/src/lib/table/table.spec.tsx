import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import GoabTable from "./table";
import { GoabTableOnSortDetail } from "@abgov/ui-components-common";

describe("GoabTable", () => {
  it("should render", () => {
    const { baseElement } = render(<GoabTable />);

    const table = baseElement.querySelector("goa-table");
    expect(table?.getAttribute("stickyHeader")).toBeNull();
  });

  it("should render with properties", () => {
    const { baseElement } = render(<GoabTable striped sortMode="multi" />);

    const table = baseElement.querySelector("goa-table");
    expect(table?.getAttribute("striped")).toBe("true");
    expect(table?.getAttribute("sort-mode")).toBe("multi");
  });

  it("should call onSort when _sort event is triggered", () => {
    const onSort = vi.fn();
    const { baseElement } = render(<GoabTable onSort={onSort} />);

    const table = baseElement.querySelector("goa-table");
    const detail: GoabTableOnSortDetail = { sortBy: "name", sortDir: 1 };
    expect(table).toBeTruthy();

    table && fireEvent(table, new CustomEvent("_sort", { detail }));
    expect(onSort).toHaveBeenCalledWith(detail);
  });

  it("should handle _sort event gracefully when no onSort prop is passed", () => {
    const { baseElement } = render(<GoabTable testId="test-table-without-sort" />);
    const table = baseElement.querySelector("goa-table");

    expect(table).toBeTruthy();
    expect(
      () =>
        table &&
        fireEvent(
          table,
          new CustomEvent("_sort", { detail: { sortBy: "age", sortDir: -1 } }),
        ),
    ).not.toThrow();
  });
});
