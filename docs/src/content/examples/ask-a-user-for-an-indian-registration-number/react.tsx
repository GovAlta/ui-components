import { useState } from "react";
import {
  GoabBlock,
  GoabFormItem,
  GoabInput,
} from "@abgov/react-components";

export function AskAUserForAnIndianRegistrationNumber() {
  const [bandNo, setBandNo] = useState("");
  const [family, setFamily] = useState("");
  const [position, setPosition] = useState("");

  return (
    <GoabFormItem label="Indian registration number" labelSize="large">
      <GoabBlock gap="m" direction="row">
        <GoabFormItem label="Band #" helpText="3 digits">
          <GoabInput
            onChange={(e) => setBandNo(e.value)}
            value={bandNo}
            name="bandNo"
            width="88px"
            maxLength={3}
          />
        </GoabFormItem>
        <GoabFormItem label="Family" helpText="Up to 5 digits">
          <GoabInput
            onChange={(e) => setFamily(e.value)}
            value={family}
            name="family"
            width="105px"
            maxLength={5}
          />
        </GoabFormItem>
        <GoabFormItem label="Position" helpText="2 digits">
          <GoabInput
            onChange={(e) => setPosition(e.value)}
            value={position}
            name="position"
            width="71px"
            maxLength={2}
          />
        </GoabFormItem>
      </GoabBlock>
    </GoabFormItem>
  );
}
