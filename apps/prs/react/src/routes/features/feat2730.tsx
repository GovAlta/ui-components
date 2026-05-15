import { useState, useEffect } from "react";
import {
  GoabButton,
  GoabBlock,
  GoabText,
  GoabFormItem,
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
  GoabTemporaryNotificationCtrl,
} from "@abgov/react-components";
import {
  TemporaryNotification,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

export function Feat2730Route() {
  // Controller positioning
  const [verticalPosition, setVerticalPosition] = useState<"top" | "bottom">("bottom");
  const [horizontalPosition, setHorizontalPosition] = useState<
    "left" | "center" | "right"
  >("center");

  // Notification settings
  const [message, setMessage] = useState("This is a test notification message");
  const [notificationType, setNotificationType] = useState<
    "basic" | "success" | "failure" | "indeterminate" | "progress"
  >("basic");
  const [duration, setDuration] = useState(4000);
  const [actionText, setActionText] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  // Progress simulation
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [currentProgressUuid, setCurrentProgressUuid] = useState("");

  // Test results
  const [lastNotificationUuid, setLastNotificationUuid] = useState("");
  const [notificationHistory, setNotificationHistory] = useState<
    Array<{
      uuid: string;
      message: string;
      type: string;
      timestamp: Date;
    }>
  >([]);

  useEffect(() => {
    // Initialize with a welcome message
    showWelcomeNotification();
  }, []);

  // Utility function to track notifications
  const trackNotification = (uuid: string, message: string, type: string) => {
    setLastNotificationUuid(uuid);
    setNotificationHistory((prev) => {
      const newHistory = [
        {
          uuid,
          message,
          type,
          timestamp: new Date(),
        },
        ...prev,
      ];
      // Keep only last 10 notifications
      return newHistory.slice(0, 10);
    });
  };

  // Basic notification tests
  const showBasicNotification = () => {
    const uuid = TemporaryNotification.show(message, {
      type: "basic",
      duration: duration,
      actionText: actionText || undefined,
    });
    trackNotification(uuid, message, "basic");
  };

  const showSuccessNotification = () => {
    const uuid = TemporaryNotification.show("Operation completed successfully!", {
      type: "success",
      duration: duration,
    });
    trackNotification(uuid, "Operation completed successfully!", "success");
  };

  const showFailureNotification = () => {
    const uuid = TemporaryNotification.show(
      "An error occurred while processing your request.",
      {
        type: "failure",
        duration: duration,
      },
    );
    trackNotification(
      uuid,
      "An error occurred while processing your request.",
      "failure",
    );
  };

  const showIndeterminateNotification = () => {
    const uuid = TemporaryNotification.show("Processing your request...", {
      type: "indeterminate",
      duration: duration,
    });
    trackNotification(uuid, "Processing your request...", "indeterminate");
  };

  // Progress notification tests
  const startProgressNotification = () => {
    setProgressValue(0);
    const uuid = TemporaryNotification.show("Uploading files...", {
      type: "progress",
      duration: undefined, // No auto-dismiss for progress
    });
    setCurrentProgressUuid(uuid);
    trackNotification(uuid, "Uploading files...", "progress");

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        const newValue = prev + 10;
        TemporaryNotification.setProgress(uuid, newValue);

        if (newValue >= 100) {
          clearInterval(interval);
          setProgressValue(0);
          setCurrentProgressUuid("");
        }
        return newValue;
      });
    }, 500);
    setProgressInterval(interval);
  };

  const stopProgressNotification = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      setProgressValue(0);
      setCurrentProgressUuid("");
      setProgressInterval(null);
    }
  };

  // Queue testing
  const showMultipleNotifications = () => {
    const messages = [
      "First notification in queue",
      "Second notification in queue",
      "Third notification in queue",
      "Fourth notification in queue",
      "Fifth notification in queue",
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        const uuid = TemporaryNotification.show(msg, {
          type: "basic",
          duration: 2000,
        });
        trackNotification(uuid, msg, "basic");
      }, index * 500);
    });
  };

  // Action testing
  const showNotificationWithAction = () => {
    const uuid = TemporaryNotification.show("Would you like to undo this action?", {
      type: "basic",
      duration: 8000,
      actionText: "Undo",
      action: () => {
        console.log("Undo action clicked!");
        TemporaryNotification.show("Action undone successfully!", {
          type: "success",
          duration: 3000,
        });
      },
    });
    trackNotification(uuid, "Would you like to undo this action?", "basic with action");
  };

  // Cancel/replace testing
  const showCancellableNotification = () => {
    const uuid = TemporaryNotification.show("This notification can be cancelled", {
      type: "basic",
      duration: 10000,
    });
    setLastNotificationUuid(uuid);
    trackNotification(uuid, "This notification can be cancelled", "basic");
  };

  const cancelLastNotification = () => {
    if (lastNotificationUuid) {
      TemporaryNotification.show("Previous notification cancelled", {
        type: "success",
        cancelUUID: lastNotificationUuid,
        duration: 3000,
      });
      setLastNotificationUuid("");
    }
  };

  // Welcome notification
  const showWelcomeNotification = () => {
    const uuid = TemporaryNotification.show(
      "Welcome to the Temporary Notification test page! 🎉",
      {
        type: "success",
        duration: 5000,
      },
    );
    trackNotification(
      uuid,
      "Welcome to the Temporary Notification test page! 🎉",
      "success",
    );
  };

  const clearHistory = () => {
    setNotificationHistory([]);
  };

  // Duration presets
  const setDurationShort = () => setDuration(2000);
  const setDurationMedium = () => setDuration(4000);
  const setDurationLong = () => setDuration(6000);
  const setDurationCustom = () => setDuration(8000);

  // Dropdown change handlers
  const onVerticalPositionChange = (details: GoabDropdownOnChangeDetail) => {
    setVerticalPosition(details.value as "top" | "bottom");
  };

  const onHorizontalPositionChange = (details: GoabDropdownOnChangeDetail) => {
    setHorizontalPosition(details.value as "left" | "center" | "right");
  };

  return (
    <div>
      <h1>Temporary Notification Feature Test (Issue #2730)</h1>
      <p>Testing the new temporary notification component and controller functionality</p>

      {/* Controller Setup */}
      <GoabTemporaryNotificationCtrl
        verticalPosition={verticalPosition}
        horizontalPosition={horizontalPosition}
        testId="notification-controller"
      />

      <GoabBlock gap="l" direction="column">
        {/* Controller Positioning */}
        <h2>Controller Positioning</h2>
        <p>Configure where notifications appear on the screen</p>

        <GoabBlock gap="m" direction="row">
          <GoabFormItem label="Vertical Position">
            <GoabDropdown
              name="vertical-position"
              value={verticalPosition}
              onChange={onVerticalPositionChange}
              testId="vertical-position-dropdown"
            >
              <GoabDropdownItem value="top" label="Top" />
              <GoabDropdownItem value="bottom" label="Bottom" />
            </GoabDropdown>
          </GoabFormItem>

          <GoabFormItem label="Horizontal Position">
            <GoabDropdown
              name="horizontal-position"
              value={horizontalPosition}
              onChange={onHorizontalPositionChange}
              testId="horizontal-position-dropdown"
            >
              <GoabDropdownItem value="left" label="Left" />
              <GoabDropdownItem value="center" label="Center" />
              <GoabDropdownItem value="right" label="Right" />
            </GoabDropdown>
          </GoabFormItem>
        </GoabBlock>

        {/* Notification Configuration */}
        <h2>Notification Configuration</h2>
        <p>Customize notification settings</p>

        <GoabBlock gap="m" direction="row">
          <GoabFormItem label="Message">
            <GoabInput
              name="message"
              value={message}
              onChange={(details) => setMessage(details.value)}
              testId="message-input"
              placeholder="Enter notification message..."
            />
          </GoabFormItem>

          <GoabFormItem label="Duration (ms)">
            <GoabInput
              name="duration"
              value={duration.toString()}
              onChange={(details) => setDuration(+details.value)}
              testId="duration-input"
              type="number"
              placeholder="4000"
            />
          </GoabFormItem>
        </GoabBlock>

        <GoabBlock gap="m" direction="row">
          <GoabFormItem label="Action Text (optional)">
            <GoabInput
              name="action-text"
              value={actionText}
              onChange={(details) => setActionText(details.value)}
              testId="action-text-input"
              placeholder="e.g., Undo, Retry, etc."
            />
          </GoabFormItem>

          <GoabFormItem label="Duration Presets">
            <GoabBlock gap="xs" direction="row">
              <GoabButton testId="duration-short" onClick={setDurationShort}>
                Short (2s)
              </GoabButton>
              <GoabButton testId="duration-medium" onClick={setDurationMedium}>
                Medium (4s)
              </GoabButton>
              <GoabButton testId="duration-long" onClick={setDurationLong}>
                Long (6s)
              </GoabButton>
              <GoabButton testId="duration-custom" onClick={setDurationCustom}>
                Custom (8s)
              </GoabButton>
            </GoabBlock>
          </GoabFormItem>
        </GoabBlock>

        {/* Basic Notification Tests */}
        <h2>Basic Notification Tests</h2>
        <p>Test different notification types and behaviors</p>

        <GoabBlock gap="m" direction="row">
          <GoabButton testId="basic-notification" onClick={showBasicNotification}>
            Show Basic Notification
          </GoabButton>
          <GoabButton testId="success-notification" onClick={showSuccessNotification}>
            Show Success Notification
          </GoabButton>
          <GoabButton testId="failure-notification" onClick={showFailureNotification}>
            Show Failure Notification
          </GoabButton>
        </GoabBlock>

        <GoabBlock gap="m" direction="row">
          <GoabButton
            testId="indeterminate-notification"
            onClick={showIndeterminateNotification}
          >
            Show Indeterminate Notification
          </GoabButton>
          <GoabButton testId="action-notification" onClick={showNotificationWithAction}>
            Show Notification with Action
          </GoabButton>
        </GoabBlock>

        {/* Progress Notification Tests */}
        <h2>Progress Notification Tests</h2>
        <p>Test determinate and indeterminate progress indicators</p>

        <GoabBlock gap="m" direction="row">
          <GoabButton testId="start-progress" onClick={startProgressNotification}>
            Start Progress Notification
          </GoabButton>
          <GoabButton testId="stop-progress" onClick={stopProgressNotification}>
            Stop Progress
          </GoabButton>
        </GoabBlock>

        {currentProgressUuid && (
          <GoabBlock gap="s" direction="column">
            <GoabText tag="p">
              <strong>Current Progress:</strong> {progressValue}%
            </GoabText>
            <GoabText tag="p">
              <strong>Progress UUID:</strong> {currentProgressUuid}
            </GoabText>
          </GoabBlock>
        )}

        {/* Queue Testing */}
        <h2>Queue Testing</h2>
        <p>Test multiple notifications in queue (FIFO order)</p>

        <GoabBlock gap="m" direction="row">
          <GoabButton testId="multiple-notifications" onClick={showMultipleNotifications}>
            Show 5 Notifications in Queue
          </GoabButton>
        </GoabBlock>

        {/* Cancel/Replace Testing */}
        <h2>Cancel/Replace Testing</h2>
        <p>Test cancelling and replacing notifications</p>

        <GoabBlock gap="m" direction="row">
          <GoabButton
            testId="cancellable-notification"
            onClick={showCancellableNotification}
          >
            Show Cancellable Notification
          </GoabButton>
          <GoabButton testId="cancel-notification" onClick={cancelLastNotification}>
            Cancel Last Notification
          </GoabButton>
        </GoabBlock>

        {/* Test Results */}
        <h2>Test Results</h2>
        <p>Track notification history and UUIDs</p>

        <GoabBlock gap="m" direction="row">
          <GoabText tag="p">
            <strong>Last Notification UUID:</strong> {lastNotificationUuid || "None"}
          </GoabText>
          <GoabButton testId="clear-history" onClick={clearHistory}>
            Clear History
          </GoabButton>
        </GoabBlock>

        <h3>Notification History (Last 10)</h3>
        <GoabBlock gap="s" direction="column">
          {notificationHistory.map((notification, index) => (
            <div key={index} className="history-item">
              <GoabText tag="p">
                <strong>{notification.timestamp.toLocaleTimeString()}</strong> -{" "}
                <strong>{notification.type}</strong>: {notification.message}
              </GoabText>
              <GoabText tag="span">UUID: {notification.uuid}</GoabText>
            </div>
          ))}
          {notificationHistory.length === 0 && (
            <GoabText tag="p">
              No notifications yet. Try clicking some buttons above!
            </GoabText>
          )}
        </GoabBlock>

        {/* Feature Summary */}
        <h2>Feature Summary</h2>
        <GoabBlock gap="s" direction="column">
          <GoabText tag="p">
            ✅ <strong>Controller System</strong> - Centralized notification management
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Flexible Positioning</strong> - Top/bottom, left/center/right
            positioning
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Multiple Types</strong> - Basic, success, failure, indeterminate,
            progress
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Progress Tracking</strong> - Determinate (0-100) and indeterminate
            progress
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Queue Management</strong> - FIFO order for multiple notifications
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Action Buttons</strong> - Custom actions for basic notifications
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Cancel/Replace</strong> - Cancel existing notifications with new
            ones
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Auto-dismiss</strong> - Configurable duration with presets
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Animation</strong> - Smooth slide animations based on position
          </GoabText>
          <GoabText tag="p">
            ✅ <strong>Accessibility</strong> - Proper ARIA attributes and screen reader
            support
          </GoabText>
        </GoabBlock>
      </GoabBlock>
    </div>
  );
}
