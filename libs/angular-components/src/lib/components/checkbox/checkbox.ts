import { GoabCheckboxOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef, TemplateRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-checkbox",
  template: `
    <goa-checkbox
      [attr.name]="name"
      [checked]="checked"
      [disabled]="disabled"
      [attr.error]="error"
      [attr.text]="text"
      [value]="value"
      [attr.testid]="testId"
      [attr.arialabel]="ariaLabel"
      [attr.description]="getDescriptionAsString()"
      [id]="id"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
      <div slot="description">
        <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
      </div>
    </goa-checkbox>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckbox),
    },
  ],
  imports: [NgTemplateOutlet],
})
export class GoabCheckbox implements ControlValueAccessor {
  @Input() name?: string;
  @Input() checked?: boolean;
  @Input() disabled?: boolean;
  @Input() error?: boolean;
  @Input() text?: string;
  @Input() value?: string | number | boolean;
  @Input() testId?: string;
  @Input() ariaLabel?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() id?: string;
  @Input() maxWidth?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabCheckboxOnChangeDetail>();

  getDescriptionAsString(): string {
    return typeof this.description === "string" ? this.description : "";
  }

  getDescriptionAsTemplate(): TemplateRef<any> | null {
    if (this.description) {
      return typeof this.description === "string" ? null : this.description;
    }
    return null;
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabCheckboxOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.binding === "check" ? detail.checked : detail.value || "");
  }

  // ControlValueAccessor

  private fcChange?: (value: string | boolean) => void;
  private fcTouched?: () => unknown;
  touched = false;

  markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  writeValue(value: string | boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.fcChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fcTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
