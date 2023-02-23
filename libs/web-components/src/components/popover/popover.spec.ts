import { render, fireEvent, waitFor } from '@testing-library/svelte';
import PopoverWrapper from './PopoverWrapper.test.svelte';
import Popover from './Popover.svelte';

it('should render', async () => {
  const { container } = render(PopoverWrapper, {content: "This is content", targetTrigger: "Clik Action"})
  expect(container.querySelector("[slot=content]").innerHTML).toContain("This is content");
  expect(container.querySelector("[slot=target]").innerHTML).toContain("Clik Action");
});

it('should open content when target is clicked', async () => {
  const result = render(Popover)
  const target = result.queryByTestId("popover-target");
  expect(result.queryByTestId("popover-content")).toBeNull();
  await fireEvent.click(target);
  expect(result.queryByTestId("popover-content")).toBeTruthy();
});

it('should close content when clicked outside the content container', async () => {
  const result = render(Popover)
  const target = result.queryByTestId("popover-target");
  await fireEvent.click(target);
  expect(result.queryByTestId("popover-content")).toBeTruthy();
  const background = result.queryByTestId("popover-background");
  await fireEvent.click(background);
  expect(result.queryByTestId("popover-content")).toBeNull();
});
