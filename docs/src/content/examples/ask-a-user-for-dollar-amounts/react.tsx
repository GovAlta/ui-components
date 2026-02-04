import { useState } from "react";
import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";

export function AskAUserForDollarAmounts() {
  const [tuitionAmount, setTuitionAmount] = useState("");
  const [suppliesAmount, setSuppliesAmount] = useState("");
  const [othersAmount, setOthersAmount] = useState("");

  return (
    <>
      <GoabxFormItem label="Tuition">
        <GoabxInput
          onChange={(e) => setTuitionAmount(e.value)}
          value={tuitionAmount}
          name="tuitionAmount"
          leadingContent="$"
        />
      </GoabxFormItem>
      <GoabxFormItem label="Books/Supplies/Instruments" mt="l">
        <GoabxInput
          onChange={(e) => setSuppliesAmount(e.value)}
          value={suppliesAmount}
          name="suppliesAmount"
          leadingContent="$"
        />
      </GoabxFormItem>
      <GoabxFormItem label="Other costs" mt="l">
        <GoabxInput
          onChange={(e) => setOthersAmount(e.value)}
          value={othersAmount}
          name="othersAmount"
          leadingContent="$"
        />
      </GoabxFormItem>
    </>
  );
}
