import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabFormItem,
} from "@abgov/react-components";
import React, { useState } from "react";

export function Bug3275Route() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div>
      <p>
        Select a value with the DatePicker and it should show in "Current value" below.
        Changing the Month to "--select a month--" will clear the value.
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
        <GoabButton size="compact" type="secondary" onClick={() => setInputValue("")}>
          Clear programmatically
        </GoabButton>
      </GoabButtonGroup>
      <div>
        <p>
          <b>Note:</b> The button clears the value in the form but does not change the
          DatePicker when <code>type=input</code>. Its just for testing.
        </p>
      </div>

      <div>
        Current value: <strong>{inputValue || '"" (empty)'}</strong>
      </div>
    </div>
  );
}
