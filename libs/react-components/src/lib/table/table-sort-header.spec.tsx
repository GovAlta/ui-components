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

  it("should render sort-order attribute", () => {
    render(<GoabTableSortHeader name="salary" direction="desc" sortOrder={2} />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("sort-order")).toBe("2");
    expect(el?.getAttribute("name")).toBe("salary");
    expect(el?.getAttribute("direction")).toBe("desc");
  });
});
