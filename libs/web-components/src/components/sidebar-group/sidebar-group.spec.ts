import SidebarGroup from './SidebarGroup.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(SidebarGroup)

  expect(getByText('Hello component!'));
})
