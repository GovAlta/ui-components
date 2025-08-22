import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  TemplateRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox-list",
  template: ` <goa-checkbox-list
    [attr.name]="name"
    [value]="value"
    [disabled]="disabled"
    [attr.error]="error"
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
      <ng-container [ngTemplateOutlet]="descriptionTemplate"></ng-container>
    </div>
  </goa-checkbox-list>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckboxList),
    },
  ],
  imports: [NgTemplateOutlet, NgIf],
})
export class GoabCheckboxList extends GoabControlValueAccessor {
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() description!: string | TemplateRef<unknown>;
  @Input() maxWidth?: string;

  // Override value to handle string arrays consistently
  @Input() override value?: string[];

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  getDescriptionAsString(): string {
    return typeof this.description === "string" ? this.description : "";
  }

  get descriptionTemplate(): TemplateRef<unknown> | null {
    if (this.description && typeof this.description !== "string") {
      return this.description;
    }
    return null;
  }

  _onChange(e: Event) {
    try {
      const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
      this.onChange.emit(detail);
      this.markAsTouched();

      // Update the form control with the selected values
      const selectedValues = detail.value || [];
      this.value = selectedValues;
      this.fcChange?.(selectedValues);
    } catch (error) {
      console.error("Error handling checkbox list change:", error);
    }
  }

  // Simplified writeValue - expects array input directly
  override writeValue(value: string[] | null): void {
    try {
      this.value = Array.isArray(value) ? value : [];
    } catch (error) {
      console.error("Error setting checkbox list value:", error);
      this.value = [];
    }
  }
}
