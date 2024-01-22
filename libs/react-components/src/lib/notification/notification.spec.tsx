import { render } from "@testing-library/react";
import GoANotification, { NotificationType } from "./notification";
import { fireEvent } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";

describe("Notification Banner", () => {
  describe("type", () => {
    (["important", "information", "emergency", "event"] as const).forEach(
      (type: NotificationType) => {
        it(`should render ${type} notification`, async function() {
          render(
            <GoANotification type={type}>
              Information to the user goes in the content
            </GoANotification>
          );
          const el = document.querySelector("goa-notification");
          expect(el?.getAttribute("type")).toEqual(type);
        });
      }
    );
  });

  it("Event triggered on notification banner dismiss", async () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <GoANotification type="information" onDismiss={onDismiss}>
        Information to the user goes in the content
      </GoANotification>
    );
    const notificationBanner = container.querySelector("goa-notification");
    notificationBanner && fireEvent(notificationBanner, new CustomEvent("_dismiss"));
    expect(onDismiss).toBeCalled();
  });

  it("should render notification banner with ariaLive", async () => {
    render(
      <GoANotification type="information" ariaLive="assertive">
        Information to the user goes in the content
      </GoANotification>
    );
    const el = document.querySelector("goa-notification");
    expect(el?.getAttribute("ariaLive")).toEqual("assertive");
  });
});
