import { useState } from "react";
import {
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";

export function IncludeDescriptionsForItemsInACheckboxList() {
  const [selected, setSelected] = useState("1");

  return (
    <GoabxFormItem label="How do you want to sign in?">
      <GoabxRadioGroup
        name="selectOne"
        value={selected}
        onChange={(event) => setSelected(event.value)}
      >
        <GoabxRadioItem
          value="1"
          label="Sign in as a business"
          description="Use the account associated with the business"
        />
        <GoabxRadioItem
          value="2"
          label="Sign in as an individual"
          description="If you don't have a Alberta.ca login, you can create one"
        />
      </GoabxRadioGroup>
    </GoabxFormItem>
  );
}
