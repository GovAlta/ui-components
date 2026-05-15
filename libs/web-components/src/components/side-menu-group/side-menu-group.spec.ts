import SideMenuGroup from "./SideMenuGroup.svelte";
import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { it } from "vitest";

it("clicking expands and collapses the group", async () => {
  const { queryByTestId, queryByRole } = render(SideMenuGroup, {
    heading: "Some group",
  });
  await tick(); // needed since there is a tick in the component
  const link = queryByRole("link");
  const group = queryByTestId("group");

  expect(link).toBeTruthy();
  expect(group).toBeTruthy();

  if (!link) return;

  expect(group?.classList).toContain("hidden");

  // open
  await fireEvent.click(link);
  await waitFor(() => {
    expect(group?.classList).not.toContain("hidden");
  });

  // close
  await fireEvent.click(link);
  await waitFor(() => {
    expect(group?.classList).toContain("hidden");
  });
});
