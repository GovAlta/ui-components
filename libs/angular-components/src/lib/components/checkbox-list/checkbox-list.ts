import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox-list",
  template: `
    <goa-checkbox-list
      [attr.name]="name"
      [attr.value]="getSerializedValue()"
      [attr.disabled]="disabled ? 'true' : 'false'"
      [attr.error]="error ? 'true' : 'false'"
      [attr.testid]="testId"
      [attr.arialabel]="ariaLabel"
      [attr.orientation]="orientation"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-checkbox-list>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckboxList),
    },
  ],
})
export class GoabCheckboxList extends GoabControlValueAccessor {
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() orientation?: "vertical" | "horizontal" = "vertical";
  @Input() maxWidth?: string;
  @Input() override error?: boolean;

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  // Internal value as array - separate from base class value
  private _arrayValue: string[] = [];

  getSerializedValue(): string {
    return JSON.stringify(this._arrayValue);
  }

  // Override writeValue for form control integration
  override writeValue(val: string | string[] | null): void {
    if (val === null || val === undefined) {
      this._arrayValue = [];
      this.value = '[]';
    } else if (Array.isArray(val)) {
      this._arrayValue = val;
      this.value = JSON.stringify(val);
    } else if (typeof val === 'string') {
      try {
        this._arrayValue = JSON.parse(val || '[]');
        this.value = val;
      } catch (e) {
        this._arrayValue = [];
        this.value = '[]';
      }
    } else {
      this._arrayValue = [];
      this.value = '[]';
    }
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();

    // Update internal array value
    this._arrayValue = detail.values || [];

    // Update base class value with JSON string
    this.value = JSON.stringify(this._arrayValue);

    // Notify form control with array (Angular forms work better with arrays)
    this.fcChange?.(this._arrayValue);
  }
}