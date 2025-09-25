import { GoabDropdownOnChangeDetail, GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

// "disabled", "value", "id" is an exposed property of HTMLInputElement, no need to bind with attr
@Component({
  standalone: true,
  selector: "goab-dropdown",
  template: `
    <goa-dropdown
      [attr.name]="name"
      [value]="value"
      [attr.arialabel]="ariaLabel"
      [attr.arialabelledby]="ariaLabelledBy"
      [disabled]="disabled"
      [attr.error]="error"
      [attr.filterable]="filterable"
      [attr.leadingicon]="leadingIcon"
      [attr.maxheight]="maxHeight"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      [attr.mt]="mt"
      [attr.multiselect]="multiselect"
      [attr.native]="native"
      [attr.placeholder]="placeholder"
      [attr.testid]="testId"
      [attr.width]="width"
      [attr.maxwidth]="maxWidth"
      [attr.relative]="relative"
      [attr.autocomplete]="autoComplete"
      [id]="id"
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
      useExisting: forwardRef(() => GoabDropdown),
    },
  ],
})
export class GoabDropdown extends GoabControlValueAccessor {
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input({ transform: booleanAttribute }) filterable?: boolean;
  @Input() leadingIcon?: GoabIconType;
  @Input() maxHeight?: string;
  @Input({ transform: booleanAttribute }) multiselect?: boolean;
  @Input({ transform: booleanAttribute }) native?: boolean;
  @Input() placeholder?: string;
  @Input() width?: string;
  @Input() maxWidth?: string;
  @Input() autoComplete?: string;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;

  @Output() onChange = new EventEmitter<GoabDropdownOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabDropdownOnChangeDetail>).detail;
    this.onChange.emit(detail);

    this.markAsTouched();
    this.fcChange?.(detail.value || "");
  }
}
