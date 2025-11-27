import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadInput,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTabs,
  GoabTab,
  GoabTextArea,
  GoabFormItem,
  GoabText,
} from "@abgov/react-components";
import {
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabFileUploadInputOnSelectFileDetail,
  GoabInputOnBlurDetail,
  GoabInputOnChangeDetail,
  GoabInputOnFocusDetail,
  GoabInputOnKeyPressDetail,
  GoabRadioGroupOnChangeDetail,
  GoabTabsOnChangeDetail,
  GoabTextAreaOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnKeyPressDetail,
} from "@abgov/ui-components-common";

export function Bug2977Route() {
  const logEvent = (label: string, detail: unknown) => {
    console.log(label, detail);
  };

  const handleInputChange = (detail: GoabInputOnChangeDetail) =>
    logEvent("input change", detail);
  const handleInputFocus = (detail: GoabInputOnFocusDetail) =>
    logEvent("input focus", detail);
  const handleInputBlur = (detail: GoabInputOnBlurDetail) =>
    logEvent("input blur", detail);
  const handleInputKeyPress = (detail: GoabInputOnKeyPressDetail) =>
    logEvent("input keypress", detail);

  const handleCheckboxChange = (detail: GoabCheckboxOnChangeDetail) =>
    logEvent("checkbox change", detail);

  const handleCheckboxListChange = (detail: GoabCheckboxListOnChangeDetail) => {
    logEvent("checkbox list change", detail);
  };

  const handleDatePickerChange = (detail: GoabDatePickerOnChangeDetail) =>
    logEvent("date picker change", detail);

  const handleDropdownChange = (detail: GoabDropdownOnChangeDetail) =>
    logEvent("dropdown change", detail);

  const handleFileSelect = (detail: GoabFileUploadInputOnSelectFileDetail) =>
    logEvent("file upload select", detail);

  const handleRadioGroupChange = (detail: GoabRadioGroupOnChangeDetail) =>
    logEvent("radio group change", detail);

  const handleTextareaChange = (detail: GoabTextAreaOnChangeDetail) =>
    logEvent("textarea change", detail);
  const handleTextareaKeyPress = (detail: GoabTextAreaOnKeyPressDetail) =>
    logEvent("textarea keypress", detail);
  const handleTextareaBlur = (detail: GoabTextAreaOnBlurDetail) =>
    logEvent("textarea blur", detail);

  const handleTabsChange = (detail: GoabTabsOnChangeDetail) =>
    logEvent("tabs change", detail);

  const handleTabInputOne = (detail: GoabInputOnChangeDetail) => {
    detail.event?.stopPropagation();
    logEvent("tab 1 input change (stopPropagation)", detail);
  };

  const handleTabInputTwo = (detail: GoabInputOnChangeDetail) =>
    logEvent("tab 2 input change", detail);
  const handleTabInputThree = (detail: GoabInputOnChangeDetail) =>
    logEvent("tab 3 input change", detail);

  return (
    <main style={{ display: "grid", gap: "1.5rem", padding: "1.5rem" }}>
      <GoabFormItem label="Input (test onChange, onFocus, onBlur, onKeyPress)" mb="l">
        <GoabInput
          name="demo-input"
          placeholder="Type here"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
        />
      </GoabFormItem>

      <GoabFormItem label="Checkbox (test onChange)" mb="l">
        <GoabCheckbox
          name="demo-checkbox"
          text="Accept terms"
          onChange={handleCheckboxChange}
        />
      </GoabFormItem>

      <GoabFormItem label="Checkbox List (test onChange)" mb="l">
        <GoabCheckboxList name="demo-checkbox-list" onChange={handleCheckboxListChange}>
          <GoabCheckbox name="demo-checkbox-list-1" value="option1" text="Option 1" />
          <GoabCheckbox name="demo-checkbox-list-2" value="option2" text="Option 2" />
          <GoabCheckbox name="demo-checkbox-list-3" value="option3" text="Option 3" />
        </GoabCheckboxList>
      </GoabFormItem>

      <GoabFormItem label="Date Picker (test onChange)">
        <GoabDatePicker name="demo-date" width="20ch" onChange={handleDatePickerChange} />
      </GoabFormItem>

      <GoabFormItem label="Dropdown (test onChange)" mb="l">
        <GoabDropdown
          name="demo-dropdown"
          placeholder="Select an option"
          onChange={handleDropdownChange}
        >
          <GoabDropdownItem value="one" label="Option One" />
          <GoabDropdownItem value="two" label="Option Two" />
          <GoabDropdownItem value="three" label="Option Three" />
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem label="File Upload (test onSelectFile)" mb="l">
        <GoabFileUploadInput
          variant="button"
          accept=".txt"
          onSelectFile={handleFileSelect}
        />
      </GoabFormItem>

      <GoabFormItem label="Radio (test onChange)" mb="l">
        <GoabRadioGroup name="demo-radio" onChange={handleRadioGroupChange}>
          <GoabRadioItem name="demo-radio" value="a" label="Option A" />
          <GoabRadioItem name="demo-radio" value="b" label="Option B" />
          <GoabRadioItem name="demo-radio" value="c" label="Option C" />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabFormItem label="Text Area (test onChange, onKeyPress, onBlur)" mb="l">
        <GoabTextArea
          name="demo-textarea"
          placeholder="Enter multi-line text"
          onChange={handleTextareaChange}
          onKeyPress={handleTextareaKeyPress}
          onBlur={handleTextareaBlur}
        />
      </GoabFormItem>

      <GoabText tag="h1">Testing #2977 Issue</GoabText>
      <GoabText tag="p">
        Tab 1 input should not fire the Tab onChange. Tab 2 and 3 will fire the Tab
        onChange.
      </GoabText>
      <GoabTabs onChange={handleTabsChange}>
        <GoabTab heading="Tab 1 - stopPropagation">
          <GoabText tag="p">Type here to confirm onChange can stop bubbling.</GoabText>
          <GoabInput
            name="tab1-input"
            placeholder="Tab 1 input"
            onChange={handleTabInputOne}
          />
        </GoabTab>
        <GoabTab heading="Tab 2 - normal bubbling">
          <GoabText tag="p">Type here to see bubbling continue.</GoabText>
          <GoabInput
            name="tab2-input"
            placeholder="Tab 2 input"
            onChange={handleTabInputTwo}
          />
        </GoabTab>
        <GoabTab heading="Tab 3 - normal bubbling">
          <GoabText tag="p">Type here to see bubbling continue.</GoabText>
          <GoabInput
            name="tab3-input"
            placeholder="Tab 3 input"
            onChange={handleTabInputThree}
          />
        </GoabTab>
      </GoabTabs>
    </main>
  );
}

export default Bug2977Route;
