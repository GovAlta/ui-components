import { render, cleanup, waitFor } from '@testing-library/svelte'
import PageBlock from './PageBlock.svelte'
import { it, describe } from "vitest";

afterEach(cleanup);

describe('PageBlock', () => {
  it("informs user of invalid width", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => { /* do nothing */ });
    expect(console.error["mock"].calls.length).toBe(0);
    render(PageBlock, { width: "200miles" })

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })

    mock.mockRestore();
  })
})
