import { useState } from "react";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function RevealInputBasedOnASelection() {
  const [contactMethod, setContactMethod] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState<string[]>([]);

  return (
    <>
      <GoabFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabRadioGroup
          name="contactMethod"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.value)}
        >
          <GoabRadioItem
            value="email"
            label="Email"
            reveal={
              <GoabFormItem label="Email address">
                <GoabInput name="email" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="phone"
            label="Phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="text"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabFormItem label="How would you like to be contacted?" mt="xl">
        <GoabCheckboxList
          name="contactMethods"
          value={checkboxSelection}
          onChange={(e) => setCheckboxSelection(e.value || [])}
        >
          <GoabCheckbox
            name="email"
            text="Email"
            value="email"
            reveal={
              <GoabFormItem label="Email address">
                <GoabInput name="email" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            name="phone"
            text="Phone"
            value="phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            name="text"
            text="Text message"
            value="text"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" onChange={() => {}} value="" />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>
    </>
  );
}
