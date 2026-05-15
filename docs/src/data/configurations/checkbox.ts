/**
 * Checkbox Component Configurations
 */

import type { ComponentConfigurations } from "./types";

export const checkboxConfigurations: ComponentConfigurations = {
  componentSlug: "checkbox",
  componentName: "Checkbox",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic checkbox",
      description: "Single checkbox with label",
      code: {
        react: `<GoabCheckbox name="agree" text="I agree to the terms" />`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: [false],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Basic">
    <goab-checkbox
      name="item"
      text="Item"
      formControlName="item"
    ></goab-checkbox>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  item = false;

  checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event);
    this.item = event.checked;
  }
}`,
            template: `<form>
  <goab-form-item label="Basic">
    <goab-checkbox
      name="item"
      text="Item"
      (onChange)="checkboxOnChange($event)"
      [(ngModel)]="item"
    ></goab-checkbox>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-checkbox version="2" name="agree" text="I agree to the terms"></goa-checkbox>`,
      },
    },
    {
      id: "with-description",
      name: "With description",
      description: "Checkbox with additional description text",
      code: {
        react: `<GoabCheckbox
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features"
/>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      newsletter: [false],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Newsletter">
    <goab-checkbox
      name="newsletter"
      text="Subscribe to newsletter"
      description="Receive weekly updates about new features"
      formControlName="newsletter"
    >
    </goab-checkbox>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  newsletter = false;

  checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event);
    this.newsletter = event.checked;
  }
}`,
            template: `<form>
  <goab-form-item label="Newsletter">
    <goab-checkbox
      name="newsletter"
      text="Subscribe to newsletter"
      description="Receive weekly updates about new features"
      (onChange)="checkboxOnChange($event)"
      [(ngModel)]="newsletter"
    >
    </goab-checkbox>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-checkbox version="2"
  name="newsletter"
  text="Subscribe to newsletter"
  description="Receive weekly updates about new features">
</goa-checkbox>`,
      },
    },
    {
      id: "indeterminate",
      name: "Indeterminate",
      description: "Mixed state for select all scenarios",
      code: {
        react: `<GoabCheckbox name="selectAll" text="Select all items" indeterminate />`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectAll: [false],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Select all">
    <goab-checkbox
      name="selectAll"
      text="Select all items"
      [indeterminate]="true"
      formControlName="selectAll"
    >
    </goab-checkbox>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  selectAll = false;

  checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event);
    this.selectAll = event.checked;
  }
}`,
            template: `<form>
  <goab-form-item label="Select all">
    <goab-checkbox
      name="selectAll"
      text="Select all items"
      [indeterminate]="true"
      (onChange)="checkboxOnChange($event)"
      [(ngModel)]="selectAll"
    >
    </goab-checkbox>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-checkbox version="2" name="selectAll" text="Select all items" indeterminate></goa-checkbox>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabCheckbox name="default" text="Default size checkbox" mb="m" />
<GoabCheckbox name="compact" text="Compact size checkbox" size="compact" />`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      default: [false],
      compact: [false],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-checkbox
    name="default"
    text="Default size checkbox"
    formControlName="default"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="compact"
    text="Compact size checkbox"
    size="compact"
    formControlName="compact"
  >
  </goab-checkbox>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  defaultItem = false;
  compactItem = false;

  checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-checkbox
    name="default"
    text="Default size checkbox"
    (onChange)="checkboxOnChange($event)"
    [(ngModel)]="defaultItem"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="compact"
    text="Compact size checkbox"
    size="compact"
    (onChange)="checkboxOnChange($event)"
    [(ngModel)]="compactItem"
  >
  </goab-checkbox>
</form>`,
          },
        ],
        webComponents: `<goa-checkbox version="2" name="default" text="Default size checkbox" mb="m"></goa-checkbox>
<goa-checkbox version="2" name="compact" text="Compact size checkbox" size="compact"></goa-checkbox>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `<GoabCheckbox name="disabled" text="Cannot be changed" disabled mb="m" />
<GoabCheckbox name="disabledChecked" text="Checked and disabled" checked disabled mb="m" />
<GoabCheckbox name="terms" text="Accept terms and conditions" error />`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disabled: [{ value: false, disabled: true }],
      disabledChecked: [{ value: true, disabled: true }],
      terms: [false],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-checkbox
    name="disabled"
    text="Cannot be changed"
    formControlName="disabled"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="disabledChecked"
    text="Checked and disabled"
    formControlName="disabledChecked"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="terms"
    text="Accept terms and conditions"
    formControlName="terms"
    [error]="true"
  >
  </goab-checkbox>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  disabledItem = false;
  disabledCheckedItem = true;
  terms = false;

  checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-checkbox
    name="disabled"
    text="Cannot be changed"
    [disabled]="true"
    [(ngModel)]="disabledItem"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="disabledChecked"
    text="Checked and disabled"
    [disabled]="true"
    [(ngModel)]="disabledCheckedItem"
    mb="m"
  >
  </goab-checkbox>
  <goab-checkbox
    name="terms"
    text="Accept terms and conditions"
    [error]="true"
    (onChange)="checkboxOnChange($event)"
    [(ngModel)]="terms"
  >
  </goab-checkbox>
</form>`,
          },
        ],
        webComponents: `<goa-checkbox version="2" name="disabled" text="Cannot be changed" disabled mb="m"></goa-checkbox>
<goa-checkbox version="2" name="disabledChecked" text="Checked and disabled" checked disabled mb="m"></goa-checkbox>
<goa-checkbox version="2" name="terms" text="Accept terms and conditions" error></goa-checkbox>`,
      },
    },
  ],
};
