import { useState } from "react";
import { GoabFormItem, GoabRadioGroup, GoabRadioItem } from "@abgov/react-components";

export function IncludeDescriptionsForItemsInACheckboxList() {
  const [selected, setSelected] = useState("1");

  return (
    <GoabFormItem label="How do you want to sign in?">
      <GoabRadioGroup
        name="selectOne"
        value={selected}
        onChange={(event) => setSelected(event.value)}
      >
        <GoabRadioItem
          value="1"
          label="Sign in as a business"
          description="Use the account associated with the business"
        />
        <GoabRadioItem
          value="2"
          label="Sign in as an individual"
          description="If you don't have a Alberta.ca login, you can create one"
        />
      </GoabRadioGroup>
    </GoabFormItem>
  );
}
