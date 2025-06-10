import { render } from "vitest-browser-react";

import { GoabTemporaryNotificationCtrl } from "../src";
import { expect, describe, it } from "vitest";

describe("Temporary Notification Controller", () => {
  describe("position", () => {
    it("should render with default positions", async function () {
      const Component = () => {
        return <GoabTemporaryNotificationCtrl testId="notification-ctrl" />;
      };

      const result = render(<Component />);
      const notCtrl = result.getByTestId("notification-ctrl");

      expect(notCtrl.element().getAttribute("vertical-position")).toEqual("bottom");
      expect(notCtrl.element().getAttribute("horizontal-position")).toEqual("center");
    });

    it("should render with custom positions", async function () {
      const Component = () => {
        return (
          <GoabTemporaryNotificationCtrl
            testId="notification-ctrl"
            verticalPosition="top"
            horizontalPosition="left"
          />
        );
      };

      const result = render(<Component />);
      const notCtrl = result.getByTestId("notification-ctrl");

      expect(notCtrl.element().getAttribute("vertical-position")).toEqual("top");
      expect(notCtrl.element().getAttribute("horizontal-position")).toEqual("left");
    });
  });

  it("should render with testId", async () => {
    const Component = () => {
      return <GoabTemporaryNotificationCtrl testId="custom-test-id" />;
    };

    const result = render(<Component />);
    const element = result.getByTestId("custom-test-id");

    expect(element).toBeDefined();
  });
});
