import { useState } from "react";
import { GoabxDatePicker, GoabxFormItem } from "@abgov/react-components/experimental";

export function AskForBirthday() {
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);

  return (
    <GoabxFormItem label="What is your date of birth?">
      <GoabxDatePicker
        name="birthdate"
        type="input"
        value={birthdate}
        onChange={(e) => setBirthdate(e.value)}
      />
    </GoabxFormItem>
  );
}
