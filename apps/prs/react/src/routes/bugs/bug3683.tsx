import { useState } from "react";
import { GoabFormItem, GoabInput, GoabBlock, GoabText } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function Bug3683Route() {
  const [dateVal, setDateVal] = useState("2025-06-09");
  const [timeVal, setTimeVal] = useState("09:30");
  const [datetimeVal, setDatetimeVal] = useState("2025-06-09T09:30");
  const [monthVal, setMonthVal] = useState("2025-06");
  const [weekVal, setWeekVal] = useState("2025-W23");
  const [textVal, setTextVal] = useState("Reference text value");

  return (
    <GoabBlock direction="column" gap="l" mt="l">
      <GoabText tag="h1" mt="none">Bug #3683: Input date/time vertical alignment</GoabText>
      <GoabText tag="p">
        The text value in date and time input types should be vertically centered in the
        input box, matching how type=text renders. Compare each type below against the
        reference text input.
      </GoabText>

      <GoabFormItem label="Reference: type=text">
        <GoabInput
          name="text"
          type="text"
          value={textVal}
          onChange={(d: GoabInputOnChangeDetail) => setTextVal(d.value)}
        />
      </GoabFormItem>

      <GoabFormItem label="type=date">
        <GoabInput
          name="date"
          type="date"
          value={dateVal}
          onChange={(d: GoabInputOnChangeDetail) => setDateVal(d.value)}
        />
      </GoabFormItem>

      <GoabFormItem label="type=time">
        <GoabInput
          name="time"
          type="time"
          value={timeVal}
          onChange={(d: GoabInputOnChangeDetail) => setTimeVal(d.value)}
        />
      </GoabFormItem>

      <GoabFormItem label="type=datetime-local">
        <GoabInput
          name="datetime-local"
          type="datetime-local"
          value={datetimeVal}
          onChange={(d: GoabInputOnChangeDetail) => setDatetimeVal(d.value)}
        />
      </GoabFormItem>

      <GoabFormItem label="type=month">
        <GoabInput
          name="month"
          type="month"
          value={monthVal}
          onChange={(d: GoabInputOnChangeDetail) => setMonthVal(d.value)}
        />
      </GoabFormItem>

      <GoabFormItem label="type=week">
        <GoabInput
          name="week"
          type="week"
          value={weekVal}
          onChange={(d: GoabInputOnChangeDetail) => setWeekVal(d.value)}
        />
      </GoabFormItem>
    </GoabBlock>
  );
}

export default Bug3683Route;
