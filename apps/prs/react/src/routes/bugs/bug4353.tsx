import { GoabNotification, GoabText } from "@abgov/react-components";

export function Bug4353Route() {
  return (
    <main>
      <GoabText tag="h1" mt="none" mb="m">
        Bug 4353: Notification close button name
      </GoabText>
      <GoabText tag="p" mb="s">
        <a href="https://github.com/GovAlta/ui-components/issues/4353">
          View issue #4353
        </a>
      </GoabText>
      <GoabText tag="p" mb="m">
        Tab to the close button. A screen reader should announce "Close the notification",
        button. Activate it to dismiss the banner.
      </GoabText>
      <GoabNotification type="information" testId="bug4353-banner">
        Scheduled maintenance starts at 8 pm.
      </GoabNotification>
    </main>
  );
}

export default Bug4353Route;
