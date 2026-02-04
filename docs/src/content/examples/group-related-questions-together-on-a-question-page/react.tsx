import { useState } from "react";
import {
  GoabxButton,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxInput,
  GoabxLink,
} from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";

export function GroupRelatedQuestionsTogetherOnAQuestionPage() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [townCity, setTownCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabText as="h2" mt="xl" mb="m">Your address</GoabText>
      <GoabText mt="none" mb="xl">This is the home address of the person applying</GoabText>

      <GoabxFormItem label="Address line 1">
        <GoabxInput
          onChange={(event) => setAddressLine1(event.value)}
          value={addressLine1}
          name="address-line-1"
          ariaLabel="Address line 1"
          width="100%"
        />
      </GoabxFormItem>

      <GoabxFormItem label="Address line 2" mt="l">
        <GoabxInput
          onChange={(event) => setAddressLine2(event.value)}
          value={addressLine2}
          name="address-line-2"
          ariaLabel="Address line 2"
          width="100%"
        />
      </GoabxFormItem>

      <GoabxFormItem label="Town or city" mt="l">
        <GoabxInput
          onChange={(event) => setTownCity(event.value)}
          value={townCity}
          name="town-city"
          ariaLabel="Town or city name"
          width="460px"
        />
      </GoabxFormItem>

      <GoabxFormItem label="Province or territory" mt="l" id="provinceLabel">
        <GoabxDropdown
          onChange={(event) => setProvince(event.value ?? "")}
          value={province}
          name="province-territory"
          ariaLabelledBy="provinceLabel"
        >
          <GoabxDropdownItem value="AB" label="Alberta" />
          <GoabxDropdownItem value="BC" label="British Columbia" />
          <GoabxDropdownItem value="MB" label="Manitoba" />
          <GoabxDropdownItem value="NB" label="New Brunswick" />
          <GoabxDropdownItem value="NL" label="Newfoundland and Labrador" />
          <GoabxDropdownItem value="NS" label="Nova Scotia" />
          <GoabxDropdownItem value="ON" label="Ontario" />
          <GoabxDropdownItem value="PE" label="Prince Edward Island" />
          <GoabxDropdownItem value="QC" label="Quebec" />
          <GoabxDropdownItem value="SK" label="Saskatchewan" />
          <GoabxDropdownItem value="NT" label="Northwest Territories" />
          <GoabxDropdownItem value="NU" label="Nunavut" />
          <GoabxDropdownItem value="YT" label="Yukon" />
        </GoabxDropdown>
      </GoabxFormItem>

      <GoabxFormItem label="Postal code" mt="l">
        <GoabxInput
          onChange={(event) => setPostalCode(event.value)}
          value={postalCode}
          name="postal-code"
          width="105px"
        />
      </GoabxFormItem>

      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
