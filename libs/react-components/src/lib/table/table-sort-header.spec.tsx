import { render } from "@testing-library/react";
import ABGovTableSortHeader from "./table-sort-header";

describe("ABGovTableSortHeader", () => {
  it("renders", async () => {
    render(<ABGovTableSortHeader />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el).toBeTruthy();
  });

  it("binds direction param", async () => {
    render(<ABGovTableSortHeader direction="asc" />);
    const el = document.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
  });
});
