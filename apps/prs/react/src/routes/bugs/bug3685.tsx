import { useState } from 'react';
import {
  GoabFormItem,
  GoabButton,
  GoabButtonGroup,
  GoabDropdown,
  GoabDropdownItem,
  GoabCheckbox,
  GoabCheckboxList,
  GoabModal,
  GoabInput,
  GoabRadioGroup,
  GoabTextArea,
  GoabRadioItem,
} from "@abgov/react-components";

export function Bug3685Route() {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [type, setType] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [contactMethod, setContactMethod] = useState("");
  const [contactMethodTwo, setContactMethodTwo] = useState("");
  const [contactMethodThree, setContactMethodThree] = useState("");
  const [checkboxSelection, setCheckboxSelection] = useState<string[]>([]);
  const [checkboxSelectionTwo, setCheckboxSelectionTwo] = useState<string[]>([]);
  const [checkboxSelectionThree, setCheckboxSelectionThree] = useState<string[]>([]);

  return (
     <div>
      <h1>3685 - Checkbox & Radio: Reveal width not aligned with item</h1>
      <h2>Version 1</h2>

      <GoabButton type="tertiary" leadingIcon="add" onClick={() => setOpen(true)}>
        Add another item
      </GoabButton>
      <GoabModal
          heading="Add a new item"
          open={open}
          actions={
            <GoabButtonGroup alignment="end">
              <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
                Cancel
              </GoabButton>
              <GoabButton type="primary" size="compact" onClick={() => setOpen(false)}>
                Save new item
              </GoabButton>
            </GoabButtonGroup>
          }
        >
          <p>Fill in the information to create a new item</p>
          <GoabFormItem label="Type" mt="l">
            <GoabDropdown onChange={(e) => setType(e.value)} value={type}>
              <GoabDropdownItem value="1" label="Option 1" />
              <GoabDropdownItem value="2" label="Option 2" />
            </GoabDropdown>
          </GoabFormItem>
          <GoabFormItem label="Name" mt="l">
            <GoabInput
              onChange={(e) => setName(e.value)}
              value={name}
              name="name"
              width="100%"
            />
          </GoabFormItem>
          <GoabFormItem
          label="How would you like to be contacted?"
          helpText="Select one option"
          mt="xl"
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
          <GoabFormItem label="Description" mt="l">
            <GoabTextArea
              name="description"
              rows={3}
              width="100%"
              onChange={(e) => setDescription(e.value)}
              value={description}
            />
          </GoabFormItem>
      </GoabModal>
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

      <GoabButton type="tertiary" leadingIcon="add" onClick={() => setOpenTwo(true)}>
        Add another item
      </GoabButton>
      <GoabModal
          heading="Add a new item"
          open={openTwo}
          actions={
            <GoabButtonGroup alignment="end">
              <GoabButton type="tertiary" size="compact" onClick={() => setOpenTwo(false)}>
                Cancel
              </GoabButton>
              <GoabButton type="primary" size="compact" onClick={() => setOpenTwo(false)}>
                Save new item
              </GoabButton>
            </GoabButtonGroup>
          }
        >
          <p>Fill in the information to create a new item</p>
          <GoabFormItem label="Type" mt="l">
            <GoabDropdown onChange={(e) => setType(e.value)} value={type}>
              <GoabDropdownItem value="1" label="Option 1" />
              <GoabDropdownItem value="2" label="Option 2" />
            </GoabDropdown>
          </GoabFormItem>
          <GoabFormItem label="Name" mt="l">
            <GoabInput
              onChange={(e) => setName(e.value)}
              value={name}
              name="name"
              width="100%"
            />
          </GoabFormItem>
          <GoabFormItem
          label="How would you like to be contacted?"
          helpText="Select one option"
          mt="xl"
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
          <GoabFormItem label="Description" mt="l">
            <GoabTextArea
              name="description"
              rows={3}
              width="100%"
              onChange={(e) => setDescription(e.value)}
              value={description}
            />
          </GoabFormItem>
      </GoabModal>
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
