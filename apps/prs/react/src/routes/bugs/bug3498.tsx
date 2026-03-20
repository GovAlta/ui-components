import { useState } from "react";
import {
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import {
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";

export function Bug3498Route() {
  const [contactMethod, setContactMethod] = useState("");
  const [contactMethodTwo, setContactMethodTwo] = useState("");
  const [contactMethodThree, setContactMethodThree] = useState("");

  return (
    <div>
      <h1>3498 - Radio group alignment and border adjustment</h1>
      <h2>Version 1</h2>
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
            value="email-1"
            label="Email"
            description="Receive updates via email"
            reveal={
              <GoabFormItem label="Email address">
                <GoabInput name="email" value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="phone-1"
            label="Phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="text-1"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" value="" />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>
      <h2>Version 2 (Experimental)</h2>
      <h3>Regular size</h3>
      <GoabxFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabxRadioGroup
          name="contactMethodTwo"
          value={contactMethodTwo}
          onChange={(e) => setContactMethodTwo(e.value)}
        >
          <GoabxRadioItem
            value="email-2"
            label="Email"
            description="Receive updates via email"
            reveal={
              <GoabxFormItem label="Email address">
                <GoabxInput name="email" value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="phone-2"
            label="Phone"
            reveal={
              <GoabxFormItem label="Phone number">
                <GoabxInput name="phoneNumber" value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="text-2"
            label="Text message"
            reveal={
              <GoabxFormItem label="Mobile phone number">
                <GoabxInput name="mobilePhoneNumber" value="" />
              </GoabxFormItem>
            }
          />
        </GoabxRadioGroup>
      </GoabxFormItem>
      <h3>Compact size</h3>
      <GoabxFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabxRadioGroup
          size="compact"
          name="contactMethodThree"
          value={contactMethodThree}
          onChange={(e) => setContactMethodThree(e.value)}
        >
          <GoabxRadioItem
            value="email-3"
            label="Email"
            description="Receive updates via email"
            reveal={
              <GoabxFormItem label="Email address">
                <GoabxInput name="email" value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="phone-3"
            label="Phone"
            reveal={
              <GoabxFormItem label="Phone number">
                <GoabxInput name="phoneNumber" value="" />
              </GoabxFormItem>
            }
          />
          <GoabxRadioItem
            value="text-3"
            label="Text message"
            reveal={
              <GoabxFormItem label="Mobile phone number">
                <GoabxInput name="mobilePhoneNumber" value="" />
              </GoabxFormItem>
            }
          />
        </GoabxRadioGroup>
      </GoabxFormItem>
    </div>
  );
}
