import "@testing-library/jest-dom";
import {
  render,
  cleanup,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/svelte";
import FocusTrapTestComponent from "./FocusTrapTestComponent.svelte";

afterEach(cleanup);

// This test is blocked due to JEST handling slot elements differently than web browser
// For details, please refer https://goa-dio.atlassian.net/browse/DDIDS-704
describe("Focus Trap Component", () => {
  it.skip("traps the tab key", async () => {
    const el = render(FocusTrapTestComponent);

    const userNameEl = el.queryByTestId("username");
    const emailEl = el.queryByTestId("email");
    userNameEl.focus();
    const tabPressEvent = createEvent.keyDown(el.container, { key: "Tab" });

    fireEvent(el.container, tabPressEvent);
    await waitFor(() => {
      expect(emailEl).toHaveFocus();
    });
  });
});
