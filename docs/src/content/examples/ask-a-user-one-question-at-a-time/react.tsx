import {
  GoabxButton,
  GoabxFormItem,
  GoabxLink,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";

export function AskAUserOneQuestionAtATime() {
  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small">
        <a href="#">Back</a>
      </GoabxLink>
      <GoabxFormItem
        mt="xl"
        label="Are you currently in school?"
        labelSize="large"
        helpText="School includes foundational, skills and employment training, micro-credentials, post-secondary and continuing education."
      >
        <GoabxRadioGroup
          name="school"
          ariaLabel="are you currently in school?"
          onChange={() => {}}
        >
          <GoabxRadioItem value="yes" label="Yes" />
          <GoabxRadioItem value="no" label="No" />
        </GoabxRadioGroup>
      </GoabxFormItem>
      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
