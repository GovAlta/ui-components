import { useState } from "react";
import { GoabDatePicker, GoabFormItem } from "@abgov/react-components";

export function AskForBirthday() {
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);

  return (
    <GoabFormItem label="What is your date of birth?">
      <GoabDatePicker
        name="birthdate"
        type="input"
        value={birthdate}
        onChange={(e) => setBirthdate(e.value)}
      />
    </GoabFormItem>
  );
}
