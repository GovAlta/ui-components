import { render } from '@testing-library/svelte'
import TableSortHeader from './TableSortHeader.svelte';
import { it, describe } from "vitest";

describe("GoATableSortHeader", () => {

  it('renders', async () => {
    const { container } = render(TableSortHeader)
    expect(container.querySelector("button")).toBeTruthy();
  })

  it('binds asc direction param', async () => {
    const direction = "asc";
    const { container } = render(TableSortHeader, { direction })
    const button = container.querySelector("button");
    const icon = container.querySelector("goa-icon");

    expect(button.classList.contains("asc"));
    expect(icon.getAttribute("type")).toBe("caret-up")
  })

  it('binds desc direction param', async () => {
    const direction = "desc";
    const { container } = render(TableSortHeader, { direction })
    const button = container.querySelector("button");
    const icon = container.querySelector("goa-icon");

    expect(button.classList.contains("desc"));
    expect(icon.getAttribute("type")).toBe("caret-down")
  })
})
