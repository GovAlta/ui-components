import { GoabCallout, GoabText } from "@abgov/react-components";

export function ResultPage() {
  return (
    <>
      <GoabText as="h1" mt="none">You have completed the application</GoabText>

      <GoabCallout type="success" heading="Application submitted">
        <GoabText size="body-m" mt="none" mb="s">You will receive a copy of the confirmation to the email name@email.com</GoabText>
        <GoabText size="body-m" mt="none" mb="none">Your reference number is: <strong>1234ABC</strong></GoabText>
      </GoabCallout>

      <GoabText as="h2" mt="xl" mb="m">What happens next</GoabText>
      <GoabText size="body-m" mt="none" mb="s">We've sent your application to service name. They will contact you to confirm your registration.</GoabText>
      <GoabText size="body-m" mt="none" mb="s">You can now close this window.</GoabText>
      <GoabText size="body-m" mt="none" mb="s">What did you think of this service? <a href="#">Give feedback</a></GoabText>

      <GoabText as="h2" mt="xl" mb="m">If you have questions about your application</GoabText>
      <GoabText size="body-m" mt="none" mb="s">Contact the [ministry area].</GoabText>
      <GoabText size="body-m" mt="none" mb="s">Email: <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a></GoabText>
      <GoabText size="body-m" mt="none" mb="s">Phone: <a href="tel:7801234567">780 123 4567</a></GoabText>
    </>
  );
}
