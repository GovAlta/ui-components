import React, { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabFormItem,
  GoabDatePicker,
} from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2878Route() {
  const [value1, setValue1] = useState<Date | undefined>(undefined);
  const [value2, setValue2] = useState<Date | undefined>(undefined);

  const handleChange1 = (detail: GoabDatePickerOnChangeDetail) => {
    console.log("Firing Calendar DatePicker");
    setValue1(detail.value as Date);
  };

  const handleChange2 = (detail: GoabDatePickerOnChangeDetail) => {
    console.log("Firing Input DatePicker");
    setValue2(detail.value as Date);
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2878: DatePicker onChange and type="input" Test
      </GoabText>
      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="DatePicker (default)">
          <GoabDatePicker name="date1" onChange={handleChange1} value={value1} />
        </GoabFormItem>
        <GoabText size="body-m">Value: {String(value1 ?? "")}</GoabText>
        <GoabFormItem label="DatePicker (type='input')">
          <GoabDatePicker
            name="date2"
            type="input"
            onChange={handleChange2}
            value={value2}
          />
        </GoabFormItem>
        <GoabText size="body-m">Value: {String(value2 ?? "")}</GoabText>
      </GoabBlock>
    </div>
  );
}
