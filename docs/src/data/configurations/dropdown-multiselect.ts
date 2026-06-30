/**
 * DropdownMultiselect Component Configurations
 *
 * Shows various Dropdown Multiselect use cases wrapped in FormItem.
 * Note: Dropdown Multiselect should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const dropdownMultiselectConfigurations: ComponentConfigurations = {
  componentSlug: "dropdown-multiselect",
  componentName: "Dropdown multiselect",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Simple dropdown multiselect with options",
      code: {
        react: `const [fruits, setFruits] = useState<string[]>([]);

<GoabFormItem label="Select fruits" mb="l">
  <GoabDropdownMultiselect
    name="fruits"
    width="320px"
    value={fruits}
    onChange={(detail) => setFruits(detail.value)}
  >
    <GoabDropdownItem value="apple" label="Apple" />
    <GoabDropdownItem value="banana" label="Banana" />
    <GoabDropdownItem value="orange" label="Orange" />
    <GoabDropdownItem value="pear" label="Pear" />
  </GoabDropdownMultiselect>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fruits: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Select fruits" mb="l">
    <goab-dropdown-multiselect name="fruits" formControlName="fruits" width="320px">
      <goab-dropdown-item value="apple" label="Apple"></goab-dropdown-item>
      <goab-dropdown-item value="banana" label="Banana"></goab-dropdown-item>
      <goab-dropdown-item value="orange" label="Orange"></goab-dropdown-item>
      <goab-dropdown-item value="pear" label="Pear"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  fruits: string[] = [];

  dropdownOnChange(event: GoabDropdownMultiselectOnChangeDetail) {
    this.fruits = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Select fruits" mb="l">
    <goab-dropdown-multiselect
      name="fruits"
      width="320px"
      [(ngModel)]="fruits"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="apple" label="Apple"></goab-dropdown-item>
      <goab-dropdown-item value="banana" label="Banana"></goab-dropdown-item>
      <goab-dropdown-item value="orange" label="Orange"></goab-dropdown-item>
      <goab-dropdown-item value="pear" label="Pear"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item label="Select fruits" mb="l">
  <goa-dropdown-multiselect name="fruits" width="320px">
    <goa-dropdown-item value="apple" label="Apple"></goa-dropdown-item>
    <goa-dropdown-item value="banana" label="Banana"></goa-dropdown-item>
    <goa-dropdown-item value="orange" label="Orange"></goa-dropdown-item>
    <goa-dropdown-item value="pear" label="Pear"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
    {
      id: "with-custom-placeholder",
      name: "With custom placeholder",
      description: "Dropdown multiselect with placeholder text when no selection",
      code: {
        react: `const [services, setServices] = useState<string[]>([]);

<GoabFormItem label="Select services" mb="l">
  <GoabDropdownMultiselect
    name="services"
    width="320px"
    placeholder="Select one or more services"
    value={services}
    onChange={(detail) => setServices(detail.value)}
  >
    <GoabDropdownItem value="health" label="Health benefits" />
    <GoabDropdownItem value="income" label="Income support" />
    <GoabDropdownItem value="housing" label="Housing support" />
  </GoabDropdownMultiselect>
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
  <goab-form-item label="Select services" mb="l">
    <goab-dropdown-multiselect
      name="services"
      width="320px"
      placeholder="Select one or more services"
      formControlName="services"
    >
      <goab-dropdown-item value="health" label="Health benefits"></goab-dropdown-item>
      <goab-dropdown-item value="income" label="Income support"></goab-dropdown-item>
      <goab-dropdown-item value="housing" label="Housing support"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  services: string[] = [];

  dropdownOnChange(event: GoabDropdownMultiselectOnChangeDetail) {
    this.services = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Select services" mb="l">
    <goab-dropdown-multiselect
      name="services"
      width="320px"
      placeholder="Select one or more services"
      [(ngModel)]="services"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="health" label="Health benefits"></goab-dropdown-item>
      <goab-dropdown-item value="income" label="Income support"></goab-dropdown-item>
      <goab-dropdown-item value="housing" label="Housing support"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item label="Select services" mb="l">
  <goa-dropdown-multiselect
    name="services"
    width="320px"
    placeholder="Select one or more services"
  >
    <goa-dropdown-item value="health" label="Health benefits"></goa-dropdown-item>
    <goa-dropdown-item value="income" label="Income support"></goa-dropdown-item>
    <goa-dropdown-item value="housing" label="Housing support"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
    {
      id: "label-format",
      name: "Label Formatting",
      description:
        "When labelFormat='count' the label shows a count 'n items' instead of listing selected options.",
      code: {
        react: `<GoabFormItem label="Select fruits" mb="l">
  <GoabDropdownMultiselect
    name="fruits"
    labelFormat="count"
    width="320px"
  >
    <GoabDropdownItem value="apple" label="Apple" />
    <GoabDropdownItem value="banana" label="Banana" />
    <GoabDropdownItem value="orange" label="Orange" />
    <GoabDropdownItem value="pear" label="Pear" />
  </GoabDropdownMultiselect>
</GoabFormItem>`,
        angular: `<goab-form-item label="Select fruits" mb="l">
  <goab-dropdown-multiselect
    name="fruits"
    width="320px"
    [labelFormat]="'count'"
  >
    <goab-dropdown-item value="apple" label="Apple"></goab-dropdown-item>
    <goab-dropdown-item value="banana" label="Banana"></goab-dropdown-item>
    <goab-dropdown-item value="orange" label="Orange"></goab-dropdown-item>
    <goab-dropdown-item value="pear" label="Pear"></goab-dropdown-item>
  </goab-dropdown-multiselect>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Select fruits" mb="l">
  <goa-dropdown-multiselect
    name="fruits"
    label-format="count"
    width="320px"
  >
    <goa-dropdown-item value="apple" label="Apple"></goa-dropdown-item>
    <goa-dropdown-item value="banana" label="Banana"></goa-dropdown-item>
    <goa-dropdown-item value="orange" label="Orange"></goa-dropdown-item>
    <goa-dropdown-item value="pear" label="Pear"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
    {
      id: "filterable",
      name: "Filterable",
      description: "Dropdown multiselect with search/filter capability",
      code: {
        react: `<GoabFormItem label="Which cities have you visited?" mb="l">
  <GoabDropdownMultiselect
    name="cities"
    filterable={true}
    maxHeight="400px"
    width="320px"
  >
    <GoabDropdownItem value="calgary" label="Calgary" />
    <GoabDropdownItem value="edmonton" label="Edmonton" />
    <GoabDropdownItem value="red-deer" label="Red Deer" />
    <GoabDropdownItem value="lethbridge" label="Lethbridge" />
    <GoabDropdownItem value="medicine-hat" label="Medicine Hat" />
    <GoabDropdownItem value="grande-prairie" label="Grande Prairie" />
  </GoabDropdownMultiselect>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cities: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Which cities have you visited?" mb="l">
    <goab-dropdown-multiselect
      name="cities"
      [filterable]="true"
      maxHeight="400px"
      width="320px"
      formControlName="cities"
    >
      <goab-dropdown-item value="calgary" label="Calgary"></goab-dropdown-item>
      <goab-dropdown-item value="edmonton" label="Edmonton"></goab-dropdown-item>
      <goab-dropdown-item value="red-deer" label="Red Deer"></goab-dropdown-item>
      <goab-dropdown-item value="lethbridge" label="Lethbridge"></goab-dropdown-item>
      <goab-dropdown-item value="medicine-hat" label="Medicine Hat"></goab-dropdown-item>
      <goab-dropdown-item value="grande-prairie" label="Grande Prairie"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  cities: string[] = [];

  dropdownOnChange(event: GoabDropdownMultiselectOnChangeDetail) {
    this.cities = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Which cities have you visited?" mb="l">
    <goab-dropdown-multiselect
      name="cities"
      [filterable]="true"
      maxHeight="400px"
      width="320px"
      [(ngModel)]="cities"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="calgary" label="Calgary"></goab-dropdown-item>
      <goab-dropdown-item value="edmonton" label="Edmonton"></goab-dropdown-item>
      <goab-dropdown-item value="red-deer" label="Red Deer"></goab-dropdown-item>
      <goab-dropdown-item value="lethbridge" label="Lethbridge"></goab-dropdown-item>
      <goab-dropdown-item value="medicine-hat" label="Medicine Hat"></goab-dropdown-item>
      <goab-dropdown-item value="grande-prairie" label="Grande Prairie"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item label="Which cities have you visited?" mb="l">
  <goa-dropdown-multiselect
    name="cities"
    filterable="true"
    maxheight="400px"
    width="320px"
  >
    <goa-dropdown-item value="calgary" label="Calgary"></goa-dropdown-item>
    <goa-dropdown-item value="edmonton" label="Edmonton"></goa-dropdown-item>
    <goa-dropdown-item value="red-deer" label="Red Deer"></goa-dropdown-item>
    <goa-dropdown-item value="lethbridge" label="Lethbridge"></goa-dropdown-item>
    <goa-dropdown-item value="medicine-hat" label="Medicine Hat"></goa-dropdown-item>
    <goa-dropdown-item value="grande-prairie" label="Grande Prairie"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
    {
      id: "select-all",
      name: "With select all",
      description: 'Shows a "Select all" option at the top of the list',
      code: {
        react: `<GoabFormItem label="Select departments" mb="l">
  <GoabDropdownMultiselect
    name="departments"
    showSelectAll={true}
    width="320px"
  >
    <GoabDropdownItem value="health" label="Health" />
    <GoabDropdownItem value="education" label="Education" />
    <GoabDropdownItem value="transportation" label="Transportation" />
    <GoabDropdownItem value="justice" label="Justice" />
  </GoabDropdownMultiselect>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      departments: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Select departments" mb="l">
    <goab-dropdown-multiselect
      name="departments"
      [showSelectAll]="true"
      formControlName="departments"
      width="320px"
    >
      <goab-dropdown-item value="health" label="Health"></goab-dropdown-item>
      <goab-dropdown-item value="education" label="Education"></goab-dropdown-item>
      <goab-dropdown-item value="transportation" label="Transportation"></goab-dropdown-item>
      <goab-dropdown-item value="justice" label="Justice"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  departments: string[] = [];

  dropdownOnChange(event: GoabDropdownMultiselectOnChangeDetail) {
    this.departments = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Select departments" mb="l">
    <goab-dropdown-multiselect
      name="departments"
      [showSelectAll]="true"
      [(ngModel)]="departments"
      (onChange)="dropdownOnChange($event)"
      width="320px"
    >
      <goab-dropdown-item value="health" label="Health"></goab-dropdown-item>
      <goab-dropdown-item value="education" label="Education"></goab-dropdown-item>
      <goab-dropdown-item value="transportation" label="Transportation"></goab-dropdown-item>
      <goab-dropdown-item value="justice" label="Justice"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item label="Select departments" mb="l">
  <goa-dropdown-multiselect name="departments" show-select-all="true" width="320px">
    <goa-dropdown-item value="health" label="Health"></goa-dropdown-item>
    <goa-dropdown-item value="education" label="Education"></goa-dropdown-item>
    <goa-dropdown-item value="transportation" label="Transportation"></goa-dropdown-item>
    <goa-dropdown-item value="justice" label="Justice"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
    {
      id: "sizes-and-states",
      name: "Sizes and states",
      description: "Default and compact sizes with disabled and error states",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabDropdownMultiselect name="sizeDefault" width="320px">
    <GoabDropdownItem value="draft" label="Draft" />
    <GoabDropdownItem value="review" label="In review" />
    <GoabDropdownItem value="approved" label="Approved" />
  </GoabDropdownMultiselect>
</GoabFormItem>
<GoabFormItem label="Compact size" mb="l">
  <GoabDropdownMultiselect name="sizeCompact" size="compact" width="320px">
    <GoabDropdownItem value="draft" label="Draft" />
    <GoabDropdownItem value="review" label="In review" />
    <GoabDropdownItem value="approved" label="Approved" />
  </GoabDropdownMultiselect>
</GoabFormItem>
<GoabFormItem label="Disabled" mb="l">
  <GoabDropdownMultiselect name="disabled" disabled width="320px">
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
  </GoabDropdownMultiselect>
</GoabFormItem>
<GoabFormItem label="With error" error="Please select at least one option" mb="l">
  <GoabDropdownMultiselect name="error" error width="320px">
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
  </GoabDropdownMultiselect>
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
      disabled: [{ value: [] as string[], disabled: true }],
      errorValue: [[] as string[]],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Default size" mb="l">
    <goab-dropdown-multiselect name="sizeDefault" formControlName="sizeDefault" width="320px">
      <goab-dropdown-item value="draft" label="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="review" label="In review"></goab-dropdown-item>
      <goab-dropdown-item value="approved" label="Approved"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="Compact size" mb="l">
    <goab-dropdown-multiselect
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
      width="320px"
    >
      <goab-dropdown-item value="draft" label="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="review" label="In review"></goab-dropdown-item>
      <goab-dropdown-item value="approved" label="Approved"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="Disabled" mb="l">
    <goab-dropdown-multiselect name="disabled" formControlName="disabled" width="320px">
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="With error" error="Please select at least one option" mb="l">
    <goab-dropdown-multiselect
      name="error"
      [error]="true"
      formControlName="errorValue"
      width="320px"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault: string[] = [];
  sizeCompact: string[] = [];
  disabledValue: string[] = [];
  errorValue: string[] = [];

  dropdownOnChange(event: GoabDropdownMultiselectOnChangeDetail) {
    this.errorValue = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-dropdown-multiselect
      name="sizeDefault"
      [(ngModel)]="sizeDefault"
      width="320px"
    >
      <goab-dropdown-item value="draft" label="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="review" label="In review"></goab-dropdown-item>
      <goab-dropdown-item value="approved" label="Approved"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="Compact size" mb="l">
    <goab-dropdown-multiselect
      name="sizeCompact"
      size="compact"
      [(ngModel)]="sizeCompact"
      width="320px"
    >
      <goab-dropdown-item value="draft" label="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="review" label="In review"></goab-dropdown-item>
      <goab-dropdown-item value="approved" label="Approved"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="Disabled" mb="l">
    <goab-dropdown-multiselect
      name="disabled"
      [disabled]="true"
      [(ngModel)]="disabledValue"
      width="320px"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
  <goab-form-item label="With error" error="Please select at least one option" mb="l">
    <goab-dropdown-multiselect
      name="error"
      [error]="true"
      [(ngModel)]="errorValue"
      (onChange)="dropdownOnChange($event)"
      width="320px"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown-multiselect>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item label="Default size" mb="l">
  <goa-dropdown-multiselect name="sizeDefault" width="320px">
    <goa-dropdown-item value="draft" label="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="review" label="In review"></goa-dropdown-item>
    <goa-dropdown-item value="approved" label="Approved"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>
<goa-form-item label="Compact size" mb="l">
  <goa-dropdown-multiselect name="sizeCompact" size="compact" width="320px">
    <goa-dropdown-item value="draft" label="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="review" label="In review"></goa-dropdown-item>
    <goa-dropdown-item value="approved" label="Approved"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>
<goa-form-item label="Disabled" mb="l">
  <goa-dropdown-multiselect name="disabled" disabled width="320px">
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>
<goa-form-item label="With error" error="Please select at least one option" mb="l">
  <goa-dropdown-multiselect name="error" error width="320px">
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
  </goa-dropdown-multiselect>
</goa-form-item>`,
      },
    },
  ],
};
