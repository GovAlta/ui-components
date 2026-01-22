import { render } from "@testing-library/react";
import GoabxTableSortHeader from "./table-sort-header";

describe("GoabxTableSortHeader", () => {
  it("renders", async () => {
    render(<GoabxTableSortHeader />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el).toBeTruthy();
  });

  it("binds direction param", async () => {
    render(<GoabxTableSortHeader direction="asc" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
  });

  it("should pass data-grid attributes", () => {
    render(<GoabxTableSortHeader data-grid="cell" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
