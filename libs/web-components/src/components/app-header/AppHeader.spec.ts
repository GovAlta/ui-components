import AppHeader from './AppHeader.svelte';
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(AppHeader, {title: 'Test App Header', url: 'http://nothing.com'});

  //expect(getByText('Hello component!'));
})