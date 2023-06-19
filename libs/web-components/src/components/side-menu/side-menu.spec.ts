import SideMenu from './SideMenu.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(SideMenu)

})
