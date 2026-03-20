import {
  GoabxButton,
  GoabxFormItem,
  GoabxInput,
  GoabxLink,
} from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";

export function ShowASimpleProgressIndicatorOnAQuestionPageWithMultipleQuestions() {
  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabText as="h3" size="body-m" mt="xl" mb="none" color="secondary">
        Step 1 of 5
      </GoabText>
      <GoabText as="h2" mt="xs" mb="xl">
        Personal information
      </GoabText>

      <GoabxFormItem label="What is your name?">
        <GoabxInput
          onChange={() => {}}
          name="name"
          ariaLabel="what is your name?"
          width="50ch"
        />
      </GoabxFormItem>

      <GoabxFormItem label="What is your phone number?" mt="l">
        <GoabxInput
          onChange={() => {}}
          name="phone-number"
          ariaLabel="what is your phone number?"
          leadingContent="+1"
        />
      </GoabxFormItem>

      <GoabxFormItem label="What is your home postal code?" mt="l">
        <GoabxInput
          onChange={() => {}}
          name="postal-code"
          width="14ch"
          ariaLabel="what is your home postal code"
        />
      </GoabxFormItem>

      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
