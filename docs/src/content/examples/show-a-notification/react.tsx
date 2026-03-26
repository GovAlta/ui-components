import {
  GoabButton,
  GoabTemporaryNotificationCtrl,
} from "@abgov/react-components";

import { TemporaryNotification } from "@abgov/ui-components-common";

export function ShowANotification() {
  const save = async () => {
    // await api.save();

    TemporaryNotification.show("Your application has been saved.", {
      type: "success"
    });
  };

  return (
    <>
      <GoabTemporaryNotificationCtrl />
      <GoabButton type="secondary" onClick={save}>Save</GoabButton>
    </>
  );
}
