import {
  GoabxButton,
  GoabxFormItem,
  GoabxLink,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabDetails } from "@abgov/react-components";

export function ShowMoreInformationToHelpAnswerAQuestion() {
  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabxFormItem
        mt="xl"
        label="Do you pay for child care?"
        labelSize="large"
        helpText="Examples of child care are daycares, day homes and baby-sisters."
      >
        <GoabxRadioGroup
          name="child-care"
          ariaLabel="Do you pay for child care?"
          onChange={() => {}}
        >
          <GoabxRadioItem value="yes" label="Yes" />
          <GoabxRadioItem value="no" label="No" />
        </GoabxRadioGroup>
      </GoabxFormItem>

      <GoabDetails heading="Why are we asking this question?" mt="l">
        <p>We ask this question to determine if you are eligible for child care benefits.</p>
      </GoabDetails>

      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
