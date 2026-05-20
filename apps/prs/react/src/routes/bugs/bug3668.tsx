import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabButton,
  GoabTemporaryNotificationCtrl,
} from "@abgov/react-components";
import { TemporaryNotification } from "@abgov/ui-components-common";
import { useState } from "react";

export function Bug3668Route() {
  const [underlyingTargetClicks, setUnderlyingTargetClicks] = useState(0);

  const showBasic = () => {
    TemporaryNotification.show("Basic notification for comparison", {
      type: "basic",
      duration: 8000,
    });
  };

  const showIndeterminate = () => {
    const uuid = TemporaryNotification.show("Loading something indeterminate...", {
      type: "indeterminate",
    });
    setTimeout(() => TemporaryNotification.dismiss(uuid), 5000);
  };

  const showProgress = () => {
    const uuid = TemporaryNotification.show("Uploading file...", {
      type: "progress",
    });
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      TemporaryNotification.setProgress(uuid, value);
      if (value >= 100) clearInterval(interval);
    }, 500);
  };

  const showWithAction = () => {
    TemporaryNotification.show("Item deleted", {
      type: "basic",
      duration: 8000,
      actionText: "Undo",
    });
  };

  const showSuccess = () => {
    TemporaryNotification.show("Successfully saved", {
      type: "success",
      duration: 8000,
    });
  };

  const showFailure = () => {
    TemporaryNotification.show("Something went wrong", {
      type: "failure",
      duration: 8000,
    });
  };

  const showControllerOverlayIssue = () => {
    TemporaryNotification.show(
      "Overlay repro: while this centered notification is visible, try clicking the underlying target button at the bottom-right.",
      {
        type: "basic",
        duration: 12000,
      },
    );
  };

  return (
    <div>
      <GoabTemporaryNotificationCtrl />

      <GoabText tag="h1" mt="m">
        Bug #3668: Temporary notification refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3668"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            1. Indeterminate and progress variants should not have a dark grey border, and
            should have a raised-heavy shadow. 2. Action button should be a tertiary
            button, not a text button. 3. Below 360px, message and action button stack
            vertically with button right-aligned.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">
        Test 1: Indeterminate and progress variants (border + shadow)
      </GoabText>
      <GoabText tag="p">
        Click each to trigger. Inspect the notification surface. Indeterminate and
        progress should NOT have a dark grey border and SHOULD have a raised-heavy shadow
        (matching basic/success/failure).
      </GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton type="secondary" onClick={showBasic}>
          Basic (reference)
        </GoabButton>
        <GoabButton type="secondary" onClick={showSuccess}>
          Success (reference)
        </GoabButton>
        <GoabButton type="secondary" onClick={showFailure}>
          Failure (reference)
        </GoabButton>
        <GoabButton onClick={showIndeterminate}>Indeterminate</GoabButton>
        <GoabButton onClick={showProgress}>Progress</GoabButton>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Action button style</GoabText>
      <GoabText tag="p">
        The action button should render as a tertiary button, not a text button. Inspect
        the button element.
      </GoabText>
      <GoabButton onClick={showWithAction}>Show with action button</GoabButton>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Stacking below 360px</GoabText>
      <GoabText tag="p">
        Resize your browser below 360px width and trigger a notification with an action.
        Message and action button should stack vertically with button right-aligned.
      </GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={showWithAction}>
          Show with action (then resize to 360px)
        </GoabButton>
        <GoabButton
          type="secondary"
          onClick={() => {
            TemporaryNotification.show(
              "Your application for the Alberta Works program has been successfully submitted and is now being reviewed by our team. You will receive a confirmation email shortly.",
              { type: "basic", duration: 15000, actionText: "View details" },
            );
          }}
        >
          Show with long content + action
        </GoabButton>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">
        Test 4: Centered controller overlay blocks underlying UI
      </GoabText>
      <GoabText tag="p">
        Click the button below to show a centered notification, then try clicking the
        fixed Underlying target button at the bottom-right while the notification is
        visible. If the count does not increase until the notification disappears, the
        full-width controller overlay is blocking pointer events outside the snackbar.
      </GoabText>
      <GoabBlock gap="s" direction="column" mb="l">
        <GoabButton onClick={showControllerOverlayIssue}>
          Show centered notification
        </GoabButton>
        <GoabButton
          type="secondary"
          onClick={() => {
            setUnderlyingTargetClicks(0);
          }}
        >
          Reset target count
        </GoabButton>
      </GoabBlock>

      <GoabText tag="p">Underlying target clicks: {underlyingTargetClicks}</GoabText>

      <button
        type="button"
        onClick={() => {
          setUnderlyingTargetClicks((count) => count + 1);
        }}
        style={{
          position: "fixed",
          right: "1.5rem",
          bottom: "1.5rem",
          padding: "0.75rem 1rem",
          border: "1px solid #666",
          borderRadius: "0.5rem",
          background: "#fff",
          color: "#222",
          font: "inherit",
        }}
      >
        Underlying target
      </button>
    </div>
  );
}

export default Bug3668Route;
