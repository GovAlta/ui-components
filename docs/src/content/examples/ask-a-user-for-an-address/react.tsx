import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabText,
} from "@abgov/react-components";

export function AskAUserForAnAddress() {
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <>
      <GoabText size="heading-l" mt="none" mb="xl">
        What is your address?
      </GoabText>
      <GoabFormItem label="Street Address">
        <GoabInput
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.value)}
          width="100%"
        />
      </GoabFormItem>
      <GoabFormItem label="Suite or unit #" mt="l">
        <GoabInput
          name="suite"
          type="text"
          value={suite}
          onChange={(e) => setSuite(e.value)}
          width="100%"
        />
      </GoabFormItem>
      <GoabFormItem label="City or town" mt="l">
        <GoabInput
          name="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.value)}
          width="100%"
        />
      </GoabFormItem>
      <GoabBlock direction="row" gap="l" mt="l">
        <GoabFormItem label="Province or territory">
          <GoabDropdown
            onChange={(e) => setProvince(e.value ?? "")}
            name="province"
            value={province}
            width="100%"
          >
            <GoabDropdownItem label="Alberta" value="AB" />
            <GoabDropdownItem label="British Columbia" value="BC" />
            <GoabDropdownItem label="Manitoba" value="MB" />
            <GoabDropdownItem label="New Brunswick" value="NB" />
            <GoabDropdownItem label="Newfoundland and Labrador" value="NL" />
            <GoabDropdownItem label="Northwest Territories" value="NT" />
            <GoabDropdownItem label="Nova Scotia" value="NS" />
            <GoabDropdownItem label="Nunavut" value="NU" />
            <GoabDropdownItem label="Ontario" value="ON" />
            <GoabDropdownItem label="Prince Edward Island" value="PE" />
            <GoabDropdownItem label="Quebec" value="QC" />
            <GoabDropdownItem label="Saskatchewan" value="SK" />
            <GoabDropdownItem label="Yukon" value="YT" />
          </GoabDropdown>
        </GoabFormItem>
        <GoabFormItem label="Postal Code">
          <GoabInput
            name="postalCode"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.value)}
            width="7ch"
          />
        </GoabFormItem>
      </GoabBlock>
      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={() => {}}>
          Save and continue
        </GoabButton>
        <GoabButton type="secondary" onClick={() => {}}>
          Cancel
        </GoabButton>
      </GoabButtonGroup>
    </>
  );
}
