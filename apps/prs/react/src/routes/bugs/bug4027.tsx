import { useState } from "react";
import { GoabDatePicker, GoabInputNumber, GoabText } from "@abgov/react-components";

export function Bug4027Route() {
  const [value, setValue] = useState<string>("2025-06-15");
  const [comparisonValue, setComparisonValue] = useState<number>(42);

  return (
    <div>
      <GoabText tag="h1" mt="m" mb="m">
        Bug #4027: Day and Year number inputs should hide the spinner arrows
      </GoabText>
      <GoabText tag="p" mb="l">
        The Day (DD) and Year (YYYY) fields in the input-type DatePicker stay as
        type="number" (numeric keypad on mobile, native validation), but the up/down
        spinner arrows are now hidden via CSS. Other type="number" inputs elsewhere keep
        their spinner buttons. The emitted value is unchanged.
      </GoabText>

      <GoabDatePicker
        name="dob"
        type="input"
        value={value}
        onChange={(detail) => setValue(detail.valueStr)}
      />

      <GoabText tag="p" mt="l">
        Selected value: {value || "(none)"}
      </GoabText>

      <GoabText tag="h2" mt="2xl" mb="m">
        Comparison: plain type="number" input
      </GoabText>
      <GoabText tag="p" mb="l">
        This is an unrelated GoabInputNumber. It should still show its up/down spinner
        arrows, confirming the fix above is scoped to DatePicker's Day and Year fields
        only.
      </GoabText>
      <GoabInputNumber
        name="comparison-number"
        value={comparisonValue}
        onChange={(detail) => setComparisonValue(detail.value)}
      />
    </div>
  );
}

export default Bug4027Route;
