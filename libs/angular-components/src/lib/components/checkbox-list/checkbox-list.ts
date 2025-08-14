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
// no direct child control syncing; wrapper is a thin bridge

@Component({
  standalone: true,
  selector: "goab-checkbox-list",
  template: ` <goa-checkbox-list
    [attr.name]="name"
    [attr.value]="getValueAsString()"
    [disabled]="disabled"
    [attr.error]="error"
    [attr.orientation]="orientation"
    [attr.testid]="testId"
    [attr.arialabel]="ariaLabel"
    [attr.description]="getDescriptionAsString()"
    [id]="id"
    [attr.maxwidth]="maxWidth"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    [attr.showselectall]="showSelectAll ? 'true' : undefined"
    [attr.selectalltext]="selectAllText"
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
  @Input() orientation: "vertical" | "horizontal" = "vertical";
  @Input() ariaLabel?: string;
  @Input() description!: string | TemplateRef<unknown>;
  @Input() maxWidth?: string;
  @Input() showSelectAll?: boolean;
  @Input() selectAllText?: string = "Select All";

  // Override value to handle string arrays consistently
  @Input() override value?: string[];

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  private getSelectedValuesArray(): string[] {
    if (Array.isArray(this.value)) {
      return this.value;
    }
    return [];
  }

  getValueAsString(): string {
    const selectedValues = this.getSelectedValuesArray();
    return selectedValues.join(",");
  }

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
      const selectedValues = detail.selectedValues || [];
      this.value = selectedValues;
      this.fcChange?.(selectedValues);
    } catch (error) {
      console.error("Error handling checkbox list change:", error);
    }
  }

  // Override writeValue to handle array inputs consistently
  override writeValue(value: string[] | string | null): void {
    try {
      if (Array.isArray(value)) {
        this.value = value;
      } else if (typeof value === "string" && value) {
        // Support legacy string format for backward compatibility
        this.value = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      } else {
        this.value = [];
      }
    } catch (error) {
      console.error("Error setting checkbox list value:", error);
      this.value = [];
    }
  }
}
