import {
  render,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/svelte";
import FocusTrapTestComponent from "./FocusTrapTestComponent.svelte";
import { it, describe } from "vitest";

// This test is blocked due to test slots being handling differently than web browser
// For details, please refer https://goa-dio.atlassian.net/browse/DDIDS-704
describe("Focus Trap Component", () => {
  it.skip("traps the tab key", async () => {
    const el = render(FocusTrapTestComponent);

    const userNameEl = el.queryByTestId("username");

    expect(userNameEl).toBeTruthy();
    userNameEl?.focus();
    const tabPressEvent = createEvent.keyDown(el.container, { key: "Tab" });

    await fireEvent(el.container, tabPressEvent);
    await fireEvent(el.container, tabPressEvent);
    await waitFor(() => {
      const emailEl = el.queryByTestId("email");
      // console.log(emailEl?.outerHTML)
      // console.log(document.activeElement?.outerHTML)
      expect(emailEl).toHaveFocus();
    });
  });
});
