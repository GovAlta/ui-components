import { GoabButton, GoabTemporaryNotificationCtrl } from "@abgov/react-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

export function ShowAUserProgress() {
  const sendApi = (
    progressCallback: (progress: number) => void,
    isCancelledRef: { current: boolean }
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
    <>
      <GoabTemporaryNotificationCtrl />
      <GoabButton type="tertiary" leadingIcon="download" onClick={downloadReport}>
        Download report
      </GoabButton>
    </>
  );
}
