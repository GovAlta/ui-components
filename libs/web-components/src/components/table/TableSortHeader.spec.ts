import { render } from '@testing-library/svelte'
import TableSortHeader from './TableSortHeader.svelte';

describe("GoATableSortHeader", () => {

  it('renders', async () => {
    const { container } = render(TableSortHeader)
    expect(container.querySelector("button")).toBeTruthy();
  })

  it('binds direction param', async () => {
    const direction = "asc";
    const { container } = render(TableSortHeader, { direction })
    const button = container.querySelector("button");
    const img = container.querySelector("img");

    expect(button.classList.contains("asc"));
    expect(img.getAttribute("alt")).toBe("asc");
  })
})
