import React, { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabDatePicker,
  GoabDropdown,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
} from "@abgov/react-components";

export function Bug2768Route() {
  const [checkboxDisabled, setCheckboxDisabled] = useState(true);
  const [datePickerDisabled, setDatePickerDisabled] = useState(true);
  const [dropdownDisabled, setDropdownDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [radioDisabled, setRadioDisabled] = useState(true);
  const [textAreaDisabled, setTextAreaDisabled] = useState(true);

  const toggleCheckbox = () => {
    setCheckboxDisabled(!checkboxDisabled);
  };

  const toggleDatePicker = () => {
    setDatePickerDisabled(!datePickerDisabled);
  };

  const toggleDropdown = () => {
    setDropdownDisabled(!dropdownDisabled);
  };

  const toggleInput = () => {
    setInputDisabled(!inputDisabled);
  };

  const toggleRadio = () => {
    setRadioDisabled(!radioDisabled);
  };

  const toggleTextArea = () => {
    setTextAreaDisabled(!textAreaDisabled);
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2769: Enable/Disable Test
      </GoabText>

      <GoabText size="body-m" mb="2xl">
        This test demonstrates the enable/disable functionality of various form
        components. All components start disabled. Click the buttons to enable each
        component.
      </GoabText>

      {/* Checkbox Test */}
      <GoabFormItem label="GoabCheckbox" mb="xl">
        <GoabCheckbox name="checkbox" disabled={checkboxDisabled} />
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleCheckbox} mb="2xl">
        {checkboxDisabled ? "Enable Checkbox" : "Disable Checkbox"}
      </GoabButton>

      {/* DatePicker Test */}
      <GoabFormItem label="GoabDatePicker" mb="xl">
        <GoabDatePicker disabled={datePickerDisabled} />
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleDatePicker} mb="2xl">
        {datePickerDisabled ? "Enable DatePicker" : "Disable DatePicker"}
      </GoabButton>

      {/* Dropdown Test */}
      <GoabFormItem label="GoabDropdown" mb="xl">
        <GoabDropdown disabled={dropdownDisabled} />
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleDropdown} mb="2xl">
        {dropdownDisabled ? "Enable Dropdown" : "Disable Dropdown"}
      </GoabButton>

      {/* Input Test */}
      <GoabFormItem label="GoabInput" mb="xl">
        <GoabInput name="input" disabled={inputDisabled} />
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleInput} mb="2xl">
        {inputDisabled ? "Enable Input" : "Disable Input"}
      </GoabButton>

      {/* Radio Test */}
      <GoabFormItem label="GoabRadio" mb="xl">
        <GoabRadioGroup name="radio" disabled={radioDisabled}>
          <GoabRadioItem value="option1" label="Option 1" />
          <GoabRadioItem value="option2" label="Option 2" />
        </GoabRadioGroup>
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleRadio} mb="2xl">
        {radioDisabled ? "Enable Radio" : "Disable Radio"}
      </GoabButton>

      {/* TextArea Test */}
      <GoabFormItem label="GoabTextArea" mb="xl">
        <GoabTextArea name="textarea" disabled={textAreaDisabled} />
      </GoabFormItem>
      <GoabButton type="secondary" onClick={toggleTextArea} mb="2xl">
        {textAreaDisabled ? "Enable TextArea" : "Disable TextArea"}
      </GoabButton>
    </div>
  );
}
