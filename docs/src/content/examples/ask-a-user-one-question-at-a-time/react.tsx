import {
  GoabButton,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function AskAUserOneQuestionAtATime() {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small">
        <a href="#">Back</a>
      </GoabLink>
      <GoabFormItem
        mt="xl"
        label="Are you currently in school?"
        labelSize="large"
        helpText="School includes foundational, skills and employment training, micro-credentials, post-secondary and continuing education."
      >
        <GoabRadioGroup
          name="school"
          ariaLabel="are you currently in school?"
          onChange={() => {}}
        >
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>
      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>
    </>
  );
}
