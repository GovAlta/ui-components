import Sidebar from './Sidebar.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(Sidebar)

  expect(getByText('Hello component!'));
})
