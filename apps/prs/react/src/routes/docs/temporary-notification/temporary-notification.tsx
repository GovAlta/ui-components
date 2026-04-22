import {
  GoabButton,
  GoabTemporaryNotificationCtrl,
} from "@abgov/react-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

export function DocsTemporaryNotificationRoute() {
  // Show a notification (example)
  const save = async () => {
    TemporaryNotification.show("Your application has been saved.", {
      type: "success",
    });
  };

  // Show a notification with an action (example)
  const comment = () => {
    const uuid = TemporaryNotification.show(
      "Edna Mode commented on your assigned case.",
      {
        actionText: "View",
        action: () => {
          TemporaryNotification.dismiss(uuid);
        },
      },
    );
  };

  // Show a user progress when time is unknown (example)
  const searchCMS = async (): Promise<Error | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return undefined;
  };

  const search = async () => {
    const uuid = TemporaryNotification.show("Searching case management system...", {
      type: "indeterminate",
      actionText: "Cancel",
      action: () => {
        TemporaryNotification.dismiss(uuid);
      },
    });

    const err = await searchCMS();
    if (err) {
      TemporaryNotification.show("Could not connect to case history", {
        type: "failure",
        duration: "medium",
        cancelUUID: uuid,
      });
    } else {
      TemporaryNotification.show("Search complete - 47 records found", {
        type: "success",
        duration: "medium",
        actionText: "View",
        action: () => {
          console.log("View search results clicked!");
        },
        cancelUUID: uuid,
      });
    }
  };

  // Show a user progress (example)
  const sendApi = (
    progressCallback: (progress: number) => void,
    isCancelledRef: { current: boolean },
  ) => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        if (isCancelledRef.current) {
          clearInterval(interval);
          reject("cancelled");
          return;
        }
        progress += 5;
        progressCallback(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve("success");
        }
      }, 200);
    });
  };

  const downloadReport = () => {
    const isCancelledRef = { current: false };

    const uuid = TemporaryNotification.show("Downloading report D-23459", {
      type: "progress",
      actionText: "Cancel",
      action: () => {
        isCancelledRef.current = true;
        TemporaryNotification.dismiss(uuid);
        console.log("Download cancelled");
      },
    });

    TemporaryNotification.setProgress(uuid, 0);

    const updateProgress = (progress: number) => {
      TemporaryNotification.setProgress(uuid, progress);

      if (progress >= 100) {
        setTimeout(() => {
          TemporaryNotification.show("Report downloaded", {
            type: "success",
            duration: "medium",
            actionText: "View",
            action: () => {
              console.log("View report clicked!");
            },
            cancelUUID: uuid,
          });
        }, 300);
      }
    };

    sendApi(updateProgress, isCancelledRef).catch((error) => {
      if (error !== "cancelled") {
        TemporaryNotification.dismiss(uuid);
      }
    });
  };

  return (
    <div>
      <h2>Temporary notification</h2>
      <GoabTemporaryNotificationCtrl />

      <h3>Basic notification</h3>
      <GoabButton
        onClick={() => {
          TemporaryNotification.show("You have a notification", {
            type: "basic",
            duration: "short",
          });
        }}
      >
        Notification
      </GoabButton>

      <h3>Notification types</h3>
      <GoabButton onClick={() => TemporaryNotification.show("Basic message", { type: "basic" })} mb="xs">Basic</GoabButton>
      <GoabButton onClick={() => TemporaryNotification.show("Action completed.", { type: "success" })} mb="xs">Success</GoabButton>
      <GoabButton onClick={() => TemporaryNotification.show("Something went wrong.", { type: "failure" })}>Failure</GoabButton>

      <h3>Progress and indeterminate</h3>
      <GoabButton
        onClick={() => {
          const uuid = TemporaryNotification.show("Uploading file...", { type: "progress" });
          TemporaryNotification.setProgress(uuid, 65);
        }}
        mb="xs"
      >
        Progress
      </GoabButton>
      <GoabButton
        onClick={() => {
          TemporaryNotification.show("Processing your request...", { type: "indeterminate" });
        }}
      >
        Indeterminate
      </GoabButton>

      <h2>Examples</h2>

      <h3>Show a notification</h3>
      <GoabButton type="secondary" onClick={save}>Save</GoabButton>

      <h3>Show a notification with an action</h3>
      <GoabButton onClick={comment}>Comment</GoabButton>

      <h3>Show a user progress when time is unknown</h3>
      <GoabButton type="secondary" leadingIcon="search" onClick={search}>
        Search case history
      </GoabButton>

      <h3>Show a user progress</h3>
      <GoabButton type="tertiary" leadingIcon="download" onClick={downloadReport}>
        Download report
      </GoabButton>
    </div>
  );
}
