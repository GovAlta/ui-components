import { GoabxButton } from "@abgov/react-components/experimental";
import { GoabTemporaryNotificationCtrl } from "@abgov/react-components";
import { TemporaryNotification } from "@abgov/ui-components-common";

export function ShowANotification() {
  const save = async () => {
    // await api.save();

    TemporaryNotification.show("Your application has been saved.", {
      type: "success",
    });
  };

  return (
    <>
      <GoabTemporaryNotificationCtrl />
      <GoabxButton type="secondary" onClick={save}>
        Save
      </GoabxButton>
    </>
  );
}
