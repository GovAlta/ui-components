import { render, waitFor, fireEvent } from '@testing-library/svelte';
import GoANotification from './Notification.svelte'
import { describe, it, expect, vi } from "vitest";

describe('GoANotificationComponent', () => {

  ["important", "information", "emergency", "event"].forEach(type => {
    it(`renders the ${type} notification`, async () => {
      const { container } = render(GoANotification, { type: type });
      await waitFor(() => {
        expect(container.querySelector(`.${type}`)).toBeTruthy();
        const notificationDiv = container.querySelector(".content-container");
        expect(notificationDiv).toBeTruthy();
        expect(notificationDiv).toHaveAttribute("role", "alert");
        expect(notificationDiv).toHaveAttribute("aria-live", "polite");
        expect(notificationDiv).toHaveAttribute("aria-atomic", "true");
      });
    });
  });

  it("should not render when type is mispelled/invalid", async () => {
    const mock = vi.spyOn(console, "error").mockImplementation(() => { });
    render(GoANotification, { type: "importantt" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  });

  it("Event triggered on notification banner dismiss", async () => {
    const onDismiss = vi.fn();
    const { container } = render(GoANotification, { type: "information" });
    const closeIcon = container.querySelector(".close button");
    closeIcon.addEventListener("_dismiss", onDismiss);
    await fireEvent.click(closeIcon);
    expect(onDismiss).toBeCalled();
  });
});
