import { useState } from "react";
import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
import { GoabBlock } from "@abgov/react-components";

export function AskAUserForAnIndianRegistrationNumber() {
  const [bandNo, setBandNo] = useState("");
  const [family, setFamily] = useState("");
  const [position, setPosition] = useState("");

  return (
    <GoabxFormItem label="Indian registration number" labelSize="large">
      <GoabBlock gap="m" direction="row">
        <GoabxFormItem label="Band #" helpText="3 digits">
          <GoabxInput
            onChange={(e) => setBandNo(e.value)}
            value={bandNo}
            name="bandNo"
            width="88px"
            maxLength={3}
          />
        </GoabxFormItem>
        <GoabxFormItem label="Family" helpText="Up to 5 digits">
          <GoabxInput
            onChange={(e) => setFamily(e.value)}
            value={family}
            name="family"
            width="105px"
            maxLength={5}
          />
        </GoabxFormItem>
        <GoabxFormItem label="Position" helpText="2 digits">
          <GoabxInput
            onChange={(e) => setPosition(e.value)}
            value={position}
            name="position"
            width="71px"
            maxLength={2}
          />
        </GoabxFormItem>
      </GoabBlock>
    </GoabxFormItem>
  );
}
