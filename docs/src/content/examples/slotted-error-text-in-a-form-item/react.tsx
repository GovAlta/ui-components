import { useState } from "react";
import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
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
    <GoabxFormItem label="First name" error={errorMessage}>
      <GoabxInput onChange={onChange} value={value} name="item" error={true} />
    </GoabxFormItem>
  );
}
