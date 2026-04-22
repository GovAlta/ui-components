import { useState } from "react";
import {
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabInput,
} from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function DocsButtonRoute() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    setInputValue(detail.value);
  };

  const handleConfirm = () => {
    console.log("Form submitted with:", inputValue);
  };

  const handleCancel = () => {
    setInputValue("");
  };

  return (
    <div>
      <h2>Button</h2>

      <h3>Primary button</h3>
      <GoabButton>Submit</GoabButton>

      <h3>Types</h3>
      <GoabButton type="primary">Primary</GoabButton>
      <GoabButton type="secondary">Secondary</GoabButton>
      <GoabButton type="tertiary">Tertiary</GoabButton>

      <h3>Sizes</h3>
      <GoabButton size="normal">Normal</GoabButton>
      <GoabButton size="compact">Compact</GoabButton>

      <h3>With icons</h3>
      <div><GoabButton leadingIcon="add" mb="m">Add item</GoabButton></div>
      <div><GoabButton trailingIcon="arrow-forward" mb="m">Next</GoabButton></div>
      <div><GoabButton leadingIcon="pencil">Edit</GoabButton></div>

      <h3>Destructive</h3>
      <GoabButton variant="destructive">Primary destructive</GoabButton>
      <GoabButton variant="destructive" type="secondary">Secondary destructive</GoabButton>
      <GoabButton variant="destructive" type="tertiary">Tertiary destructive</GoabButton>

      <h3>Inverse</h3>
      <div style={{ backgroundColor: "var(--goa-color-greyscale-700)", padding: "var(--goa-space-l)" }}>
        <GoabButton variant="inverse">Primary inverse</GoabButton>
        <GoabButton variant="inverse" type="secondary">Secondary inverse</GoabButton>
        <GoabButton variant="inverse" type="tertiary">Tertiary inverse</GoabButton>
      </div>

      <h3>Disabled</h3>
      <GoabButton disabled>Disabled primary</GoabButton>
      <GoabButton type="secondary" disabled>Disabled secondary</GoabButton>
      <GoabButton type="tertiary" disabled>Disabled tertiary</GoabButton>

      <h2>Examples</h2>

      <h3>Button with icon</h3>
      <GoabButtonGroup alignment="start">
        <GoabButton leadingIcon="arrow-back">Go back</GoabButton>
        <GoabButton trailingIcon="arrow-forward">Continue</GoabButton>
        <GoabButton type="secondary" leadingIcon="add">Add item</GoabButton>
      </GoabButtonGroup>

      <h3>Disabled button with a required field</h3>
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
    </div>
  );
}
