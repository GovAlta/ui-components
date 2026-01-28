import { GoabDatePicker, GoabFormItem, GoabText } from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "libs/common/src/lib/common";
import { useState } from "react";

export function Bug3305Route() {
  const [calendarValue, setCalendarValue] = useState<string | Date | undefined>(
    undefined,
  );
  const [inputValue, setInputValue] = useState<string | Date | undefined>(undefined);

  function handleCalendarChange(event: GoabDatePickerOnChangeDetail) {
    console.log("Calendar changed:", event);
    setCalendarValue(event.valueStr);
  }

  function handleInputChange(event: GoabDatePickerOnChangeDetail) {
    console.log("Input changed:", event);
    setInputValue(event.valueStr);
  }

  return (
    <div style={{ width: "1024px", margin: "0 auto", padding: "2rem" }}>
      <GoabText size="heading-l" mb="xl">
        Bug 3305: Can't Select February
      </GoabText>
      <GoabText size="body-m" mb="xl">
        After selecting January 31 you cannot select a date in February.
        <ol>
          <li>
            On the date picker Select a date, select any month with more than 28 days,
            then select a date larger than 28.
          </li>
          <li>
            Open the date picker again, select the month of February, notice the month is
            selected in the Dropdown, but the month displayed in the calendar didn't
            change.
          </li>
          <li>
            Select any date, notice it selects the date in the previously selected month
          </li>
        </ol>
      </GoabText>
      <GoabFormItem label="Date picker (calendar)" mb="xl">
        <GoabDatePicker
          name="bug-3275"
          type="calendar"
          value={calendarValue}
          onChange={handleCalendarChange}
        />
      </GoabFormItem>
      <GoabText size="body-m" mb="xl">
        Calendar date: {calendarValue?.toString() || "None"}
      </GoabText>
      <GoabFormItem label="Date picker (input)" mb="xl">
        <GoabDatePicker
          name="bug-3275"
          type="input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </GoabFormItem>
      <GoabText size="body-m" mb="xl">
        {" "}
        Input date: {inputValue?.toString() || "None"}{" "}
      </GoabText>
    </div>
  );
}
