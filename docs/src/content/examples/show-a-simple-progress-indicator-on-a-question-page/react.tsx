import {
  GoabButton,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText
} from "@abgov/react-components";

export function ShowASimpleProgressIndicatorOnAQuestionPage() {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText as="h3" size="body-m" mt="xl" mb="m" color="secondary">Question 3 of 9</GoabText>

      <GoabFormItem label="Do you currently live in Canada?" labelSize="large">
        <GoabRadioGroup
          name="canada"
          ariaLabel="Do you currently live in Canada?"
          onChange={() => {}}>
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
