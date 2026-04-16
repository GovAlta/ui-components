import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
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
    <GoabFormItem label="First name" helpText={helpText}>
      <GoabInput onChange={onChange} value={value} name="item" />
    </GoabFormItem>
  );
}
