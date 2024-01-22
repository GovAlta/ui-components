import Details from './Details.svelte'
import { render } from '@testing-library/svelte'
import { it } from "vitest";

it('it works', async () => {
  const { container } = render(Details, { heading: "The title", open: true })

  const summary = container.querySelector("summary span")
  expect(summary?.innerHTML).toContain("The title");

  const details = container.querySelector("details");
  expect(details?.hasAttribute("open")).toBe(true);
})
