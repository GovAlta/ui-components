import { render } from "@testing-library/react";
import GoATableSortHeader from "./table-sort-header";

describe("GoATableSortHeader", () => {
  it("renders", async () => {
    render(<GoATableSortHeader />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el).toBeTruthy();
  });

  it("binds direction param", async () => {
    render(<GoATableSortHeader direction="asc" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
  });
});
