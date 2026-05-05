import {
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function ShowASimpleProgressIndicatorOnAQuestionPageWithMultipleQuestions() {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText tag="h3" size="body-m" mt="xl" mb="none" color="secondary">
        Step 1 of 5
      </GoabText>
      <GoabText tag="h2" mt="xs" mb="xl">
        Personal information
      </GoabText>

      <GoabFormItem label="What is your name?">
        <GoabInput
          onChange={() => {}}
          name="name"
          ariaLabel="what is your name?"
          width="50ch"
        />
      </GoabFormItem>

      <GoabFormItem label="What is your phone number?" mt="l">
        <GoabInput
          onChange={() => {}}
          name="phone-number"
          ariaLabel="what is your phone number?"
          leadingContent="+1"
        />
      </GoabFormItem>

      <GoabFormItem label="What is your home postal code?" mt="l">
        <GoabInput
          onChange={() => {}}
          name="postal-code"
          width="14ch"
          ariaLabel="what is your home postal code"
        />
      </GoabFormItem>

      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>
    </>
  );
}
