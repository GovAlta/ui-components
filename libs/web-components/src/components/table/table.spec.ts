import TableWrapper from './TableWrapper.test.svelte'
import { render } from '@testing-library/svelte'
import Table from './Table.svelte';
import { it, describe } from "vitest";

describe("GoATable", () => {

  const columnTitles = ["First Name", "Last Name", "Age"];
  const data = [
    ["John", "Smith", 39],
    ["Jim", "Brown", 29],
    ["Jacob", "Green", 49],
    ["James", "White", 32],
  ];

  it('renders', async () => {
    const { container } = render(TableWrapper, { columnTitles, data })
    expect(container.querySelectorAll("tbody tr")).toHaveLength(4);
  })

  it('binds all params', async () => {
    const width = "100%";
    const stickyheader = "true";
    const variant = "relaxed";
    const { container } = render(Table, { width, stickyheader, variant })
    const table = container.querySelector("table");
    const style = table.getAttribute("style");
    expect(style).toContain("width: 100%");
    expect(table.classList.contains("sticky"));
    expect(table.classList.contains(variant));
  })
})
