import { useState } from 'react';
import {
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function Bug3498Route() {
  const [contactMethod, setContactMethod] = useState("");

  return (
    <div>
      <h1>3498 - Radio group alignment and border adjustment</h1>
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
                <GoabInput name="email" value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="phone"
            label="Phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="text"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" value="" />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>
    </div>
  );
}
