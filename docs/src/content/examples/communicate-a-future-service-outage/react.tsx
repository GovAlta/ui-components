import { GoabxNotification } from "@abgov/react-components/experimental";

export function CommunicateAFutureServiceOutage() {
  return (
    <GoabxNotification type="important">
      Our system will be under maintenance from Thursday, September 15, 2025 at 10 pm
      to Friday, September 16, 2025 at 10 am. If you have questions or concerns,
      contact us at <a href="mailto:support@example.com">support@example.com</a>.
    </GoabxNotification>
  );
}
