import { useState } from "react";
import { GoabxFormItem, GoabxTextArea } from "@abgov/react-components/experimental";

export function AskALongAnswerQuestionWithAMaximumWordCount() {
  const [value, setValue] = useState("");

  return (
    <GoabxFormItem
      label="Provide more detail"
      helpText="Maximum 500 words. Do not include personal or financial information."
    >
      <GoabxTextArea
        name="program"
        onChange={(e) => setValue(e.value)}
        value={value}
        width="100%"
        rows={6}
        maxCount={500}
        countBy="word"
      />
    </GoabxFormItem>
  );
}
