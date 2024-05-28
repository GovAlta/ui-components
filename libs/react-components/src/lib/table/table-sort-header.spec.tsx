import { render } from "@testing-library/react";
import GoABTableSortHeader from "./table-sort-header";

describe("GoABTableSortHeader", () => {
  it("renders", async () => {
    render(<GoABTableSortHeader />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el).toBeTruthy();
  });

  it("binds direction param", async () => {
    render(<GoABTableSortHeader direction="asc" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
  });
});
