import {
  GoabButton,
  GoabDetails,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function ShowMoreInformationToHelpAnswerAQuestion() {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabFormItem
        mt="xl"
        label="Do you pay for child care?"
        labelSize="large"
        helpText="Examples of child care are daycares, day homes and baby-sisters."
      >
        <GoabRadioGroup
          name="child-care"
          ariaLabel="Do you pay for child care?"
          onChange={() => {}}
        >
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabDetails heading="Why are we asking this question?" mt="l">
        <p>We ask this question to determine if you are eligible for child care benefits.</p>
      </GoabDetails>

      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>
    </>
  );
}
