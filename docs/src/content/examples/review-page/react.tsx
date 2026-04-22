import {
  GoabButton,
  GoabButtonGroup,
  GoabLink,
  GoabTable,
  GoabText,
} from "@abgov/react-components";

export function ReviewPage() {
  return (
    <>
      <GoabText size="heading-l" mt="none" mb="none">
        Review your answers
      </GoabText>
      <GoabText size="heading-s" color="secondary" mt="l" mb="none">
        Your situation
      </GoabText>
      <GoabTable mt="l">
        <tbody>
          <tr>
            <td>
              <strong>
                What was your (the applicant's) relationship to the deceased?
              </strong>
            </td>
            <td>Other</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>My relationship to the deceased was</strong>
            </td>
            <td>Manager</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Was the deceased part of a household that was receiving Assured Income for
                the Severely Handicapped (AISH) or Income Support?
              </strong>
            </td>
            <td>No</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Was the deceased a minor?</strong>
            </td>
            <td>No</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>What was the deceased's marital status at time of death?</strong>
            </td>
            <td>Married</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Did the deceased have any dependents?</strong>
            </td>
            <td>No</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Was the deceased a sponsored immigrant?</strong>
            </td>
            <td>Yes</td>
            <td>
              <GoabLink>Change</GoabLink>
            </td>
          </tr>
        </tbody>
      </GoabTable>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary">Confirm and continue</GoabButton>
        <GoabButton type="tertiary">Back to application overview</GoabButton>
      </GoabButtonGroup>
    </>
  );
}
