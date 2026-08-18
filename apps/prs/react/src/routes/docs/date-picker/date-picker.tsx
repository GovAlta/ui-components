import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabFormItem,
} from "@abgov/react-components";

export function DocsDatePickerRoute() {
  const [date, setDate] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>("2024-01-15");
  const [appointment, setAppointment] = useState<string | undefined>();
  const [incident, setIncident] = useState<string | undefined>();
  const [birthday, setBirthday] = useState<string | undefined>();
  const [errorDate, setErrorDate] = useState<string | undefined>();

  // Examples
  const [exampleBirthday, setExampleBirthday] = useState<string | undefined>();
  const [resetDate, setResetDate] = useState<string | undefined>();

  const setValue = () => {
    setResetDate("2024-01-15");
  };

  const clearValue = () => setResetDate(undefined);

  return (
    <div>
      <h2>Date picker</h2>

      <h3>Basic date picker</h3>
      <GoabFormItem label="Date" mb="l">
        <GoabDatePicker
          name="date"
          value={date}
          onChange={(detail) => setDate(detail.valueStr || undefined)}
        />
      </GoabFormItem>

      <h3>With initial value</h3>
      <GoabFormItem label="Start date" mb="l">
        <GoabDatePicker
          name="startDate"
          value={startDate}
          onChange={(detail) => setStartDate(detail.valueStr || undefined)}
        />
      </GoabFormItem>

      <h3>With date range</h3>
      <GoabFormItem
        label="Appointment date"
        helpText="Select a date within the next 7 days"
        mb="l"
      >
        <GoabDatePicker
          name="appointment"
          min="2024-03-01"
          max="2024-03-07"
          value={appointment}
          onChange={(detail) => setAppointment(detail.valueStr || undefined)}
        />
      </GoabFormItem>

      <h3>Input type</h3>
      <GoabFormItem label="What day was the incident?" mb="l">
        <GoabDatePicker
          name="incident"
          type="calendar"
          value={incident}
          onChange={(detail) => setIncident(detail.valueStr || undefined)}
        />
      </GoabFormItem>
      <GoabFormItem label="What is your birthday?" mb="l">
        <GoabDatePicker
          name="birthday"
          type="input"
          value={birthday}
          onChange={(detail) => setBirthday(detail.valueStr || undefined)}
        />
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Locked date" mb="l">
        <GoabDatePicker name="locked" value="2024-01-01" disabled />
      </GoabFormItem>
      <GoabFormItem label="Date with error" error="Please select a valid date" mb="l">
        <GoabDatePicker
          name="error"
          error
          value={errorDate}
          onChange={(detail) => setErrorDate(detail.valueStr || undefined)}
        />
      </GoabFormItem>

      <h2>Examples</h2>

      <h3>Ask a user for a birthday</h3>
      <GoabFormItem label="What is your date of birth?">
        <GoabDatePicker
          name="birthdate"
          type="input"
          value={exampleBirthday}
          onChange={(e) => setExampleBirthday(e.valueStr || undefined)}
        />
      </GoabFormItem>

      <h3>Reset date picker field</h3>
      <GoabFormItem label="Date Picker">
        <GoabDatePicker
          name="item"
          value={resetDate}
          onChange={(e) => setResetDate(e.valueStr || undefined)}
          mb="xl"
        />
      </GoabFormItem>
      <GoabButtonGroup mt="xs" alignment="start">
        <GoabButton onClick={setValue}>Set Value</GoabButton>
        <GoabButton onClick={clearValue}>Clear Value</GoabButton>
      </GoabButtonGroup>
    </div>
  );
}
