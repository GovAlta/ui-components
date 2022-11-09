import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/svelte';
import GoANotification from './Notification.svelte'

describe('GoANotificationComponent', () => {

  ["important", "information", "emergency", "event"].forEach(type => {
    it(`renders the ${type} notification`, async () => {
      const { container } = render(GoANotification, { type: type });
      await waitFor(() => {
        expect(container.querySelector(`.${type}`)).toBeTruthy();
      })
    });
  });

  it("should not render when type is mispelled/invalid", async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    render(GoANotification, { type: "importantt" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  });
});
