import { useState } from "react";
import { GoabCheckbox, GoabCheckboxList, GoabFormItem } from "@abgov/react-components";

export function SelectOneOrMoreFromAListOfOptions() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <GoabFormItem
      label="How would you like to be contacted?"
      helpText="Choose all that apply"
    >
      <GoabCheckboxList
        name="contactPreferences"
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.value)}
      >
        <GoabCheckbox name="email" text="Email" value="email" />
        <GoabCheckbox name="phone" text="Phone" value="phone" />
        <GoabCheckbox name="text" text="Text message" value="text" />
      </GoabCheckboxList>
    </GoabFormItem>
  );
}
