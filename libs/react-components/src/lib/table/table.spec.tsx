import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Table from "./table";

describe("Table", () => {

  it("should render successfully", () => {
    const { baseElement } = render(<Table />);
    expect(baseElement).toBeTruthy();
  });

  it("should call onSort when _sort event is triggered", () => {
    const onSort = vi.fn();
    const { baseElement } = render(<Table onSort={onSort} />);
    const table = baseElement.querySelector("goa-table");

    expect(table).toBeTruthy();
    table && fireEvent(
      table,
      new CustomEvent("_sort", {
        detail: { sortBy: "name", sortDir: 1 }
      })
    );

    expect(onSort).toHaveBeenCalledWith("name", 1);
  });

  it("should handle _sort event gracefully when no onSort prop is passed", () => {
    const { baseElement } = render(<Table testId="test-table-without-sort" />);
    const table = baseElement.querySelector("goa-table");

    expect(table).toBeTruthy();
    expect(() =>
      table && fireEvent(
        table,
        new CustomEvent("_sort", {
          detail: { sortBy: "age", sortDir: -1 }
        })
      )
    ).not.toThrow();
  });
});
