import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function DocsFormItemRoute() {
  const [firstName, setFirstName] = useState<string>("");

  function handleChange(detail: GoabInputOnChangeDetail) {
    setFirstName(detail.value);
  }

  return (
    <div>
      <h2>Form item</h2>

      <h3>Basic example</h3>
      <GoabFormItem label="First name" mb="l">
        <GoabInput name="firstName" value={firstName} onChange={handleChange} />
      </GoabFormItem>
      <p>Value: {firstName}</p>

      <h3>With help text</h3>
      <GoabFormItem label="Password" helpText="Must be at least 8 characters" mb="l">
        <GoabInput name="password" type="password" width="100%" />
      </GoabFormItem>

      <h3>Required field</h3>
      <GoabFormItem label="Full name" requirement="required" mb="l">
        <GoabInput name="fullName" width="100%" />
      </GoabFormItem>

      <h3>Optional field</h3>
      <GoabFormItem label="Middle name" requirement="optional" mb="l">
        <GoabInput name="middleName" width="100%" />
      </GoabFormItem>

      <h3>With error</h3>
      <GoabFormItem
        label="Email address"
        error="Please enter a valid email address"
        mb="l"
      >
        <GoabInput name="email" type="email" error width="100%" />
      </GoabFormItem>

      <h3>Label sizes</h3>
      <GoabFormItem label="Compact label" labelSize="compact" mb="l">
        <GoabInput name="compact" width="100%" />
      </GoabFormItem>
      <GoabFormItem label="Regular label" labelSize="regular" mb="l">
        <GoabInput name="regular" width="100%" />
      </GoabFormItem>
      <GoabFormItem label="Large label" labelSize="large" mb="l">
        <GoabInput name="large" width="100%" />
      </GoabFormItem>
    </div>
  );
}
