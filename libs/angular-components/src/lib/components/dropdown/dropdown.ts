import { GoABDropdownOnChangeDetail, GoABIconType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

// FIXME: issues exist when the `filterable` is set
@Component({
  standalone: true,
  selector: "goab-dropdown",
  template: `
    <goa-dropdown
      [name]="name"
      [value]="value"
      [arialabel]="ariaLabel"
      [arialabelledby]="ariaLabelledBy"
      [id]="id"
      [disabled]="disabled"
      [error]="error"
      [filterable]="filterable"
      [leadingicon]="leadingIcon"
      [maxheight]="maxHeight"
      [multiselect]="multiselect"
      [native]="native"
      [placeholder]="placeholder"
      [testid]="testId"
      [width]="width"
      [relative]="relative"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-dropdown>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GoABDropdown,
    }
  ],
})
export class GoABDropdown {
  @Input() name?: string;
  @Input() value?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() id?: string;
  @Input() disabled?: boolean;
  @Input() error?: boolean;
  @Input() filterable?: boolean;
  @Input() leadingIcon?: GoABIconType;
  @Input() maxHeight?: string;
  @Input() multiselect?: boolean;
  @Input() native?: boolean;
  @Input() placeholder?: string;
  @Input() testId?: string;
  @Input() width?: string;
  @Input() relative?: boolean;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABDropdownOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABDropdownOnChangeDetail>).detail;
    this.onChange.emit(detail)

    this.markAsTouched();
    this.fcChange?.(detail.value || "");
  }

  // ControlValueAccessor

  private fcChange?: (value: string) => void;
  private fcTouched?: () => {};
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.fcTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
