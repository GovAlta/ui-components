import '@testing-library/jest-dom';
import { render, cleanup, waitFor } from '@testing-library/svelte'
import Divider from './Divider.svelte'

afterEach(cleanup);

describe('Divider', () => {
  const sizes = {
    small: "1rem",
    medium: "2rem",
    large: "4rem",
    none: "0rem"
  };

  ["small", "medium", "large", "none"].forEach(spacing => {
    it(`renders the ${spacing} spacing`, async () => {
      const { container } = render(Divider, { spacing })
      const el = container.querySelector("hr");
      expect(el.getAttribute("style")).toEqual(`--spacing: ${sizes[spacing]};`);
    })
  })

  it("informs user of invalid size", async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    expect(console.error["mock"].calls.length).toBe(0);
    render(Divider, { spacing: "really-really-big" })

    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })

    mock.mockRestore();
  })

  it("renders small spacing if spacing is not set", async () => {
    const { container } = render(Divider)
    const el = container.querySelector("hr");
    expect(el.getAttribute("style")).toEqual(`--spacing: 1rem;`);
  })
})
