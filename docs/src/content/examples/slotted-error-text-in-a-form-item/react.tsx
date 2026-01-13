import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function SlottedErrorTextInAFormItem() {
  const [value, setValue] = useState("");

  const onChange = (detail: GoabInputOnChangeDetail) => {
    setValue(detail.value);
  };

  const errorMessage = (
    <>
      <i>This is </i> slotted <b>error text</b>.
    </>
  );

  return (
    <GoabFormItem label="First name" error={errorMessage}>
      <GoabInput onChange={onChange} value={value} name="item" error={true} />
    </GoabFormItem>
  );
}
