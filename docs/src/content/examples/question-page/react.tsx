import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabInput,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function QuestionPage() {
  const [answer, setAnswer] = useState("");

  const handleContinue = () => {
    console.log("Answer submitted:", answer);
  };

  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText tag="h1" mt="xl" mb="m">
        What is your email address?
      </GoabText>
      <GoabText mt="none" mb="xl">
        We'll use this to send you confirmation of your application.
      </GoabText>

      <GoabFormItem label="Email address">
        <GoabInput
          name="email"
          type="email"
          value={answer}
          onChange={(e) => setAnswer(e.value)}
          width="100%"
        />
      </GoabFormItem>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={handleContinue}>
          Continue
        </GoabButton>
      </GoabButtonGroup>
    </>
  );
}
