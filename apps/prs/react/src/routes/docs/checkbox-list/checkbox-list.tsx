import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabTextArea,
} from "@abgov/react-components";

export function DocsCheckboxListRoute() {
  return (
    <div>
      <h2>Checkbox list</h2>

      <h3>Basic checkbox list</h3>
      <GoabFormItem label="Select interests" mb="l">
        <GoabCheckboxList name="interests">
          <GoabCheckbox name="sports" text="Sports" />
          <GoabCheckbox name="music" text="Music" />
          <GoabCheckbox name="travel" text="Travel" />
          <GoabCheckbox name="reading" text="Reading" />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>With descriptions</h3>
      <GoabFormItem label="Which services do you need?" mb="l">
        <GoabCheckboxList name="services">
          <GoabCheckbox name="health" text="Health benefits" description="Coverage for prescriptions, dental, and vision" />
          <GoabCheckbox name="income" text="Income support" description="Financial assistance for basic living costs" />
          <GoabCheckbox name="housing" text="Housing assistance" description="Help finding and affording a place to live" />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>With reveal content</h3>
      <GoabFormItem label="How did you hear about this program?" mb="l">
        <GoabCheckboxList name="referral">
          <GoabCheckbox name="website" text="Government website" />
          <GoabCheckbox name="friend" text="Friend or family member" />
          <GoabCheckbox
            name="other"
            text="Other, please specify"
            reveal={
              <GoabFormItem label="Please describe" mb="l">
                <GoabTextArea name="otherDetails" onChange={() => { /* no-op */ }} />
              </GoabFormItem>
            }
          />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>Sizes</h3>
      <GoabFormItem label="Default size" mb="l">
        <GoabCheckboxList name="sizeDefault">
          <GoabCheckbox name="opt1" text="Option 1" />
          <GoabCheckbox name="opt2" text="Option 2" />
          <GoabCheckbox name="opt3" text="Option 3" />
        </GoabCheckboxList>
      </GoabFormItem>
      <GoabFormItem label="Compact size" mb="l">
        <GoabCheckboxList name="sizeCompact" size="compact">
          <GoabCheckbox name="opt1c" text="Option 1" size="compact" />
          <GoabCheckbox name="opt2c" text="Option 2" size="compact" />
          <GoabCheckbox name="opt3c" text="Option 3" size="compact" />
        </GoabCheckboxList>
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Disabled list" mb="l">
        <GoabCheckboxList name="disabled" disabled>
          <GoabCheckbox name="d1" text="Option 1" />
          <GoabCheckbox name="d2" text="Option 2" />
        </GoabCheckboxList>
      </GoabFormItem>
      <GoabFormItem label="Select at least one" error="Please select at least one option" mb="l">
        <GoabCheckboxList name="required" error>
          <GoabCheckbox name="e1" text="Option 1" />
          <GoabCheckbox name="e2" text="Option 2" />
          <GoabCheckbox name="e3" text="Option 3" />
        </GoabCheckboxList>
      </GoabFormItem>
    </div>
  );
}
