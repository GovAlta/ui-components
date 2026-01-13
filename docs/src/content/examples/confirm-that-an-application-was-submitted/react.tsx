import { GoabButton, GoabButtonGroup, GoabCallout, GoabText } from "@abgov/react-components";

export function ConfirmThatAnApplicationWasSubmitted() {
  return (
    <>
      <GoabText as="h1" mt="none">You have completed the application</GoabText>

      <GoabCallout type="success" heading="Your application was successful">
        <GoabText mt="none" mb="m">You will receive a copy of the confirmation to the email person@email.com</GoabText>
        <GoabText mt="none" mb="none">Confirmation number: <strong>1234ABC</strong></GoabText>
      </GoabCallout>

      <GoabText as="h2" mt="xl" mb="m">Go back to the dashboard, or direct your user somewhere else useful.</GoabText>
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
    </>
  );
}
