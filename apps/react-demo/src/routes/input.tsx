import { GoAInput, GoAInputDate, GoAInputDateTime, GoAInputNumber, GoAInputTime } from '@abgov/react-components';
import { format } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';

export default function Input() {

  const [date, setDate] = useState<Date>(new Date());
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(new Date());

  function noop() {
    // noop
  }

  function onDateChange(_name: string, value: Date) {
    console.log("onDateChange", value)
    setDate(value)
  }

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <>
      <h1>Input</h1>
      <h2>Basic</h2>
      <GoAInput
        name=""
        value=""
        type="text"
        onChange={noop}
      />
      <GoAInputNumber
        name=""
        placeholder="Number"
        value={0}
        min={0}
        max={10}
        step={2}
        onChange={noop}
      />

      <h4>Date from string value</h4>
      <GoAInputDate
        name="Date from string value"
        value={date.toISOString()}
        onChange={onDateChange}
      />
      <h4>Date from Date value</h4>
      <GoAInputDate
        name="Date"
        value={date}
        onChange={onDateChange}
      />
      <h4>DateTime from string value</h4>
      <GoAInputDateTime
        name="Date Time"
        value={date.toISOString()}
        onChange={onDateChange}
      />
      <h4>DateTime from Date value</h4>
      <GoAInputDateTime
        name="Date Time"
        value={date}
        onChange={onDateChange}
      />

      Time from Date value
      <GoAInputTime
        name="Time from date value"
        value={date}
        onChange={onDateChange}
      />

      Time from string datetime ISO 8601 value
      <GoAInputTime
        name="Time w/ string datetime ISO 8601 value"
        value={date.toISOString()}
        onChange={onDateChange}
      />

      Time from string mm:ss value
      <GoAInputTime
        name="Time from string mm:ss value"
        value={format(date, "hh:mm")}
        onChange={onDateChange}
        step={1}
      />
  
      <h4>Date with a min and max and string values</h4>
      <GoAInputDate
        name="Date with min max"
        value={date.toISOString()}
        min={minDate.toISOString()}
        max={maxDate.toISOString()}
        onChange={onDateChange}
      />
      <h4>Date with a min and max and Date values</h4>
      <GoAInputDate
        name="Date with min max"
        value={date}
        min={minDate}
        max={maxDate}
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
      <GoAInput
        name=""
        value=""
        onChange={noop}
        type="text"
        error={true}
      />

      <h2>Focus</h2>
      <GoAInput
        name=""
        value=""
        onChange={noop}
        type="text"
      />

      <h2>Character count</h2>
      <GoAInput
        name="firstname"
        value=""
        onChange={noop}
        type="text"
        maxCharCount={20}
      />

      <h2>Character count with limit</h2>
      <GoAInput
        name="firstname"
        value=""
        onChange={noop}
        type="text"
        showCounter={true}
        maxCharCount={20}
      />

      <h2>Prefix and Suffix</h2>
      <GoAInput name="input" value="" prefix="$" onChange={noop} />
      <GoAInput name="input" value="" suffix="items" onChange={noop} />
      <GoAInput name="input" value="" prefix="$" suffix="per item" onChange={noop} />
    </>
  );
}

