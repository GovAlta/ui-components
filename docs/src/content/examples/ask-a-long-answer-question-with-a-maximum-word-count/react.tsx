import { useState } from "react";
import { GoabFormItem, GoabTextArea } from "@abgov/react-components";

export function AskALongAnswerQuestionWithAMaximumWordCount() {
  const [value, setValue] = useState("");

  return (
    <GoabFormItem
      label="Provide more detail"
      helpText="Maximum 500 words. Do not include personal or financial information."
    >
      <GoabTextArea
        name="program"
        onChange={(e) => setValue(e.value)}
        value={value}
        width="100%"
        rows={6}
        maxCount={500}
        countBy="word"
      />
    </GoabFormItem>
  );
}
