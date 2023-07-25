import SideMenuHeading from './SideMenuHeading.svelte';
import { render } from '@testing-library/svelte';

it("renders icon when prop is present", async () => {
  const { queryByTestId } = render(SideMenuHeading, { icon: "home" });
  const heading = queryByTestId("section-heading");

  expect(heading.classList).toContain("icon");
})