import { useState } from "react";
import {
  GoabxButton,
  GoabxFormItem,
  GoabxInput,
  GoabxLink,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabText } from "@abgov/react-components";

export function QuestionPage() {
  const [answer, setAnswer] = useState("");

  const handleContinue = () => {
    console.log("Answer submitted:", answer);
  };

  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabText as="h1" mt="xl" mb="m">
        What is your email address?
      </GoabText>
      <GoabText mt="none" mb="xl">
        We'll use this to send you confirmation of your application.
      </GoabText>

      <GoabxFormItem label="Email address">
        <GoabxInput
          name="email"
          type="email"
          value={answer}
          onChange={(e) => setAnswer(e.value)}
          width="100%"
        />
      </GoabxFormItem>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabxButton type="primary" onClick={handleContinue}>
          Continue
        </GoabxButton>
      </GoabButtonGroup>
    </>
  );
}
