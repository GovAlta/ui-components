import React from "react";
import { GoabFormItem } from "@abgov/react-components";
import { GoabDatePicker } from "@abgov/react-components";
import { GoabBlock } from "@abgov/react-components";
import { GoabText } from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function Feat2682Route() {
  const handleDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    console.log("DatePicker onChange event:", detail);
  };

  // Calculate min and max dates (one month before and after today)
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1" size="heading-l">
        Feature 2682 - DatePicker Manual Testing
      </GoabText>

      <GoabText tag="p" size="body-m">
        This test demonstrates various DatePicker configurations with FormItem wrappers.
        Check the browser console for onChange events.
      </GoabText>

      {/* Test 1: Default DatePicker */}
      <GoabFormItem label="Test 1: Default DatePicker (no special properties)">
        <GoabDatePicker name="default-datepicker" onChange={handleDateChange} />
      </GoabFormItem>

      {/* Test 2: Disabled DatePicker */}
      <GoabFormItem label="Test 2: Disabled DatePicker">
        <GoabDatePicker
          name="disabled-datepicker"
          disabled={true}
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 3: Input type DatePicker */}
      <GoabFormItem label="Test 3: Input type DatePicker">
        <GoabDatePicker
          name="input-type-datepicker"
          type="input"
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 4: Input type and disabled DatePicker */}
      <GoabFormItem label="Test 4: Input type and disabled DatePicker">
        <GoabDatePicker
          name="input-disabled-datepicker"
          type="input"
          disabled={true}
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 5: DatePicker with min and max dates */}
      <GoabFormItem label="Test 5: DatePicker with min/max dates (one month range)">
        <GoabDatePicker
          name="min-max-datepicker"
          min={minDate}
          max={maxDate}
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 6: Input type DatePicker with min and max dates */}
      <GoabFormItem label="Test 6: Input type DatePicker with min/max dates">
        <GoabDatePicker
          name="input-min-max-datepicker"
          type="input"
          min={minDate}
          max={maxDate}
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 7: DatePicker with error=true */}
      <GoabFormItem label="Test 7: DatePicker with error=true">
        <GoabDatePicker
          name="error-false-datepicker"
          error={true}
          onChange={handleDateChange}
        />
      </GoabFormItem>

      {/* Test 8: Input type DatePicker with error=true */}
      <GoabFormItem label="Test 8: Input type DatePicker with error=true">
        <GoabDatePicker
          name="input-error-false-datepicker"
          type="input"
          error={true}
          onChange={handleDateChange}
        />
      </GoabFormItem>
    </GoabBlock>
  );
}
