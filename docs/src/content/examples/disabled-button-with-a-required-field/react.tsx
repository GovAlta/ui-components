import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabInput
} from "@abgov/react-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function DisabledButtonWithARequiredField() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    setInputValue(detail.value);
  };

  const handleConfirm = () => {
    // Handle form submission
    console.log("Form submitted with:", inputValue);
  };

  const handleCancel = () => {
    // Handle cancellation
    setInputValue("");
  };

  return (
    <form>
      <GoabFormItem label="Name" requirement="required">
        <GoabInput
          name="input"
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          width="100%"
        />
      </GoabFormItem>

      <GoabButtonGroup alignment="start" mt="xl">
        <GoabButton disabled={inputValue.trim() === ""} onClick={handleConfirm}>
          Confirm
        </GoabButton>
        <GoabButton type="secondary" onClick={handleCancel}>
          Cancel
        </GoabButton>
      </GoabButtonGroup>
    </form>
  );
}
