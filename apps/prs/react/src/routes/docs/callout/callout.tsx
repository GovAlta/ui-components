import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabCallout,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

export function DocsCalloutRoute() {
  const [deadlineOpen, setDeadlineOpen] = useState(false);

  return (
    <div>
      <h2>Callout</h2>

      <h3>Information callout</h3>
      <GoabCallout type="information" emphasis="low" maxWidth="480px">
        This is important information for the user.
      </GoabCallout>

      <h3>Callout types</h3>
      <GoabCallout type="information" heading="Information">
        General information for the user.
      </GoabCallout>
      <GoabCallout type="important" heading="Important">
        Something the user should pay attention to.
      </GoabCallout>
      <GoabCallout type="emergency" heading="Emergency">
        Critical information requiring immediate attention.
      </GoabCallout>
      <GoabCallout type="success" heading="Success">
        Confirmation that an action was successful.
      </GoabCallout>

      <h3>Heading</h3>
      <GoabCallout type="important" emphasis="low" heading="Application deadline">
        Your application must be submitted by December 31, 2024.
      </GoabCallout>
      <GoabCallout type="important" emphasis="low">
        Your application must be submitted by December 31, 2024.
      </GoabCallout>

      <h3>Emphasis levels</h3>
      <GoabCallout type="important" emphasis="high" heading="High emphasis">
        Full background color for maximum visibility.
      </GoabCallout>
      <GoabCallout type="important" emphasis="medium" heading="Medium emphasis">
        Subtle background for balanced visibility.
      </GoabCallout>
      <GoabCallout type="important" emphasis="low" heading="Low emphasis">
        Minimal styling for less prominent messaging.
      </GoabCallout>

      <h2>Examples</h2>

      <h3>Confirm that an application was submitted</h3>
      <GoabText tag="h1" mt="none">You have completed the application</GoabText>
      <GoabCallout type="success" heading="Your application was successful">
        <GoabText mt="none" mb="m">You will receive a copy of the confirmation to the email person@email.com</GoabText>
        <GoabText mt="none" mb="none">Confirmation number: <strong>1234ABC</strong></GoabText>
      </GoabCallout>
      <GoabText tag="h2" mt="xl" mb="m">Go back to the dashboard, or direct your user somewhere else useful.</GoabText>
      <GoabText>
        Other information about what was just completed, other tertiary information, and/or contact information.
        <br />
        Phone: <a href="tel:7801234567">780 123 4567</a>
        <br />
        Email: <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a>
      </GoabText>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary">Go to application</GoabButton>
        <GoabButton type="secondary">Back to dashboard</GoabButton>
      </GoabButtonGroup>

      <h3>Result page</h3>
      <GoabText tag="h1" mt="none">You have completed the application</GoabText>
      <GoabCallout type="success" heading="Application submitted">
        <GoabText size="body-m" mt="none" mb="s">You will receive a copy of the confirmation to the email name@email.com</GoabText>
        <GoabText size="body-m" mt="none" mb="none">Your reference number is: <strong>1234ABC</strong></GoabText>
      </GoabCallout>
      <GoabText tag="h2" mt="xl" mb="m">What happens next</GoabText>
      <GoabText size="body-m" mt="none" mb="s">We've sent your application to service name. They will contact you to confirm your registration.</GoabText>
      <GoabText size="body-m" mt="none" mb="s">You can now close this window.</GoabText>
      <GoabText size="body-m" mt="none" mb="s">What did you think of this service? <a href="#">Give feedback</a></GoabText>
      <GoabText tag="h2" mt="xl" mb="m">If you have questions about your application</GoabText>
      <GoabText size="body-m" mt="none" mb="s">Contact the [ministry area].</GoabText>
      <GoabText size="body-m" mt="none" mb="s">Email: <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a></GoabText>
      <GoabText size="body-m" mt="none" mb="s">Phone: <a href="tel:7801234567">780 123 4567</a></GoabText>

      <h3>Warn a user of a deadline</h3>
      <GoabButton type="secondary" onClick={() => setDeadlineOpen(true)}>
        Save for later
      </GoabButton>
      <GoabModal
        heading="Complete submission prior to 1PM"
        calloutVariant="important"
        open={deadlineOpen}
        onClose={() => setDeadlineOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setDeadlineOpen(false)}>
              I understand
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>
          You've selected to adjourn a matter that is required to appear today. This Calgary court
          location does not accept adjournment requests past 1PM MST. Please submit your
          adjournment request as soon as possible.
        </p>
      </GoabModal>
    </div>
  );
}
