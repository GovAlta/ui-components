import { useState } from "react";
import {
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function GroupRelatedQuestionsTogetherOnAQuestionPage() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [townCity, setTownCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText as="h2" mt="xl" mb="m">Your address</GoabText>
      <GoabText mt="none" mb="xl">This is the home address of the person applying</GoabText>

      <GoabFormItem label="Address line 1">
        <GoabInput
          onChange={(event) => setAddressLine1(event.value)}
          value={addressLine1}
          name="address-line-1"
          ariaLabel="Address line 1"
          width="100%"
        />
      </GoabFormItem>

      <GoabFormItem label="Address line 2" mt="l">
        <GoabInput
          onChange={(event) => setAddressLine2(event.value)}
          value={addressLine2}
          name="address-line-2"
          ariaLabel="Address line 2"
          width="100%"
        />
      </GoabFormItem>

      <GoabFormItem label="Town or city" mt="l">
        <GoabInput
          onChange={(event) => setTownCity(event.value)}
          value={townCity}
          name="town-city"
          ariaLabel="Town or city name"
          width="460px"
        />
      </GoabFormItem>

      <GoabFormItem label="Province or territory" mt="l" id="provinceLabel">
        <GoabDropdown
          onChange={(event) => setProvince(event.value ?? "")}
          value={province}
          name="province-territory"
          ariaLabelledBy="provinceLabel"
        >
          <GoabDropdownItem value="AB" label="Alberta" />
          <GoabDropdownItem value="BC" label="British Columbia" />
          <GoabDropdownItem value="MB" label="Manitoba" />
          <GoabDropdownItem value="NB" label="New Brunswick" />
          <GoabDropdownItem value="NL" label="Newfoundland and Labrador" />
          <GoabDropdownItem value="NS" label="Nova Scotia" />
          <GoabDropdownItem value="ON" label="Ontario" />
          <GoabDropdownItem value="PE" label="Prince Edward Island" />
          <GoabDropdownItem value="QC" label="Quebec" />
          <GoabDropdownItem value="SK" label="Saskatchewan" />
          <GoabDropdownItem value="NT" label="Northwest Territories" />
          <GoabDropdownItem value="NU" label="Nunavut" />
          <GoabDropdownItem value="YT" label="Yukon" />
        </GoabDropdown>
      </GoabFormItem>

      <GoabFormItem label="Postal code" mt="l">
        <GoabInput
          onChange={(event) => setPostalCode(event.value)}
          value={postalCode}
          name="postal-code"
          width="105px"
        />
      </GoabFormItem>

      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>
    </>
  );
}
