import { GoabBadge, GoabCallout, GoabTable, GoabText } from "@abgov/react-components";

export function TaskListPage() {
  return (
    <>
      <GoabText as="h1" mt="none">Apply for a service</GoabText>
      <GoabCallout
        type="important"
        emphasis="low"
        size="medium"
        heading="Application incomplete"
        mb="2xl"
        mt="xl"
        maxWidth="360px"
      >
        You have completed 1 of 3 sections.
      </GoabCallout>

      <GoabText as="h2">1. Before you start</GoabText>
      <GoabTable width="100%" mb="2xl" mt="l">
        <tbody>
          <tr>
            <td>
              <a href="#">Read terms of use</a>
            </td>
            <td className="goa-table-number-column">
              <GoabBadge type="success" content="Completed" ariaLabel="completed" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>

      <GoabText as="h2">2. Prepare application</GoabText>
      <GoabTable width="100%" mb="2xl" mt="l">
        <tbody>
          <tr>
            <td>
              <a href="#">Your contact details</a>
            </td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">Your family</a>
            </td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
          <tr>
            <td>
              <a href="#">Verify your identity</a>
            </td>
            <td className="goa-table-number-column">
              <GoabBadge type="information" content="Not started" ariaLabel="not started" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>

      <GoabText as="h2" mb="s">3. Schedule service</GoabText>
      <GoabText size="body-s" color="secondary" mt="2xs">
        You need to complete the previous section before you can start this task.
      </GoabText>
      <GoabTable width="100%" mt="l" mb="3xl">
        <tbody>
          <tr>
            <td>Receive email confirmation</td>
            <td className="goa-table-number-column">
              <GoabBadge type="light" content="Cannot start yet" ariaLabel="cannot start yet" icon={false} />
            </td>
          </tr>
          <tr>
            <td>Pay service fee</td>
            <td className="goa-table-number-column">
              <GoabBadge type="light" content="Cannot start yet" ariaLabel="cannot start yet" icon={false} />
            </td>
          </tr>
        </tbody>
      </GoabTable>
    </>
  );
}
