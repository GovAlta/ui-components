import { useState } from "react";
import { GoabFormItem, GoabInput } from "@abgov/react-components";

export function AskAUserForDollarAmounts() {
  const [tuitionAmount, setTuitionAmount] = useState("");
  const [suppliesAmount, setSuppliesAmount] = useState("");
  const [othersAmount, setOthersAmount] = useState("");

  return (
    <>
      <GoabFormItem label="Tuition">
        <GoabInput
          onChange={(e) => setTuitionAmount(e.value)}
          value={tuitionAmount}
          name="tuitionAmount"
          leadingContent="$"
        />
      </GoabFormItem>
      <GoabFormItem label="Books/Supplies/Instruments" mt="l">
        <GoabInput
          onChange={(e) => setSuppliesAmount(e.value)}
          value={suppliesAmount}
          name="suppliesAmount"
          leadingContent="$"
        />
      </GoabFormItem>
      <GoabFormItem label="Other costs" mt="l">
        <GoabInput
          onChange={(e) => setOthersAmount(e.value)}
          value={othersAmount}
          name="othersAmount"
          leadingContent="$"
        />
      </GoabFormItem>
    </>
  );
}
