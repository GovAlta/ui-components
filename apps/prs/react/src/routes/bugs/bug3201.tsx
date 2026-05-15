import {
  GoabText,
  GoabFormItem,
  GoabTextarea,
  GoabInput,
  GoabButton,
  GoabButtonGroup,
} from "@abgov/react-components";
import {
  GoabInputOnChangeDetail,
  GoabInputOnBlurDetail,
  GoabTextAreaOnChangeDetail,
  GoabTextAreaOnBlurDetail,
} from "@abgov/ui-components-common";
import { useState } from "react";

export function Bug3201Route() {
  const [inputValue, setInputValue] = useState<string>("");
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [inputChange, setInputChange] = useState<string>("");
  const [inputBlur, setInputBlur] = useState<string>("");
  const [areaChange, setAreaChange] = useState<string>("");
  const [areaBlur, setAreaBlur] = useState<string>("");

  function handleInputChange(detail: GoabInputOnChangeDetail) {
    setInputValue(detail.value);
    setInputChange("Input Change event fired");
    setTimeout(() => {
      setInputChange("");
    }, 500);
    console.log("Input change event fired");
  }

  function handleInputBlur(detail: GoabInputOnBlurDetail) {
    setInputValue(detail.value);
    setInputBlur("Input Blur event fired");
    setTimeout(() => {
      setInputBlur("");
    }, 500);
    console.log("Input blur event fired");
  }

  function handleAreaChange(detail: GoabTextAreaOnChangeDetail) {
    setTextAreaValue(detail.value);
    setAreaChange("Text Area Change event fired");
    setTimeout(() => {
      setAreaChange("");
    }, 500);
    console.log("Text Area change event fired");
  }

  function handleAreaBlur(detail: GoabTextAreaOnBlurDetail) {
    setTextAreaValue(detail.value);
    setAreaBlur("Text Area Blur event fired");
    setTimeout(() => {
      setAreaBlur("");
    }, 500);
    console.log("Text area blur event fired");
  }

  function addInputText() {
    setInputValue("Different");
  }

  function addTextAreaText() {
    setTextAreaValue("This is some new text added to the text area");
  }

  return (
    <main>
      <GoabText tag="h1" mb="s">
        #3201: Modify GoabInput onChange to not fire on tab
      </GoabText>
      <GoabText tag="p" mb="s">
        This is to test the GoabInput and GoabTextArea components. Specifically the
        onChange event, it should only fire when a change is detected inside the
        component. It should not fire when you tab out of the component.
      </GoabText>
      <GoabText tag="p" mb="xl">
        You can see the events fire in the UI for 500ms, or you can check the console log.
      </GoabText>
      <GoabFormItem label="Text Area Component" maxWidth="50%">
        <GoabTextarea
          name="area-event"
          onChange={(e) => handleAreaChange(e)}
          onBlur={(e) => handleAreaBlur(e)}
          width="100%"
          value={textAreaValue}
        />
      </GoabFormItem>
      <div>
        Change: {areaChange} || Blur: {areaBlur}
      </div>
      <GoabFormItem label="Input Component" mb="s" maxWidth="50%" mt="xl">
        <GoabInput
          name="input-event"
          onChange={(e) => handleInputChange(e)}
          onBlur={(e) => handleInputBlur(e)}
          width="100%"
          value={inputValue}
        />
      </GoabFormItem>
      <div>
        Change: {inputChange} || Blur: {inputBlur}
      </div>
      <GoabText tag="p" mt="l">
        The buttons below will add text to each component. No change event should be
        fired.
      </GoabText>
      <GoabButtonGroup alignment="start" mt="xl">
        <GoabButton onClick={() => addInputText()}>Add Input Text</GoabButton>
        <GoabButton onClick={() => addTextAreaText()}>Add</GoabButton>
      </GoabButtonGroup>
    </main>
  );
}

export default Bug3201Route;
