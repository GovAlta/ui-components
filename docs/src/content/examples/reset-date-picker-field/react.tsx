import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabFormItem,
} from "@abgov/react-components";

export function ResetDatePickerField() {
  const [date, setDate] = useState<string | undefined>();

  function setValue() {
    setDate("2024-01-15");
  }

  function clearValue() {
    setDate(undefined);
  }

  return (
    <>
      <GoabFormItem label="Date Picker">
        <GoabDatePicker
          name="item"
          value={date}
          onChange={(e) => setDate(e.valueStr || undefined)}
          mb="xl"
        />
      </GoabFormItem>

      <GoabButtonGroup mt="xs" alignment="start">
        <GoabButton onClick={setValue}>Set Value</GoabButton>
        <GoabButton onClick={clearValue}>Clear Value</GoabButton>
      </GoabButtonGroup>
    </>
  );
}
