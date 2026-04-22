/**
 * Dropdown Component Configurations
 *
 * Shows various Dropdown use cases wrapped in FormItem.
 * Note: Dropdown must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const dropdownConfigurations: ComponentConfigurations = {
  componentSlug: "dropdown",
  componentName: "Dropdown",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Simple dropdown with options",
      code: {
        react: `const [province, setProvince] = useState<string | undefined>();

<GoabFormItem label="Province or territory" mb="l">
  <GoabDropdown
    name="province"
    value={province}
    onChange={(detail) => setProvince(detail.value)}
  >
    <GoabDropdownItem value="Alberta" />
    <GoabDropdownItem value="British Columbia" />
    <GoabDropdownItem value="Manitoba" />
    <GoabDropdownItem value="New Brunswick" />
    <GoabDropdownItem value="Newfoundland and Labrador" />
    <GoabDropdownItem value="Nova Scotia" />
    <GoabDropdownItem value="Northwest Territories" />
    <GoabDropdownItem value="Nunavut" />
    <GoabDropdownItem value="Ontario" />
    <GoabDropdownItem value="Prince Edward Island" />
    <GoabDropdownItem value="Quebec" />
    <GoabDropdownItem value="Saskatchewan" />
    <GoabDropdownItem value="Yukon" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      province: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Province or territory" mb="l">
    <goab-dropdown name="province" formControlName="province">
      <goab-dropdown-item value="Alberta"></goab-dropdown-item>
      <goab-dropdown-item value="British Columbia"></goab-dropdown-item>
      <goab-dropdown-item value="Manitoba"></goab-dropdown-item>
      <goab-dropdown-item value="Ontario"></goab-dropdown-item>
      <goab-dropdown-item value="Quebec"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  province = "";

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    this.province = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Province or territory" mb="l">
    <goab-dropdown
      name="province"
      [(ngModel)]="province"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="Alberta"></goab-dropdown-item>
      <goab-dropdown-item value="British Columbia"></goab-dropdown-item>
      <goab-dropdown-item value="Manitoba"></goab-dropdown-item>
      <goab-dropdown-item value="Ontario"></goab-dropdown-item>
      <goab-dropdown-item value="Quebec"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Province or territory" mb="l">
  <goa-dropdown version="2" name="province">
    <goa-dropdown-item value="Alberta"></goa-dropdown-item>
    <goa-dropdown-item value="British Columbia"></goa-dropdown-item>
    <goa-dropdown-item value="Manitoba"></goa-dropdown-item>
    <goa-dropdown-item value="New Brunswick"></goa-dropdown-item>
    <goa-dropdown-item value="Newfoundland and Labrador"></goa-dropdown-item>
    <goa-dropdown-item value="Nova Scotia"></goa-dropdown-item>
    <goa-dropdown-item value="Northwest Territories"></goa-dropdown-item>
    <goa-dropdown-item value="Nunavut"></goa-dropdown-item>
    <goa-dropdown-item value="Ontario"></goa-dropdown-item>
    <goa-dropdown-item value="Prince Edward Island"></goa-dropdown-item>
    <goa-dropdown-item value="Quebec"></goa-dropdown-item>
    <goa-dropdown-item value="Saskatchewan"></goa-dropdown-item>
    <goa-dropdown-item value="Yukon"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "with-custom-placeholder",
      name: "With custom placeholder",
      description: "Dropdown with placeholder text when no selection",
      code: {
        react: `const [contactMethod, setContactMethod] = useState<string | undefined>();

<GoabFormItem label="How would you like to be contacted?" mb="l">
  <GoabDropdown
    name="contactMethod"
    placeholder="—Select contact method—"
    value={contactMethod}
    onChange={(detail) => setContactMethod(detail.value)}
  >
    <GoabDropdownItem value="Email" />
    <GoabDropdownItem value="Phone" />
    <GoabDropdownItem value="Mail" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contactMethod: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="How would you like to be contacted?" mb="l">
    <goab-dropdown
      name="contactMethod"
      placeholder="—Select contact method—"
      formControlName="contactMethod"
    >
      <goab-dropdown-item value="Email"></goab-dropdown-item>
      <goab-dropdown-item value="Phone"></goab-dropdown-item>
      <goab-dropdown-item value="Mail"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  contactMethod = "";

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    this.contactMethod = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="How would you like to be contacted?" mb="l">
    <goab-dropdown
      name="contactMethod"
      placeholder="—Select contact method—"
      [(ngModel)]="contactMethod"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="Email"></goab-dropdown-item>
      <goab-dropdown-item value="Phone"></goab-dropdown-item>
      <goab-dropdown-item value="Mail"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="How would you like to be contacted?" mb="l">
  <goa-dropdown version="2" name="contactMethod" placeholder="—Select contact method—">
    <goa-dropdown-item value="Email"></goa-dropdown-item>
    <goa-dropdown-item value="Phone"></goa-dropdown-item>
    <goa-dropdown-item value="Mail"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "filterable",
      name: "Filterable",
      description: "Dropdown with search/filter capability for long lists",
      code: {
        react: `<GoabFormItem label="What city do you live in?" mb="l">
  <GoabDropdown name="city" filterable leadingIcon="search" maxHeight="400px">
    <GoabDropdownItem value="Airdrie" />
    <GoabDropdownItem value="Athabasca" />
    <GoabDropdownItem value="Banff" />
    <GoabDropdownItem value="Barrhead" />
    <GoabDropdownItem value="Beaumont" />
    <GoabDropdownItem value="Bonnyville" />
    <GoabDropdownItem value="Brooks" />
    <GoabDropdownItem value="Calgary" />
    <GoabDropdownItem value="Camrose" />
    <GoabDropdownItem value="Canmore" />
    <GoabDropdownItem value="Chestermere" />
    <GoabDropdownItem value="Cochrane" />
    <GoabDropdownItem value="Cold Lake" />
    <GoabDropdownItem value="Drayton Valley" />
    <GoabDropdownItem value="Drumheller" />
    <GoabDropdownItem value="Edmonton" />
    <GoabDropdownItem value="Edson" />
    <GoabDropdownItem value="Fort McMurray" />
    <GoabDropdownItem value="Fort Saskatchewan" />
    <GoabDropdownItem value="Grande Prairie" />
    <GoabDropdownItem value="High River" />
    <GoabDropdownItem value="Hinton" />
    <GoabDropdownItem value="Jasper" />
    <GoabDropdownItem value="Lacombe" />
    <GoabDropdownItem value="Leduc" />
    <GoabDropdownItem value="Lethbridge" />
    <GoabDropdownItem value="Lloydminster" />
    <GoabDropdownItem value="Medicine Hat" />
    <GoabDropdownItem value="Morinville" />
    <GoabDropdownItem value="Okotoks" />
    <GoabDropdownItem value="Olds" />
    <GoabDropdownItem value="Peace River" />
    <GoabDropdownItem value="Ponoka" />
    <GoabDropdownItem value="Red Deer" />
    <GoabDropdownItem value="Sherwood Park" />
    <GoabDropdownItem value="Spruce Grove" />
    <GoabDropdownItem value="St. Albert" />
    <GoabDropdownItem value="Stettler" />
    <GoabDropdownItem value="Stony Plain" />
    <GoabDropdownItem value="Sylvan Lake" />
    <GoabDropdownItem value="Taber" />
    <GoabDropdownItem value="Vegreville" />
    <GoabDropdownItem value="Vermilion" />
    <GoabDropdownItem value="Wainwright" />
    <GoabDropdownItem value="Westlock" />
    <GoabDropdownItem value="Wetaskiwin" />
    <GoabDropdownItem value="Whitecourt" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  cities = [
    "Airdrie",
    "Athabasca",
    "Banff",
    "Barrhead",
    "Beaumont",
    "Bonnyville",
    "Brooks",
    "Calgary",
    "Camrose",
    "Canmore",
    "Chestermere",
    "Cochrane",
    "Cold Lake",
    "Drayton Valley",
    "Drumheller",
    "Edmonton",
    "Edson",
    "Fort McMurray",
    "Fort Saskatchewan",
    "Grande Prairie",
    "High River",
    "Hinton",
    "Jasper",
    "Lacombe",
    "Leduc",
    "Lethbridge",
    "Lloydminster",
    "Medicine Hat",
    "Morinville",
    "Okotoks",
    "Olds",
    "Peace River",
    "Ponoka",
    "Red Deer",
    "Sherwood Park",
    "Spruce Grove",
    "St. Albert",
    "Stettler",
    "Stony Plain",
    "Sylvan Lake",
    "Taber",
    "Vegreville",
    "Vermilion",
    "Wainwright",
    "Westlock",
    "Wetaskiwin",
    "Whitecourt",
  ];
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      city: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="What city do you live in?" mb="l">
    <goab-dropdown
      name="city"
      [filterable]="true"
      leadingIcon="search"
      maxHeight="400px"
      formControlName="city"
    >
      @for (city of cities; track city) {
      <goab-dropdown-item [value]="city"></goab-dropdown-item>
      }
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  city = "";
  cities = [
    "Airdrie",
    "Athabasca",
    "Banff",
    "Barrhead",
    "Beaumont",
    "Bonnyville",
    "Brooks",
    "Calgary",
    "Camrose",
    "Canmore",
    "Chestermere",
    "Cochrane",
    "Cold Lake",
    "Drayton Valley",
    "Drumheller",
    "Edmonton",
    "Edson",
    "Fort McMurray",
    "Fort Saskatchewan",
    "Grande Prairie",
    "High River",
    "Hinton",
    "Jasper",
    "Lacombe",
    "Leduc",
    "Lethbridge",
    "Lloydminster",
    "Medicine Hat",
    "Morinville",
    "Okotoks",
    "Olds",
    "Peace River",
    "Ponoka",
    "Red Deer",
    "Sherwood Park",
    "Spruce Grove",
    "St. Albert",
    "Stettler",
    "Stony Plain",
    "Sylvan Lake",
    "Taber",
    "Vegreville",
    "Vermilion",
    "Wainwright",
    "Westlock",
    "Wetaskiwin",
    "Whitecourt",
  ];

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    this.city = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="What city do you live in?" mb="l">
    <goab-dropdown
      name="city"
      [filterable]="true"
      leadingIcon="search"
      maxHeight="400px"
      [(ngModel)]="city"
      (onChange)="dropdownOnChange($event)"
    >
      @for (city of cities; track city) {
      <goab-dropdown-item [value]="city"></goab-dropdown-item>
      }
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="What city do you live in?" mb="l">
  <goa-dropdown version="2" name="city" filterable leadingicon="search" maxheight="400px">
    <goa-dropdown-item value="Airdrie"></goa-dropdown-item>
    <goa-dropdown-item value="Athabasca"></goa-dropdown-item>
    <goa-dropdown-item value="Banff"></goa-dropdown-item>
    <goa-dropdown-item value="Barrhead"></goa-dropdown-item>
    <goa-dropdown-item value="Beaumont"></goa-dropdown-item>
    <goa-dropdown-item value="Bonnyville"></goa-dropdown-item>
    <goa-dropdown-item value="Brooks"></goa-dropdown-item>
    <goa-dropdown-item value="Calgary"></goa-dropdown-item>
    <goa-dropdown-item value="Camrose"></goa-dropdown-item>
    <goa-dropdown-item value="Canmore"></goa-dropdown-item>
    <goa-dropdown-item value="Chestermere"></goa-dropdown-item>
    <goa-dropdown-item value="Cochrane"></goa-dropdown-item>
    <goa-dropdown-item value="Cold Lake"></goa-dropdown-item>
    <goa-dropdown-item value="Drayton Valley"></goa-dropdown-item>
    <goa-dropdown-item value="Drumheller"></goa-dropdown-item>
    <goa-dropdown-item value="Edmonton"></goa-dropdown-item>
    <goa-dropdown-item value="Edson"></goa-dropdown-item>
    <goa-dropdown-item value="Fort McMurray"></goa-dropdown-item>
    <goa-dropdown-item value="Fort Saskatchewan"></goa-dropdown-item>
    <goa-dropdown-item value="Grande Prairie"></goa-dropdown-item>
    <goa-dropdown-item value="High River"></goa-dropdown-item>
    <goa-dropdown-item value="Hinton"></goa-dropdown-item>
    <goa-dropdown-item value="Jasper"></goa-dropdown-item>
    <goa-dropdown-item value="Lacombe"></goa-dropdown-item>
    <goa-dropdown-item value="Leduc"></goa-dropdown-item>
    <goa-dropdown-item value="Lethbridge"></goa-dropdown-item>
    <goa-dropdown-item value="Lloydminster"></goa-dropdown-item>
    <goa-dropdown-item value="Medicine Hat"></goa-dropdown-item>
    <goa-dropdown-item value="Morinville"></goa-dropdown-item>
    <goa-dropdown-item value="Okotoks"></goa-dropdown-item>
    <goa-dropdown-item value="Olds"></goa-dropdown-item>
    <goa-dropdown-item value="Peace River"></goa-dropdown-item>
    <goa-dropdown-item value="Ponoka"></goa-dropdown-item>
    <goa-dropdown-item value="Red Deer"></goa-dropdown-item>
    <goa-dropdown-item value="Sherwood Park"></goa-dropdown-item>
    <goa-dropdown-item value="Spruce Grove"></goa-dropdown-item>
    <goa-dropdown-item value="St. Albert"></goa-dropdown-item>
    <goa-dropdown-item value="Stettler"></goa-dropdown-item>
    <goa-dropdown-item value="Stony Plain"></goa-dropdown-item>
    <goa-dropdown-item value="Sylvan Lake"></goa-dropdown-item>
    <goa-dropdown-item value="Taber"></goa-dropdown-item>
    <goa-dropdown-item value="Vegreville"></goa-dropdown-item>
    <goa-dropdown-item value="Vermilion"></goa-dropdown-item>
    <goa-dropdown-item value="Wainwright"></goa-dropdown-item>
    <goa-dropdown-item value="Westlock"></goa-dropdown-item>
    <goa-dropdown-item value="Wetaskiwin"></goa-dropdown-item>
    <goa-dropdown-item value="Whitecourt"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "native",
      name: "Native",
      description: "Native HTML select element compared with custom dropdown",
      code: {
        react: `<GoabFormItem label="Custom dropdown" mb="l">
  <GoabDropdown name="custom">
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
    <GoabDropdownItem value="opt3" label="Option 3" />
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Native dropdown" mb="l">
  <GoabDropdown name="native" native>
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
    <GoabDropdownItem value="opt3" label="Option 3" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      custom: [""],
      native: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Custom dropdown" mb="l">
    <goab-dropdown name="custom" formControlName="custom">
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
      <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item label="Native dropdown" mb="l">
    <goab-dropdown name="native" [native]="true" formControlName="native">
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
      <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  custom = "";
  native = "";

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-form-item label="Custom dropdown" mb="l">
    <goab-dropdown
      name="custom"
      [(ngModel)]="custom"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
      <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item label="Native dropdown" mb="l">
    <goab-dropdown
      name="native"
      [native]="true"
      [(ngModel)]="native"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
      <goab-dropdown-item value="opt3" label="Option 3"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Custom dropdown" mb="l">
  <goa-dropdown version="2" name="custom">
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
    <goa-dropdown-item value="opt3" label="Option 3"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Native dropdown" mb="l">
  <goa-dropdown version="2" name="native" native>
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
    <goa-dropdown-item value="opt3" label="Option 3"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabDropdown name="sizeDefault">
    <GoabDropdownItem value="Draft" />
    <GoabDropdownItem value="In review" />
    <GoabDropdownItem value="Approved" />
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Compact size" mb="l">
  <GoabDropdown name="sizeCompact" size="compact">
    <GoabDropdownItem value="Draft" />
    <GoabDropdownItem value="In review" />
    <GoabDropdownItem value="Approved" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sizeDefault: [""],
      sizeCompact: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Default size" mb="l">
    <goab-dropdown name="sizeDefault" formControlName="sizeDefault">
      <goab-dropdown-item value="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="In review"></goab-dropdown-item>
      <goab-dropdown-item value="Approved"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item label="Compact size" mb="l">
    <goab-dropdown
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
    >
      <goab-dropdown-item value="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="In review"></goab-dropdown-item>
      <goab-dropdown-item value="Approved"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault = "";
  sizeCompact = "";

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-dropdown
      name="sizeDefault"
      [(ngModel)]="sizeDefault"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="In review"></goab-dropdown-item>
      <goab-dropdown-item value="Approved"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item label="Compact size" mb="l">
    <goab-dropdown
      name="sizeCompact"
      size="compact"
      [(ngModel)]="sizeCompact"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="Draft"></goab-dropdown-item>
      <goab-dropdown-item value="In review"></goab-dropdown-item>
      <goab-dropdown-item value="Approved"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-dropdown version="2" name="sizeDefault">
    <goa-dropdown-item value="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="In review"></goa-dropdown-item>
    <goa-dropdown-item value="Approved"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Compact size" mb="l">
  <goa-dropdown version="2" name="sizeCompact" size="compact">
    <goa-dropdown-item value="Draft"></goa-dropdown-item>
    <goa-dropdown-item value="In review"></goa-dropdown-item>
    <goa-dropdown-item value="Approved"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `const [errorValue, setErrorValue] = useState<string | undefined>();

<GoabFormItem label="Disabled dropdown" mb="l">
  <GoabDropdown name="disabled" disabled value="AB">
    <GoabDropdownItem value="AB" label="Alberta" />
    <GoabDropdownItem value="BC" label="British Columbia" />
  </GoabDropdown>
</GoabFormItem>
<GoabFormItem label="Dropdown with error" error="Please select an option" mb="l">
  <GoabDropdown
    name="error"
    error
    placeholder="Select an option"
    value={errorValue}
    onChange={(detail) => setErrorValue(detail.value)}
  >
    <GoabDropdownItem value="opt1" label="Option 1" />
    <GoabDropdownItem value="opt2" label="Option 2" />
  </GoabDropdown>
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disabled: [{ value: "AB", disabled: true }],
      errorValue: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Disabled dropdown" mb="l">
    <goab-dropdown name="disabled" formControlName="disabled">
      <goab-dropdown-item value="AB" label="Alberta"></goab-dropdown-item>
      <goab-dropdown-item
        value="BC"
        label="British Columbia"
      ></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item
    label="Dropdown with error"
    error="Please select an option"
    mb="l"
  >
    <goab-dropdown
      name="error"
      [error]="true"
      placeholder="Select an option"
      formControlName="errorValue"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  disabledValue = "AB";
  errorValue = "";

  dropdownOnChange(event: GoabDropdownOnChangeDetail) {
    this.errorValue = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Disabled dropdown" mb="l">
    <goab-dropdown
      name="disabled"
      [disabled]="true"
      [(ngModel)]="disabledValue"
    >
      <goab-dropdown-item value="AB" label="Alberta"></goab-dropdown-item>
      <goab-dropdown-item
        value="BC"
        label="British Columbia"
      ></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
  <goab-form-item
    label="Dropdown with error"
    error="Please select an option"
    mb="l"
  >
    <goab-dropdown
      name="error"
      [error]="true"
      placeholder="Select an option"
      [(ngModel)]="errorValue"
      (onChange)="dropdownOnChange($event)"
    >
      <goab-dropdown-item value="opt1" label="Option 1"></goab-dropdown-item>
      <goab-dropdown-item value="opt2" label="Option 2"></goab-dropdown-item>
    </goab-dropdown>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Disabled dropdown" mb="l">
  <goa-dropdown version="2" name="disabled" disabled value="AB">
    <goa-dropdown-item value="AB" label="Alberta"></goa-dropdown-item>
    <goa-dropdown-item value="BC" label="British Columbia"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
<goa-form-item version="2" label="Dropdown with error" error="Please select an option" mb="l">
  <goa-dropdown version="2" name="error" error placeholder="Select an option">
    <goa-dropdown-item value="opt1" label="Option 1"></goa-dropdown-item>
    <goa-dropdown-item value="opt2" label="Option 2"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>`,
      },
    },
  ],
};
