import { GoabBlock, GoabDatePicker, GoabFormItem, GoabText } from "@abgov/react-components";
import { useState } from "react";

export function Bug3610Route() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <GoabBlock gap="m" direction="column">
      <GoabText tag="h1" mt="m">
        Bug #3610: DatePicker month dropdown placeholder
      </GoabText>
      <GoabText tag="span">
        The month dropdown placeholder should display em dashes and title case:
        <strong> —Select a month—</strong>
      </GoabText>
      <GoabText tag="span">
        Previously it showed <strong>--select a month--</strong> (hyphens, lowercase).
      </GoabText>

      <GoabFormItem label="What is your birthday?">
        <GoabDatePicker
          name="birthday"
          value={date}
          onChange={({ value }) => setDate(value)}
        />
      </GoabFormItem>
    </GoabBlock>
  );
}

export default Bug3610Route;
