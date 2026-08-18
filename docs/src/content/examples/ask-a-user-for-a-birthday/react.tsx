import { useState } from "react";
import { GoabDatePicker, GoabFormItem } from "@abgov/react-components";

export function AskForBirthday() {
  const [birthdate, setBirthdate] = useState<string | undefined>();

  return (
    <GoabFormItem label="What is your date of birth?">
      <GoabDatePicker
        name="birthdate"
        type="input"
        value={birthdate}
        onChange={(e) => setBirthdate(e.valueStr || undefined)}
      />
    </GoabFormItem>
  );
}
