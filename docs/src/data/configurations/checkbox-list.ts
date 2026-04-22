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
        react: `const [interests, setInterests] = useState<string[]>([]);

<GoabFormItem label="Select interests" mb="l">
  <GoabCheckboxList
    name="interests"
    value={interests}
    onChange={(detail) => setInterests(detail.value)}
  >
    <GoabCheckbox name="sports" text="Sports" />
    <GoabCheckbox name="music" text="Music" />
    <GoabCheckbox name="travel" text="Travel" />
    <GoabCheckbox name="reading" text="Reading" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      interests: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Select interests" mb="l">
    <goab-checkbox-list name="interests" formControlName="interests">
      <goab-checkbox name="sports" text="Sports"></goab-checkbox>
      <goab-checkbox name="music" text="Music"></goab-checkbox>
      <goab-checkbox name="travel" text="Travel"></goab-checkbox>
      <goab-checkbox name="reading" text="Reading"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  interests: string[] = [];

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail) {
    console.log(event);
    this.interests = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Select interests" mb="l">
    <goab-checkbox-list
      name="interests"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="interests"
    >
      <goab-checkbox name="sports" text="Sports"></goab-checkbox>
      <goab-checkbox name="music" text="Music"></goab-checkbox>
      <goab-checkbox name="travel" text="Travel"></goab-checkbox>
      <goab-checkbox name="reading" text="Reading"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
        ],
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
        react: `const [services, setServices] = useState<string[]>([]);

<GoabFormItem label="Which services do you need?" mb="l">
  <GoabCheckboxList
    name="services"
    value={services}
    onChange={(detail) => setServices(detail.value)}
  >
    <GoabCheckbox name="health" text="Health benefits" description="Coverage for prescriptions, dental, and vision" />
    <GoabCheckbox name="income" text="Income support" description="Financial assistance for basic living costs" />
    <GoabCheckbox name="housing" text="Housing assistance" description="Help finding and affording a place to live" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      services: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Which services do you need?" mb="l">
    <goab-checkbox-list name="services" formControlName="services">
      <goab-checkbox
        name="health"
        text="Health benefits"
        description="Coverage for prescriptions, dental, and vision"
      ></goab-checkbox>
      <goab-checkbox
        name="income"
        text="Income support"
        description="Financial assistance for basic living costs"
      ></goab-checkbox>
      <goab-checkbox
        name="housing"
        text="Housing assistance"
        description="Help finding and affording a place to live"
      ></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  services: string[] = [];

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail) {
    console.log(event);
    this.services = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Which services do you need?" mb="l">
    <goab-checkbox-list
      name="services"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="services"
    >
      <goab-checkbox
        name="health"
        text="Health benefits"
        description="Coverage for prescriptions, dental, and vision"
      ></goab-checkbox>
      <goab-checkbox
        name="income"
        text="Income support"
        description="Financial assistance for basic living costs"
      ></goab-checkbox>
      <goab-checkbox
        name="housing"
        text="Housing assistance"
        description="Help finding and affording a place to live"
      ></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
        ],
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
        react: `const [referral, setReferral] = useState<string[]>([]);
const [otherDetails, setOtherDetails] = useState("");

<GoabFormItem label="How did you hear about this program?" mb="l">
  <GoabCheckboxList
    name="referral"
    value={referral}
    onChange={(detail) => setReferral(detail.value)}
  >
    <GoabCheckbox name="website" text="Government website" />
    <GoabCheckbox name="friend" text="Friend or family member" />
    <GoabCheckbox
      name="other"
      text="Other, please specify"
      reveal={
        <GoabFormItem label="Please describe" mb="l">
          <GoabTextArea
            name="otherDetails"
            value={otherDetails}
            onChange={(detail) => setOtherDetails(detail.value)}
          />
        </GoabFormItem>
      }
    />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      referral: [[] as string[]],
      otherDetails: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="How did you hear about this program?" mb="l">
    <goab-checkbox-list name="referral" formControlName="referral">
      <goab-checkbox name="website" text="Government website"></goab-checkbox>
      <goab-checkbox
        name="friend"
        text="Friend or family member"
      ></goab-checkbox>
      <goab-checkbox
        name="other"
        text="Other, please specify"
        [reveal]="otherReveal"
      >
        <ng-template #otherReveal>
          <goab-form-item label="Please describe" mb="l">
            <goab-textarea
              name="otherDetails"
              formControlName="otherDetails"
            ></goab-textarea>
          </goab-form-item>
        </ng-template>
      </goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  referral: string[] = [];
  otherDetails = "";

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail) {
    this.referral = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="How did you hear about this program?" mb="l">
    <goab-checkbox-list
      name="referral"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="referral"
    >
      <goab-checkbox name="website" text="Government website"></goab-checkbox>
      <goab-checkbox
        name="friend"
        text="Friend or family member"
      ></goab-checkbox>
      <goab-checkbox
        name="other"
        text="Other, please specify"
        [reveal]="otherReveal"
      >
        <ng-template #otherReveal>
          <goab-form-item label="Please describe" mb="l">
            <goab-textarea
              name="otherDetails"
              [(ngModel)]="otherDetails"
            ></goab-textarea>
          </goab-form-item>
        </ng-template>
      </goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
        ],
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
        react: `const [sizeDefault, setSizeDefault] = useState<string[]>([]);
const [sizeCompact, setSizeCompact] = useState<string[]>([]);

<GoabFormItem label="Default size" mb="l">
  <GoabCheckboxList
    name="sizeDefault"
    value={sizeDefault}
    onChange={(detail) => setSizeDefault(detail.value)}
  >
    <GoabCheckbox name="opt1" text="Option 1" />
    <GoabCheckbox name="opt2" text="Option 2" />
    <GoabCheckbox name="opt3" text="Option 3" />
  </GoabCheckboxList>
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabCheckboxList
    name="sizeCompact"
    size="compact"
    value={sizeCompact}
    onChange={(detail) => setSizeCompact(detail.value)}
  >
    <GoabCheckbox name="opt1c" text="Option 1" size="compact" />
    <GoabCheckbox name="opt2c" text="Option 2" size="compact" />
    <GoabCheckbox name="opt3c" text="Option 3" size="compact" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sizeDefault: [[] as string[]],
      sizeCompact: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Default size" mb="l">
    <goab-checkbox-list name="sizeDefault" formControlName="sizeDefault">
      <goab-checkbox name="opt1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="opt2" text="Option 2"></goab-checkbox>
      <goab-checkbox name="opt3" text="Option 3"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-checkbox-list
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
    >
      <goab-checkbox
        name="opt1c"
        text="Option 1"
        size="compact"
      ></goab-checkbox>
      <goab-checkbox
        name="opt2c"
        text="Option 2"
        size="compact"
      ></goab-checkbox>
      <goab-checkbox
        name="opt3c"
        text="Option 3"
        size="compact"
      ></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault: string[] = [];
  sizeCompact: string[] = [];

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-checkbox-list
      name="sizeDefault"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="sizeDefault"
    >
      <goab-checkbox name="opt1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="opt2" text="Option 2"></goab-checkbox>
      <goab-checkbox name="opt3" text="Option 3"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-checkbox-list
      name="sizeCompact"
      size="compact"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="sizeCompact"
    >
      <goab-checkbox
        name="opt1c"
        text="Option 1"
        size="compact"
      ></goab-checkbox>
      <goab-checkbox
        name="opt2c"
        text="Option 2"
        size="compact"
      ></goab-checkbox>
      <goab-checkbox
        name="opt3c"
        text="Option 3"
        size="compact"
      ></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
        ],
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
        react: `const [required, setRequired] = useState<string[]>([]);

<GoabFormItem label="Disabled list" mb="l">
  <GoabCheckboxList name="disabled" disabled>
    <GoabCheckbox name="d1" text="Option 1" />
    <GoabCheckbox name="d2" text="Option 2" />
  </GoabCheckboxList>
</GoabFormItem>
<GoabFormItem label="Select at least one" error="Please select at least one option" mb="l">
  <GoabCheckboxList
    name="required"
    error
    value={required}
    onChange={(detail) => setRequired(detail.value)}
  >
    <GoabCheckbox name="e1" text="Option 1" />
    <GoabCheckbox name="e2" text="Option 2" />
    <GoabCheckbox name="e3" text="Option 3" />
  </GoabCheckboxList>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disabled: [{ value: [], disabled: true }],
      required: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Disabled list" mb="l">
    <goab-checkbox-list name="disabled" formControlName="disabled">
      <goab-checkbox name="d1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="d2" text="Option 2"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
  <goab-form-item
    label="Select at least one"
    error="Please select at least one option"
    mb="l"
  >
    <goab-checkbox-list
      name="required"
      [error]="true"
      formControlName="required"
    >
      <goab-checkbox name="e1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="e2" text="Option 2"></goab-checkbox>
      <goab-checkbox name="e3" text="Option 3"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  disabledItems: string[] = [];
  required: string[] = [];

  checkboxListOnChange(event: GoabCheckboxListOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-form-item label="Disabled list" mb="l">
    <goab-checkbox-list
      name="disabled"
      [disabled]="true"
      [(ngModel)]="disabledItems"
    >
      <goab-checkbox name="d1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="d2" text="Option 2"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
  <goab-form-item
    label="Select at least one"
    error="Please select at least one option"
    mb="l"
  >
    <goab-checkbox-list
      name="required"
      [error]="true"
      (onChange)="checkboxListOnChange($event)"
      [(ngModel)]="required"
    >
      <goab-checkbox name="e1" text="Option 1"></goab-checkbox>
      <goab-checkbox name="e2" text="Option 2"></goab-checkbox>
      <goab-checkbox name="e3" text="Option 3"></goab-checkbox>
    </goab-checkbox-list>
  </goab-form-item>
</form>`,
          },
        ],
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
