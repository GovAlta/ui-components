import { useState } from "react";
import { GoabFormItem, GoabInput, GoabText } from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function LimitTheWidthOfHelperText() {
  const [value, setValue] = useState("");

  const helpText = (
    <GoabText maxWidth="30ch" mt="none" mb="none">
      Enter your full legal name exactly as it appears on your government-issued
      identification.
    </GoabText>
  );

  return (
    <GoabFormItem label="Legal name" helpText={helpText}>
      <GoabInput
        name="legalName"
        value={value}
        onChange={(detail: GoabInputOnChangeDetail) => setValue(detail.value)}
      />
    </GoabFormItem>
  );
}
