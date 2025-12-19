import { GoabDetails, GoabGrid, GoabText } from "@abgov/react-components";

export function PublicForm() {
  return (
    <>
      <GoabDetails heading="Who are the primary users for the public form pattern?">
        <GoabText size="body-m" mt="none" mb="none">
          <strong>Primary users:</strong> citizens, public, external
          <br />
          <br />
          You are designing a public service for citizens. It should be designed
          to be as simple and intuitive as possible, while ensuring citizens can
          make complete and informed decisions for themselves using the service.
          <br />
          <br />
          There is an emphasis on an accessible experience with a low cognitive
          load for users who use the service infrequently.
        </GoabText>
      </GoabDetails>

      <GoabText tag="h2" size="heading-l" mt="2xl">
        Pages
      </GoabText>

      <GoabGrid gap="2xl" minChildWidth="400px" mt="xl">
        <div>
          <GoabText size="heading-m" mt="none" mb="m">
            1. Start page
          </GoabText>
          <GoabText size="body-m" mt="none" mb="l">
            This is the starting point for a citizen to begin your form from
            within your service or from Alberta.ca.
          </GoabText>

          <GoabText size="heading-m" mt="2xl" mb="m">
            2. Task list page (optional)
          </GoabText>
          <GoabText size="body-m" mt="none" mb="l">
            Outline the entire process for the user and help them through the
            process by breaking down an experience into individual tasks.
          </GoabText>

          <GoabText size="heading-m" mt="2xl" mb="m">
            3. Question pages
          </GoabText>
          <GoabText size="body-m" mt="none" mb="l">
            Ask a user a question or a small set of related questions.
          </GoabText>

          <GoabText size="heading-m" mt="2xl" mb="m">
            4. Review page
          </GoabText>
          <GoabText size="body-m" mt="none" mb="l">
            Let users check answers before submitting information to a service.
          </GoabText>

          <GoabText size="heading-m" mt="2xl" mb="m">
            5. Results page
          </GoabText>
          <GoabText size="body-m" mt="none" mb="l">
            Let users know that they've completed a form, application, or task
            and tell them what to do next.
          </GoabText>
        </div>
      </GoabGrid>
    </>
  );
}
