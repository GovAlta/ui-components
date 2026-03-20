import { useState } from "react";
import {
  GoabxButton,
  GoabxFormItem,
  GoabxInput,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";
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
      <GoabxFormItem label="Name" requirement="required">
        <GoabxInput
          name="input"
          type="text"
          onChange={handleInputChange}
          value={inputValue}
          width="100%"
        />
      </GoabxFormItem>

      <GoabButtonGroup alignment="start" mt="xl">
        <GoabxButton disabled={inputValue.trim() === ""} onClick={handleConfirm}>
          Confirm
        </GoabxButton>
        <GoabxButton type="secondary" onClick={handleCancel}>
          Cancel
        </GoabxButton>
      </GoabButtonGroup>
    </form>
  );
}
