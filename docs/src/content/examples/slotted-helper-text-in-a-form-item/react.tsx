import { useState } from "react";
import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function SlottedHelperTextInAFormItem() {
  const [value, setValue] = useState("");

  const onChange = (detail: GoabInputOnChangeDetail) => {
    setValue(detail.value);
  };

  const helpText = (
    <>
      <i>This is </i> slotted <b>help text</b>.
    </>
  );

  return (
    <GoabxFormItem label="First name" helpText={helpText}>
      <GoabxInput onChange={onChange} value={value} name="item" />
    </GoabxFormItem>
  );
}
