import { useState } from "react";
import { GoabxButton, GoabxFormItem, GoabxLink, GoabxTextArea } from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabDetails, GoabText } from "@abgov/react-components";
import { GoabTextAreaOnChangeDetail } from "@abgov/ui-components-common";

export function GiveContextBeforeAskingALongAnswerQuestion() {
  const [textValue, setTextValue] = useState("");

  const handleChange = (event: GoabTextAreaOnChangeDetail) => {
    setTextValue(event.value);
  };

  const handleContinue = () => {
    console.log("Submitted:", textValue);
  };

  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabText as="h2" mt="xl" mb="m">Submit a question about your benefits</GoabText>
      <GoabText mt="none" mb="xl">
        If you need clarification about your benefit eligibility, payment schedule, or application status, submit your
        question here.
      </GoabText>

      <form>
        <GoabxFormItem
          label="Provide details about your situation"
          helpText="Include specific details to help us answer your question quickly.">
          <GoabxTextArea
            name="program"
            onChange={handleChange}
            value={textValue}
            maxCount={400}
            countBy="character"
          />
        </GoabxFormItem>
      </form>

      <GoabDetails mt="m" heading="What kind of information is useful?">
        <p>
          Include your benefit program name, mention any recent correspondence you received and/or provide any
          relevant case or reference numbers.
        </p>
      </GoabDetails>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabxButton type="primary" onClick={handleContinue}>
          Continue
        </GoabxButton>
      </GoabButtonGroup>
    </>
  );
}
