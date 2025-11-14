import { useState } from "react";
import { GoabDatePicker, GoabBlock } from "@abgov/react-components";
import { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2473Route() {
  // Date picker 1: Default value of 1 month in the past
  const [datePicker1Value, setDatePicker1Value] = useState<Date | undefined>(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return oneMonthAgo;
  });
  const [datePicker1Display, setDatePicker1Display] = useState(() =>
    formatDate(datePicker1Value),
  );

  // Date picker 2: Min/max constraints (2 months past to 2 months future)
  const [datePicker2Value, setDatePicker2Value] = useState<Date | undefined>(undefined);
  const [datePicker2Display, setDatePicker2Display] = useState("No date selected");
  const [datePicker2Min] = useState(() => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return twoMonthsAgo;
  });
  const [datePicker2Max] = useState(() => {
    const twoMonthsFuture = new Date();
    twoMonthsFuture.setMonth(twoMonthsFuture.getMonth() + 2);
    return twoMonthsFuture;
  });

  // Date picker 3: Input type
  const [datePicker3Value, setDatePicker3Value] = useState<Date | undefined>(undefined);
  const [datePicker3Display, setDatePicker3Display] = useState("No date selected");

  const handleDatePicker1Change = (detail: GoabDatePickerOnChangeDetail) => {
    const value = detail.value as Date | undefined;
    setDatePicker1Value(value);
    setDatePicker1Display(formatDate(value));
  };

  const handleDatePicker2Change = (detail: GoabDatePickerOnChangeDetail) => {
    const value = detail.value as Date | undefined;
    setDatePicker2Value(value);
    setDatePicker2Display(formatDate(value));
  };

  const handleDatePicker3Change = (detail: GoabDatePickerOnChangeDetail) => {
    const value = detail.value as Date | undefined;
    setDatePicker3Value(value);
    setDatePicker3Display(formatDate(value));
  };

  function formatDate(date: Date | undefined): string {
    if (!date) return "No date selected";

    // Validate that date is actually a Date object and is valid
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <GoabBlock gap="xl" direction="column">
      <h1>Bug 2473: Date Picker Ordinal Suffix Test</h1>

      <p>
        This test page is for manually testing GitHub issue{" "}
        <a
          href="https://github.com/GovAlta/ui-components/issues/2473"
          target="_blank"
          rel="noopener noreferrer"
        >
          #2473
        </a>
        : "Remove ordinal suffixes from date picker display"
      </p>

      <p>
        <strong>Expected Behavior:</strong> Date picker should display dates in the format
        "Month Day, Year" without ordinal suffixes (e.g., "July 10, 2025" instead of "July
        10th, 2025")
      </p>

      {/* Test 1: Date Picker with Default Value (1 month in the past) */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 1: Date Picker with Default Value</h2>
        <p>This date picker has a default value set to 1 month in the past:</p>

        <GoabDatePicker
          name="datePicker1"
          value={datePicker1Value}
          testId="bug2473-date-picker-1"
          onChange={handleDatePicker1Change}
        />

        <GoabBlock gap="s" direction="column">
          <strong>Selected Value:</strong>
          <span>{datePicker1Display}</span>
        </GoabBlock>
      </GoabBlock>

      {/* Test 2: Date Picker with Min/Max Constraints */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 2: Date Picker with Min/Max Constraints</h2>
        <p>
          This date picker has constraints: min = 2 months in the past, max = 2 months in
          the future:
        </p>

        <GoabDatePicker
          name="datePicker2"
          value={datePicker2Value}
          min={datePicker2Min}
          max={datePicker2Max}
          testId="bug2473-date-picker-2"
          onChange={handleDatePicker2Change}
        />

        <GoabBlock gap="s" direction="column">
          <strong>Selected Value:</strong>
          <span>{datePicker2Display}</span>
        </GoabBlock>
      </GoabBlock>

      {/* Test 3: Date Picker with Input Type */}
      <GoabBlock gap="m" direction="column">
        <h2>Test 3: Date Picker with Input Type</h2>
        <p>This date picker uses type="input" instead of the default calendar type:</p>

        <GoabDatePicker
          name="datePicker3"
          value={datePicker3Value}
          type="input"
          testId="bug2473-date-picker-3"
          onChange={handleDatePicker3Change}
        />

        <GoabBlock gap="s" direction="column">
          <strong>Selected Value:</strong>
          <span>{datePicker3Display}</span>
        </GoabBlock>
      </GoabBlock>

      {/* Expected vs Actual Behavior */}
      <GoabBlock gap="m" direction="column">
        <h2>Expected vs Actual Behavior</h2>

        <GoabBlock gap="s" direction="column">
          <h3>Expected Behavior (After Fix)</h3>
          <ul>
            <li>
              Date picker displays dates as "Month Day, Year" (e.g., "July 10, 2025")
            </li>
            <li>No ordinal suffixes (st, nd, rd, th) in the display</li>
            <li>Consistent formatting across all date picker types</li>
            <li>No impact on date input or validation functionality</li>
          </ul>
        </GoabBlock>

        <GoabBlock gap="s" direction="column">
          <h3>Actual Behavior (Before Fix)</h3>
          <ul>
            <li>
              Date picker displays dates with ordinal suffixes (e.g., "July 10th, 2025")
            </li>
            <li>Inconsistent with desired format</li>
            <li>May affect user experience and design consistency</li>
          </ul>
        </GoabBlock>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Bug2473Route;
