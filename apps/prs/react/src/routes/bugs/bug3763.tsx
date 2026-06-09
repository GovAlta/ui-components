import { useState } from "react";
import {
  GoabContainer,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
} from "@abgov/react-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
} from "@abgov/ui-components-common";

const stackStyle = {
  display: "grid",
  gap: "1.5rem",
};

// Narrow parent so the open-state overflow is obvious against the viewport.
const narrowParentStyle = {
  width: "320px",
  border: "1px dashed var(--goa-color-greyscale-400)",
  padding: "1rem",
};

// Wide parent so the input ends up wider than the calendar's natural width.
const wideParentStyle = {
  width: "800px",
  border: "1px dashed var(--goa-color-greyscale-400)",
  padding: "1rem",
};

export function Bug3763Route() {
  const [province, setProvince] = useState("");
  const [halfProvince, setHalfProvince] = useState("");
  const [date, setDate] = useState("");
  const [halfDate, setHalfDate] = useState("");
  const [wideDate, setWideDate] = useState("");
  const [invalidDate, setInvalidDate] = useState("");

  const handleProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setProvince(detail.value || "");
  };

  const handleHalfProvinceChange = (detail: GoabDropdownOnChangeDetail) => {
    setHalfProvince(detail.value || "");
  };

  const handleDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setDate(detail.valueStr || "");
  };

  const handleHalfDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setHalfDate(detail.valueStr || "");
  };

  const handleWideDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setWideDate(detail.valueStr || "");
  };

  const handleInvalidDateChange = (detail: GoabDatePickerOnChangeDetail) => {
    setInvalidDate(detail.valueStr || "");
  };

  return (
    <div style={stackStyle}>
      <div style={stackStyle}>
        <GoabText tag="h1">3763 - Percentage width expands open state too much</GoabText>
        <GoabText>
          When a Dropdown (or DatePicker) is given a percentage width, the closed input
          sizes correctly, but the open menu expands far past the parent and the viewport.
          The percentage is passed straight to the Popover container, where it no longer
          resolves against the Dropdown's parent.
        </GoabText>
        <GoabText>
          Expected: the open width should match the closed width. Open each control below
          and compare the open menu width to the dashed parent box.
        </GoabText>
      </div>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            Dropdown with width="100%"
          </GoabText>
          <GoabText>
            The dropdown should be exactly as wide as the 320px dashed box, both closed and
            open. Buggy behaviour: the open menu blows past the box.
          </GoabText>
        </div>

        <div style={narrowParentStyle}>
          <GoabDropdown
            name="bug3763-province-full"
            placeholder="Select a province"
            width="100%"
            value={province}
            onChange={handleProvinceChange}
          >
            <GoabDropdownItem value="alberta" label="Alberta" />
            <GoabDropdownItem value="british-columbia" label="British Columbia" />
            <GoabDropdownItem value="manitoba" label="Manitoba" />
            <GoabDropdownItem value="ontario" label="Ontario" />
            <GoabDropdownItem value="quebec" label="Quebec" />
            <GoabDropdownItem
              value="long"
              label="Newfoundland and Labrador Provincial Vital Statistics and Records Registration Office"
            />
          </GoabDropdown>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            Dropdown with width="50%"
          </GoabText>
          <GoabText>
            Any percentage triggers the bug, not just 100%. The closed input is half the
            box; the open menu should match it.
          </GoabText>
        </div>

        <div style={narrowParentStyle}>
          <GoabDropdown
            name="bug3763-province-half"
            placeholder="Select a province"
            width="50%"
            value={halfProvince}
            onChange={handleHalfProvinceChange}
          >
            <GoabDropdownItem value="alberta" label="Alberta" />
            <GoabDropdownItem value="british-columbia" label="British Columbia" />
            <GoabDropdownItem value="manitoba" label="Manitoba" />
            <GoabDropdownItem value="ontario" label="Ontario" />
            <GoabDropdownItem value="quebec" label="Quebec" />
            <GoabDropdownItem
              value="long"
              label="Newfoundland and Labrador Provincial Vital Statistics and Records Registration Office"
            />
          </GoabDropdown>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            DatePicker with width="100%"
          </GoabText>
          <GoabText>
            Reported by Vidit: the same percentage-width problem affects the DatePicker.
            The open calendar should not exceed the box width.
          </GoabText>
        </div>

        <div style={narrowParentStyle}>
          <GoabDatePicker
            name="bug3763-date"
            width="100%"
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            DatePicker with width="50%"
          </GoabText>
          <GoabText>
            Case from Benji: with a narrow percentage the input is much smaller than the
            calendar's natural width, so the open calendar cannot match the input and
            overflows the box. Expected: the open calendar should not exceed the maximum
            width, not shrink to the tiny input.
          </GoabText>
        </div>

        <div style={narrowParentStyle}>
          <GoabDatePicker
            name="bug3763-date-half"
            width="50%"
            value={halfDate}
            onChange={handleHalfDateChange}
          />
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            DatePicker with width="100%" in a wide container
          </GoabText>
          <GoabText>
            Opposite case: the input is far wider than the calendar's natural width.
            Expected: the open calendar stays at its natural width (left aligned under the
            input), it should not stretch to fill the wide input.
          </GoabText>
        </div>

        <div style={wideParentStyle}>
          <GoabDatePicker
            name="bug3763-date-wide"
            width="100%"
            value={wideDate}
            onChange={handleWideDateChange}
          />
        </div>
      </GoabContainer>

      <GoabContainer>
        <div style={stackStyle}>
          <GoabText tag="h2" mt="none">
            DatePicker with an invalid width
          </GoabText>
          <GoabText>
            The width "5 0%" (note the stray space) is not a valid CSS dimension. Open the
            browser console: the DatePicker should log an error explaining the width is
            invalid, instead of failing silently.
          </GoabText>
        </div>

        <div style={narrowParentStyle}>
          <GoabDatePicker
            name="bug3763-date-invalid"
            width="5 0%"
            value={invalidDate}
            onChange={handleInvalidDateChange}
          />
        </div>
      </GoabContainer>
    </div>
  );
}

export default Bug3763Route;
