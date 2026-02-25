import { useState } from "react";
import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { GoabCheckboxList } from "@abgov/react-components";

export function SelectOneOrMoreFromAListOfOptions() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <GoabxFormItem
      label="How would you like to be contacted?"
      helpText="Choose all that apply"
    >
      <GoabCheckboxList
        name="contactPreferences"
        value={selectedOptions}
        onChange={(e) => setSelectedOptions(e.detail.value)}
      >
        <GoabxCheckbox name="email" text="Email" value="email" />
        <GoabxCheckbox name="phone" text="Phone" value="phone" />
        <GoabxCheckbox name="text" text="Text message" value="text" />
      </GoabCheckboxList>
    </GoabxFormItem>
  );
}
