import { useState } from 'react';
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";

export function Bug3607Route() {
  const [contactMethod, setContactMethod] = useState("");
  const [contactMethodTwo, setContactMethodTwo] = useState("");
  const [contactMethodThree, setContactMethodThree] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState<string[]>([]);
  const [checkboxSelectionTwo, setCheckboxSelectionTwo] = useState<string[]>([]);
  const [checkboxSelectionThree, setCheckboxSelectionThree] = useState<string[]>([]);

  return (
     <div>
      <h1>3607 - Radio and Checkbox Interaction Area</h1>
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
            value="email-0"
            description="Receive updates via email"
            label="Email"
          />
          <GoabRadioItem
            value="phone-0"
            label="Phone"
          />
          <GoabRadioItem
            value="text-0"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" value="" />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabFormItem label="Select any interests you have" mt="xl">
        <GoabCheckboxList
          name="contactMethods"
          value={checkboxSelection}
          onChange={(e) => setCheckboxSelection(e.value || [])}
        >
          <GoabCheckbox
            name="travel-0"
            description={
              <span>
                Help text with as a description.
              </span>
            }
            text="Travel"
            value="travel-0"
          />
          <GoabCheckbox
            name="music-0"
            text="Music"
            value="music-0"
          />
          <GoabCheckbox
            name="sports-0"
            text="Sports"
            value="sports-0"
          />
          <GoabCheckbox
            name="other-0"
            text="Other"
            value="other-0"
            reveal={
              <GoabFormItem label="Other field">
                <GoabInput name="otherTextField" value="" />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>

      <h2>Version 2 (Experimental)</h2>
      <h3>Regular size</h3>
      <GoabFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabRadioGroup
          name="contactMethod"
          value={contactMethodTwo}
          onChange={(e) => setContactMethodTwo(e.value)}
        >
          <GoabRadioItem
            value="email-1"
            description="Receive updates via email"
            label="Email"
          />
          <GoabRadioItem
            value="phone-1"
            label="Phone"
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

      <GoabFormItem label="Select any interests you have" mt="xl">
        <GoabCheckboxList
          name="contactMethods"
          value={checkboxSelectionTwo}
          onChange={(e) => setCheckboxSelectionTwo(e.value || [])}
        >
          <GoabCheckbox
            name="travel-1"
            description={
              <span>
                Help text with as a description.
              </span>
            }
            text="Travel"
            value="travel-1"
          />
          <GoabCheckbox
            name="music-1"
            text="Music"
            value="music-1"
          />
          <GoabCheckbox
            name="sports-1"
            text="Sports"
            value="sports-1"
          />
          <GoabCheckbox
            name="other-1"
            text="Other"
            value="other-1"
            reveal={
              <GoabFormItem label="Other field">
                <GoabInput name="otherTextField" value="" />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>Compact size</h3>
      <GoabFormItem
        label="How would you like to be contacted?"
        helpText="Select one option"
      >
        <GoabRadioGroup
          size="compact"
          name="contactMethodThree"
          value={contactMethodThree}
          onChange={(e) => setContactMethodThree(e.value)}
        >
          <GoabRadioItem
            value="email-2"
            description="Receive updates via email"
            label="Email"
          />
          <GoabRadioItem
            value="phone-2"
            label="Phone"
          />
          <GoabRadioItem
            value="text-2"
            label="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput name="mobilePhoneNumber" value="" />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabFormItem label="Select any interests you have" mt="xl">
        <GoabCheckboxList
          size="compact"
          name="contactMethods"
          value={checkboxSelectionThree}
          onChange={(e) => setCheckboxSelectionThree(e.value || [])}
        >
          <GoabCheckbox
            size="compact"
            description={
              <span>
                Help text with as a description.
              </span>
            }
            name="travel-2"
            text="Travel"
            value="travel-2"
          />
          <GoabCheckbox
            size="compact"
            name="music-2"
            text="Music"
            value="music-2"
          />
          <GoabCheckbox
            size="compact"
            name="sports-2"
            text="Sports"
            value="sports-2"
          />
          <GoabCheckbox
            size="compact"
            name="other-2"
            text="Other"
            value="other-2"
            reveal={
              <GoabFormItem label="Other field">
                <GoabInput name="otherTextField" value="" />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>
    </div>

  );
}
