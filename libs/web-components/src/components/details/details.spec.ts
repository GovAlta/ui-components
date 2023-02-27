import Details from './Details.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { container } = render(Details, { heading: "The title"})
  const summary = container.querySelector("summary span")
  expect(summary.innerHTML).toContain("The title");
})
