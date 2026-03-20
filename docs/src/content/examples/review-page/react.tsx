import { GoabxButton, GoabxLink, GoabxTable } from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabText } from "@abgov/react-components";

export function ReviewPage() {
  return (
    <>
      <GoabText size="heading-l" mt="none" mb="none">
        Review your answers
      </GoabText>
      <GoabText size="heading-s" color="secondary" mt="l" mb="none">
        Your situation
      </GoabText>
      <GoabxTable mt="l">
        <tbody>
          <tr>
            <td>
              <strong>
                What was your (the applicant's) relationship to the deceased?
              </strong>
            </td>
            <td>Other</td>
            <td>
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>My relationship to the deceased was</strong>
            </td>
            <td>Manager</td>
            <td>
              <GoabxLink>Change</GoabxLink>
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
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Was the deceased a minor?</strong>
            </td>
            <td>No</td>
            <td>
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>What was the deceased's marital status at time of death?</strong>
            </td>
            <td>Married</td>
            <td>
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Did the deceased have any dependents?</strong>
            </td>
            <td>No</td>
            <td>
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Was the deceased a sponsored immigrant?</strong>
            </td>
            <td>Yes</td>
            <td>
              <GoabxLink>Change</GoabxLink>
            </td>
          </tr>
        </tbody>
      </GoabxTable>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabxButton type="primary">Confirm and continue</GoabxButton>
        <GoabxButton type="tertiary">Back to application overview</GoabxButton>
      </GoabButtonGroup>
    </>
  );
}
