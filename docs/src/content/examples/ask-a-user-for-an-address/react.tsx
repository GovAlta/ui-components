import { useState } from "react";
import {
  GoabxButton,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxInput,
} from "@abgov/react-components/experimental";
import { GoabBlock, GoabButtonGroup, GoabText } from "@abgov/react-components";

export function AskAUserForAnAddress() {
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <>
      <GoabText size="heading-l" mt="none" mb="xl">What is your address?</GoabText>
      <GoabxFormItem label="Street Address">
        <GoabxInput
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.value)}
          width="100%"
        />
      </GoabxFormItem>
      <GoabxFormItem label="Suite or unit #" mt="l">
        <GoabxInput
          name="suite"
          type="text"
          value={suite}
          onChange={(e) => setSuite(e.value)}
          width="100%"
        />
      </GoabxFormItem>
      <GoabxFormItem label="City or town" mt="l">
        <GoabxInput
          name="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.value)}
          width="100%"
        />
      </GoabxFormItem>
      <GoabBlock direction="row" gap="l" mt="l">
        <GoabxFormItem label="Province or territory">
          <GoabxDropdown
            onChange={(e) => setProvince(e.value ?? "")}
            name="province"
            value={province}
          >
            <GoabxDropdownItem label="Alberta" value="AB" />
            <GoabxDropdownItem label="British Columbia" value="BC" />
            <GoabxDropdownItem label="Manitoba" value="MB" />
            <GoabxDropdownItem label="New Brunswick" value="NB" />
            <GoabxDropdownItem label="Newfoundland and Labrador" value="NL" />
            <GoabxDropdownItem label="Northwest Territories" value="NT" />
            <GoabxDropdownItem label="Nova Scotia" value="NS" />
            <GoabxDropdownItem label="Nunavut" value="NU" />
            <GoabxDropdownItem label="Ontario" value="ON" />
            <GoabxDropdownItem label="Prince Edward Island" value="PE" />
            <GoabxDropdownItem label="Quebec" value="QC" />
            <GoabxDropdownItem label="Saskatchewan" value="SK" />
            <GoabxDropdownItem label="Yukon" value="YT" />
          </GoabxDropdown>
        </GoabxFormItem>
        <GoabxFormItem label="Postal Code">
          <GoabxInput
            name="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.value)}
            width="7ch"
          />
        </GoabxFormItem>
      </GoabBlock>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabxButton type="primary" onClick={() => {}}>
          Save and continue
        </GoabxButton>
        <GoabxButton type="secondary" onClick={() => {}}>
          Cancel
        </GoabxButton>
      </GoabButtonGroup>
    </>
  );
}
