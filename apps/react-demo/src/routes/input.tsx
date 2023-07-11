import {
  GoAFormItem,
  GoAInput,
  GoAInputDate,
  GoAInputDateTime,
  GoAInputTime,
} from "@abgov/react-components";
import * as React from "react";

import type { GoADate } from "@abgov/react-components";
import { useState } from "react";

export default function Input() {
  const [date, setDate] = useState<GoADate>("2022-08-08");
  const [time, setTime] = useState<string>("12:12");
  const [minDate, _setMinDate] = useState<Date>(new Date());
  const [maxDate, _setMaxDate] = useState<Date>(new Date());

  function noop() {
    // noop
  }

  function onDateChange(_name: string, value: GoADate) {
    setDate(value);
  }

  function onTimeChange(_name: string, value: string) {
    setTime(value);
  }

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <>
      <h4>Date with a min and max and Date values</h4>
      <GoAInputDate
        name="Date with min max"
        value={date}
        min={minDate}
        max={maxDate}
        onChange={onDateChange}
      />
      <GoAFormItem label="Max Length" helpText={"Max length is 10"}>
        <GoAInput
          maxLength={10}
          name="Max Length Value"
          onChange={noop}
          value=""
        />
      </GoAFormItem>

      <h4>Time from Date value</h4>
      <GoAInputTime
        name="Time from date value"
        value={time}
        onChange={onTimeChange}
      />

      <h4>DateTime value</h4>
      <GoAInputDateTime
        name="Date from datetime value"
        value={date}
        onChange={onDateChange}
      />

      <h2>Icons</h2>
      <GoAInput
        name=""
        value=""
        onChange={noop}
        type="text"
        leadingIcon="finger-print"
      />

      <GoAInput
        name=""
        value=""
        onChange={noop}
        type="text"
        trailingIcon="finger-print"
      />

      <h2>Icon Buttons</h2>
      <GoAInput
        trailingIcon="finger-print"
        name=""
        value=""
        onChange={noop}
        type="text"
        onTrailingIconClick={noop}
      />

      <h2>Disabled</h2>
      <GoAInput
        name=""
        value=""
        onChange={noop}
        type="text"
        disabled={true}
        placeholder="Find by name"
      />

      <h2>Error state</h2>
      <GoAInput name="" value="" onChange={noop} type="text" error={true} />

      <h2>Focus</h2>
      <GoAInput name="" value="" onChange={noop} type="text" />

      <h2>Prefix and Suffix</h2>
      <GoAInput name="input" value="" prefix="$" onChange={noop} />
      <GoAInput name="input" value="" suffix="items" onChange={noop} />
      <GoAInput
        name="input"
        value=""
        prefix="$"
        suffix="per item"
        onChange={noop}
      />

      <h2>Disabled Prefix/Suffix</h2>
      <GoAInput
        name="foo"
        value=""
        prefix="$"
        suffix="per item"
        disabled={true}
        onChange={noop}
      />

      <h2>Aria Label</h2>
      <GoAInput
        name=""
        value=""
        ariaLabel="Some random aria label here"
        onChange={noop}
      />
      <h4>Margin Spacing</h4>
      <GoAInputDate
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
        name="Date with min max"
        value={date}
        min={minDate}
        max={maxDate}
        onChange={onDateChange}
      />

      <h2>Leading Content</h2>
      <GoAInput name="input" value="" leadingContent="$" onChange={noop} />
      <h2>Trailing Content</h2>
      <GoAInput name="input" value="" trailingContent="items" onChange={noop} />
      <h2>Leading and Trailing Content</h2>
      <GoAInput
        name="input"
        value=""
        leadingContent="$"
        trailingContent="items"
        onChange={noop}
      />
      <h2>Disabled Leading and Trailing Content</h2>
      <GoAInput
        name="input"
        value=""
        leadingContent="$"
        trailingContent="items"
        onChange={noop}
        disabled={true}
      />
    </>
  );
}
