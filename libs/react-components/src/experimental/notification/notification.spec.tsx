import { render } from "@testing-library/react";
import GoabxNotification from "./notification";
import { fireEvent } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";
import { GoabNotificationType } from "@abgov/ui-components-common";

describe("GoabxNotification", () => {
  describe("type", () => {
    (["important", "information", "emergency", "event"] as const).forEach(
      (type: GoabNotificationType) => {
        it(`should render ${type} notification`, async function () {
          render(
            <GoabxNotification type={type}>
              Information to the user goes in the content
            </GoabxNotification>,
          );
          const el = document.querySelector("goa-notification");
          expect(el?.getAttribute("type")).toEqual(type);
        });
      },
    );
  });

  it("Event triggered on notification banner dismiss", async () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <GoabxNotification type="information" onDismiss={onDismiss}>
        Information to the user goes in the content
      </GoabxNotification>,
    );
    const notificationBanner = container.querySelector("goa-notification");
    notificationBanner && fireEvent(notificationBanner, new CustomEvent("_dismiss"));
    expect(onDismiss).toBeCalled();
  });

  it("should render notification banner with ariaLive", async () => {
    render(
      <GoabxNotification type="information" ariaLive="assertive">
        Information to the user goes in the content
      </GoabxNotification>,
    );
    const el = document.querySelector("goa-notification");
    expect(el?.getAttribute("ariaLive")).toEqual("assertive");
  });

  it("should render notification banner with emphasis and compact", async () => {
    render(
      <GoabxNotification type="information" emphasis="low" compact>
        Information to the user goes in the content
      </GoabxNotification>,
    );
    const el = document.querySelector("goa-notification");
    expect(el?.getAttribute("emphasis")).toEqual("low");
    expect(el?.getAttribute("compact")).toEqual("true");
  });
});
