import { useState } from "react";
import { GoabxButton, GoabxDatePicker, GoabxFormItem } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

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
      <GoabxFormItem label="Date Picker">
        <GoabxDatePicker
          name="item"
          value={date}
          onChange={(e) => setNewDate(e.value as Date)}
          mb="xl"
        />
      </GoabxFormItem>

      <GoabButtonGroup mt="xs" alignment="start">
        <GoabxButton onClick={setValue}>
          Set Value
        </GoabxButton>
        <GoabxButton onClick={clearValue}>Clear Value</GoabxButton>
      </GoabButtonGroup>
    </>
  );
}
