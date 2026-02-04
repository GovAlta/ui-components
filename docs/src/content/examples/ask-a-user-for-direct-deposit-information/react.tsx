import { useState } from "react";
import { GoabxButton, GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
import { GoabDetails, GoabText } from "@abgov/react-components";

export function AskAUserForDirectDepositInformation() {
  const [bankNumber, setBankNumber] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <>
      <GoabText as="h1" size="heading-l" mt="none" mb="m">Direct deposit information</GoabText>
      <GoabText as="p" mb="xl">
        Find this information on your bank's website or on your personal cheques.
        Contact your bank if you can't find this information.
      </GoabText>
      <form>
        <GoabxFormItem
          label="Bank or Institution number"
          helpText="3-4 digits in length"
        >
          <GoabxInput
            maxLength={4}
            name="bankNumber"
            onChange={(e) => setBankNumber(e.value)}
            value={bankNumber}
            ariaLabel="bankNumber"
            width="88px"
          />
        </GoabxFormItem>
        <GoabxFormItem
          label="Branch or Transit number"
          helpText="5 digits in length"
          mt="l"
        >
          <GoabxInput
            maxLength={5}
            name="transitNumber"
            onChange={(e) => setTransitNumber(e.value)}
            value={transitNumber}
            ariaLabel="transitNumber"
            width="143px"
          />
        </GoabxFormItem>
        <GoabxFormItem
          label="Account number"
          helpText="3-12 digits in length"
          mt="l"
        >
          <GoabxInput
            maxLength={12}
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.value)}
            ariaLabel="accountNumber"
          />
        </GoabxFormItem>
      </form>
      <GoabDetails heading="Where can I find this information on a personal cheque?" mt="l">
        <GoabText as="p" mb="m">
          Below is an example of where you can find the required bank information
          on a personal cheque.
        </GoabText>
        <img src="https://design.alberta.ca/images/details-demo.jpg" alt="Cheque example showing bank information locations" />
      </GoabDetails>

      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
