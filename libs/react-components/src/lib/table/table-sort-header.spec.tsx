import { render } from "@testing-library/react";
import GoabTableSortHeader from "./table-sort-header";

describe("GoabTableSortHeader", () => {
  it("renders", async () => {
    render(<GoabTableSortHeader />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el).toBeTruthy();
  });

  it("binds direction param", async () => {
    render(<GoabTableSortHeader direction="asc" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
  });

  it("should pass data-grid attributes", () => {
    render(<GoabTableSortHeader data-grid="cell" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
