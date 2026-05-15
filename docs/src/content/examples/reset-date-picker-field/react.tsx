import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabFormItem,
} from "@abgov/react-components";

export function ResetDatePickerField() {
  const [date, setDate] = useState<Date | undefined>();

  const setNewDate = (value: Date | undefined) => {
    setDate(value);
  };

  function setValue() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    setDate(d);
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
          onChange={(e) => setNewDate(e.value as Date)}
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
