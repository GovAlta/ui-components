import { useState } from "react";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function DocsCheckboxRoute() {
  const [contactMethod, setContactMethod] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div>
      <h2>Checkbox</h2>

      <h3>Basic checkbox</h3>
      <GoabCheckbox name="agree" text="I agree to the terms" />

      <h3>With description</h3>
      <GoabCheckbox
        name="newsletter"
        text="Subscribe to newsletter"
        description="Receive weekly updates about new features"
      />

      <h3>Indeterminate</h3>
      <GoabCheckbox name="selectAll" text="Select all items" indeterminate />

      <h3>Sizes</h3>
      <GoabCheckbox name="default" text="Default size checkbox" mb="m" />
      <GoabCheckbox name="compact" text="Compact size checkbox" size="compact" />

      <h3>States</h3>
      <GoabCheckbox name="disabled" text="Cannot be changed" disabled mb="m" />
      <GoabCheckbox name="disabledChecked" text="Checked and disabled" checked disabled mb="m" />
      <GoabCheckbox name="terms" text="Accept terms and conditions" error />

      <h2>Examples</h2>

      <h3>Include a link in the helper text of an option</h3>
      <GoabFormItem label="How would you like to be contacted?">
        <GoabCheckboxList name="contact-options">
          <GoabCheckbox
            name="email"
            text="Email"
            value="email"
            description={
              <span>
                Help text with a <a href="#">link</a>.
              </span>
            }
          />
          <GoabCheckbox name="phone" text="Phone" value="phone" />
          <GoabCheckbox name="text" text="Text message" value="text" />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>Reveal input based on a selection</h3>
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
                <GoabInput name="email" onChange={() => { /* no-op */ }} value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="phone"
            label="Phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" onChange={() => { /* no-op */ }} value="" />
              </GoabFormItem>
            }
          />
          <GoabRadioItem
            value="text"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" onChange={() => { /* no-op */ }} value="" />
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
                <GoabInput name="email" onChange={() => { /* no-op */ }} value="" />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            name="phone"
            text="Phone"
            value="phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput name="phoneNumber" onChange={() => { /* no-op */ }} value="" />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            name="text"
            text="Text message"
            value="text"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" onChange={() => { /* no-op */ }} value="" />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>Select one or more from a list of options</h3>
      <GoabFormItem
        label="How would you like to be contacted?"
        helpText="Choose all that apply"
      >
        <GoabCheckboxList
          name="contactPreferences"
          value={selectedOptions}
          onChange={(e) => setSelectedOptions(e.value)}
        >
          <GoabCheckbox name="email" text="Email" value="email" />
          <GoabCheckbox name="phone" text="Phone" value="phone" />
          <GoabCheckbox name="text" text="Text message" value="text" />
        </GoabCheckboxList>
      </GoabFormItem>
    </div>
  );
}
