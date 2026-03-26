import {
  GoabButton,
  GoabTemporaryNotificationCtrl,
} from "@abgov/react-components";

import { TemporaryNotification } from "@abgov/ui-components-common";

export function ShowANotificationWithAnAction() {
  const comment = () => {
    const uuid = TemporaryNotification.show(
      "Edna Mode commented on your assigned case.",
      {
        actionText: "View",
        action: () => {
          TemporaryNotification.dismiss(uuid);
        }
      }
    );
  };

  return (
    <>
      <GoabTemporaryNotificationCtrl />
      <GoabButton onClick={comment}>Comment</GoabButton>
    </>
  );
}
