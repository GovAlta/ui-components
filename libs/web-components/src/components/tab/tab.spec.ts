import { render } from "@testing-library/svelte";
import GoATab from "./Tab.svelte";
import { it, expect } from "vitest";

it('should render tabpanel when open is set', async () => {
  const result = render(GoATab, { heading: 'Title', open: true });
  expect(result.container.innerHTML).toContain("Title");
  expect(result.container.querySelector('div[role="tabpanel"]')).toBeTruthy();
});

it('should not render tabpanel when open is not true', async () => {
  const result = render(GoATab, { heading: 'Title' });
  expect(result.container.innerHTML).toContain("Title");
  expect(result.container.querySelector('div[role="tabpanel"]')).not.toBeTruthy();
});
