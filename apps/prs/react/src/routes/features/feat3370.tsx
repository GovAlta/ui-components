import { GoabButton, GoabCalendar, GoabDatePicker } from "@abgov/react-components";
import {
  GoabCalendarOnChangeDetail,
  GoabDatePickerOnChangeDetail,
} from "@abgov/ui-components-common";
import React, { useState } from "react";

export function Feat3370Route() {
  const [calendarValue, setCalendarValue] = useState("");
  const [datePickerValue, setDatePickerValue] = useState("");

  function handleOnChange(details: GoabCalendarOnChangeDetail) {
    setCalendarValue(details.value);
  }

  function handleDatePickerChange(details: GoabDatePickerOnChangeDetail) {
    setDatePickerValue(details.valueStr);
  }

  return (
    <div>
      <h1>
        <a
          href="https://github.com/GovAlta/ui-components/issues/3370"
          target="_blank"
          rel="noreferrer"
        >
          Feature 3370
        </a>
      </h1>
      <div>
        <h2>Clear calendar day selection when year and/or month changes</h2>
        <GoabCalendar onChange={handleOnChange} value={calendarValue} />
        <p>Selected Date: {calendarValue || "none"}</p>
        <GoabButton onClick={() => setCalendarValue("")}>Clear Selection</GoabButton>
      </div>
      <div>
        <GoabDatePicker onChange={handleDatePickerChange} value={datePickerValue} />
        <p>Selected Date: {datePickerValue || "none"}</p>
        <GoabButton onClick={() => setDatePickerValue("")}>Clear Selection</GoabButton>
      </div>
    </div>
  );
}
