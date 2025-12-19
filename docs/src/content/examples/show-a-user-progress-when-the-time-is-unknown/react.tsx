import { GoabButton, GoabTemporaryNotificationCtrl } from "@abgov/react-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

export function ShowAUserProgressWhenTheTimeIsUnknown() {
  const searchCMS = async (): Promise<Error | undefined> => {
    // Perform your API call here
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

  return (
    <>
      <GoabTemporaryNotificationCtrl />
      <GoabButton type="secondary" leadingIcon="search" onClick={search}>
        Search case history
      </GoabButton>
    </>
  );
}
