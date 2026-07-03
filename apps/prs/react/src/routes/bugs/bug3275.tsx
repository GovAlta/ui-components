import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabFormItem,
} from "@abgov/react-components";
import React, { useState } from "react";

export function Bug3275Route() {
  const [inputValue, setInputValue] = useState<string>("2024-03-15");

  return (
    <div>
      <p>
        Select a value with the DatePicker and it should show in "Current value" below.
        Changing the Month to "—Select a month—" will clear the value. The buttons below
        set/clear the value programmatically, and should update the month/day/year fields.
      </p>

      <GoabFormItem label="Date picker (input)" mb="xl">
        <GoabDatePicker
          name="bug-3275"
          type="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.valueStr ?? "")}
        />
      </GoabFormItem>

      <GoabButtonGroup alignment="start" mb="l">
        <GoabButton size="compact" onClick={() => setInputValue("2024-03-15")}>
          Set March 15
        </GoabButton>
        <GoabButton size="compact" type="secondary" onClick={() => setInputValue("")}>
          Clear programmatically
        </GoabButton>
      </GoabButtonGroup>

      <div>
        Current value: <strong>{inputValue || '"" (empty)'}</strong>
      </div>
    </div>
  );
}
