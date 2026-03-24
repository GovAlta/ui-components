/**
 * CheckboxList Component Configurations
 *
 * Checkbox list groups multiple checkboxes together.
 */

import type { ComponentConfigurations } from "./types";

export const checkboxListConfigurations: ComponentConfigurations = {
  componentSlug: "checkbox-list",
  componentName: "Checkbox list",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic checkbox list",
      description: "Group of related checkboxes",
      code: {
        react: `<GoabFormItem label="Select interests" mb="l">
  <GoabCheckboxList name="interests">
    <GoabCheckbox name="sports" text="Sports" />
    <GoabCheckbox name="music" text="Music" />
    <GoabCheckbox name="travel" text="Travel" />
    <GoabCheckbox name="reading" text="Reading" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: `<goab-form-item label="Select interests" mb="l">
  <goab-checkbox-list name="interests">
    <goab-checkbox name="sports" text="Sports"></goab-checkbox>
    <goab-checkbox name="music" text="Music"></goab-checkbox>
    <goab-checkbox name="travel" text="Travel"></goab-checkbox>
    <goab-checkbox name="reading" text="Reading"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Select interests" mb="l">
  <goa-checkbox-list version="2" name="interests">
    <goa-checkbox version="2" name="sports" text="Sports"></goa-checkbox>
    <goa-checkbox version="2" name="music" text="Music"></goa-checkbox>
    <goa-checkbox version="2" name="travel" text="Travel"></goa-checkbox>
    <goa-checkbox version="2" name="reading" text="Reading"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>`,
      },
    },
    {
      id: "with-descriptions",
      name: "With descriptions",
      description: "Checkboxes with additional description text",
      code: {
        react: `<GoabFormItem label="Which services do you need?" mb="l">
  <GoabCheckboxList name="services">
    <GoabCheckbox name="health" text="Health benefits" description="Coverage for prescriptions, dental, and vision" />
    <GoabCheckbox name="income" text="Income support" description="Financial assistance for basic living costs" />
    <GoabCheckbox name="housing" text="Housing assistance" description="Help finding and affording a place to live" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: `<goab-form-item label="Which services do you need?" mb="l">
  <goab-checkbox-list name="services">
    <goab-checkbox name="health" text="Health benefits" description="Coverage for prescriptions, dental, and vision"></goab-checkbox>
    <goab-checkbox name="income" text="Income support" description="Financial assistance for basic living costs"></goab-checkbox>
    <goab-checkbox name="housing" text="Housing assistance" description="Help finding and affording a place to live"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Which services do you need?" mb="l">
  <goa-checkbox-list version="2" name="services">
    <goa-checkbox version="2" name="health" text="Health benefits" description="Coverage for prescriptions, dental, and vision"></goa-checkbox>
    <goa-checkbox version="2" name="income" text="Income support" description="Financial assistance for basic living costs"></goa-checkbox>
    <goa-checkbox version="2" name="housing" text="Housing assistance" description="Help finding and affording a place to live"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>`,
      },
    },
    {
      id: "with-reveal",
      name: "With reveal content",
      description: "Checkbox that reveals additional content when checked",
      code: {
        react: `<GoabFormItem label="How did you hear about this program?" mb="l">
  <GoabCheckboxList name="referral">
    <GoabCheckbox name="website" text="Government website" />
    <GoabCheckbox name="friend" text="Friend or family member" />
    <GoabCheckbox
      name="other"
      text="Other, please specify"
      reveal={
        <GoabFormItem label="Please describe" mb="l">
          <GoabTextArea name="otherDetails" />
        </GoabFormItem>
      }
    />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: `<goab-form-item label="How did you hear about this program?" mb="l">
  <goab-checkbox-list name="referral">
    <goab-checkbox name="website" text="Government website"></goab-checkbox>
    <goab-checkbox name="friend" text="Friend or family member"></goab-checkbox>
    <goab-checkbox name="other" text="Other, please specify" [reveal]="otherReveal">
      <ng-template #otherReveal>
        <goab-form-item label="Please describe" mb="l">
          <goab-textarea name="otherDetails"></goab-textarea>
        </goab-form-item>
      </ng-template>
    </goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="How did you hear about this program?" mb="l">
  <goa-checkbox-list version="2" name="referral">
    <goa-checkbox version="2" name="website" text="Government website"></goa-checkbox>
    <goa-checkbox version="2" name="friend" text="Friend or family member"></goa-checkbox>
    <goa-checkbox version="2" name="other" text="Other, please specify">
      <div slot="reveal">
        <goa-form-item version="2" label="Please describe" mb="l">
          <goa-textarea version="2" name="otherDetails"></goa-textarea>
        </goa-form-item>
      </div>
    </goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabCheckboxList name="sizeDefault">
    <GoabCheckbox name="opt1" text="Option 1" />
    <GoabCheckbox name="opt2" text="Option 2" />
    <GoabCheckbox name="opt3" text="Option 3" />
  </GoabCheckboxList>
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabCheckboxList name="sizeCompact" size="compact">
    <GoabCheckbox name="opt1c" text="Option 1" size="compact" />
    <GoabCheckbox name="opt2c" text="Option 2" size="compact" />
    <GoabCheckbox name="opt3c" text="Option 3" size="compact" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: `<goab-form-item label="Default size" mb="l">
  <goab-checkbox-list name="sizeDefault">
    <goab-checkbox name="opt1" text="Option 1"></goab-checkbox>
    <goab-checkbox name="opt2" text="Option 2"></goab-checkbox>
    <goab-checkbox name="opt3" text="Option 3"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>
<goab-form-item label="Compact size" labelSize="compact" mb="l">
  <goab-checkbox-list name="sizeCompact" size="compact">
    <goab-checkbox name="opt1c" text="Option 1" size="compact"></goab-checkbox>
    <goab-checkbox name="opt2c" text="Option 2" size="compact"></goab-checkbox>
    <goab-checkbox name="opt3c" text="Option 3" size="compact"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-checkbox-list version="2" name="sizeDefault">
    <goa-checkbox version="2" name="opt1" text="Option 1"></goa-checkbox>
    <goa-checkbox version="2" name="opt2" text="Option 2"></goa-checkbox>
    <goa-checkbox version="2" name="opt3" text="Option 3"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-checkbox-list version="2" name="sizeCompact" size="compact">
    <goa-checkbox version="2" name="opt1c" text="Option 1" size="compact"></goa-checkbox>
    <goa-checkbox version="2" name="opt2c" text="Option 2" size="compact"></goa-checkbox>
    <goa-checkbox version="2" name="opt3c" text="Option 3" size="compact"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `<GoabFormItem label="Disabled list" mb="l">
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
</GoabFormItem>`,
        angular: `<goab-form-item label="Disabled list" mb="l">
  <goab-checkbox-list name="disabled" [disabled]="true">
    <goab-checkbox name="d1" text="Option 1"></goab-checkbox>
    <goab-checkbox name="d2" text="Option 2"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>
<goab-form-item label="Select at least one" error="Please select at least one option" mb="l">
  <goab-checkbox-list name="required" [error]="true">
    <goab-checkbox name="e1" text="Option 1"></goab-checkbox>
    <goab-checkbox name="e2" text="Option 2"></goab-checkbox>
    <goab-checkbox name="e3" text="Option 3"></goab-checkbox>
  </goab-checkbox-list>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Disabled list" mb="l">
  <goa-checkbox-list version="2" name="disabled" disabled>
    <goa-checkbox version="2" name="d1" text="Option 1"></goa-checkbox>
    <goa-checkbox version="2" name="d2" text="Option 2"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>
<goa-form-item version="2" label="Select at least one" error="Please select at least one option" mb="l">
  <goa-checkbox-list version="2" name="required" error>
    <goa-checkbox version="2" name="e1" text="Option 1"></goa-checkbox>
    <goa-checkbox version="2" name="e2" text="Option 2"></goa-checkbox>
    <goa-checkbox version="2" name="e3" text="Option 3"></goa-checkbox>
  </goa-checkbox-list>
</goa-form-item>`,
      },
    },
  ],
};
