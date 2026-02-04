import { useState } from "react";
import {
  GoabxCheckbox,
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabCheckboxList } from "@abgov/react-components";

export function RevealInputBasedOnASelection() {
  const [contactMethod, setContactMethod] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState<string[]>([]);

  return (
    <>
      <GoabxFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabxRadioGroup
          name="contactMethod"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.value)}
        >
          <GoabxRadioItem
            value="email"
            label="Email"
            reveal={
              <GoabxFormItem label="Email address">
                <GoabxInput name="email" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="phone"
            label="Phone"
            reveal={
              <GoabxFormItem label="Phone number">
                <GoabxInput name="phoneNumber" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="text"
            label="Text message"
            reveal={
              <GoabxFormItem label="Mobile phone number">
                <GoabxInput name="mobilePhoneNumber" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
        </GoabxRadioGroup>
      </GoabxFormItem>

      <GoabxFormItem label="How would you like to be contacted?" mt="xl">
        <GoabCheckboxList
          name="contactMethods"
          value={checkboxSelection}
          onChange={(e) => setCheckboxSelection(e.values || [])}
        >
          <GoabxCheckbox
            name="email"
            text="Email"
            value="email"
            reveal={
              <GoabxFormItem label="Email address">
                <GoabxInput name="email" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
          <GoabxCheckbox
            name="phone"
            text="Phone"
            value="phone"
            reveal={
              <GoabxFormItem label="Phone number">
                <GoabxInput name="phoneNumber" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
          <GoabxCheckbox
            name="text"
            text="Text message"
            value="text"
            reveal={
              <GoabxFormItem label="Mobile phone number">
                <GoabxInput name="mobilePhoneNumber" onChange={() => {}} value="" />
              </GoabxFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabxFormItem>
    </>
  );
}
