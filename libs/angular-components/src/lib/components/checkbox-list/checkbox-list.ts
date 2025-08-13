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
    [attr.showselectall]="showSelectAll ? 'true' : 'false'"
    [attr.selectalltext]="selectAllText"
    (_change)="_onChange($event)"
  >
    <ng-content />
    <div slot="description">
      <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
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

  // Override value to handle string arrays
  @Input() override value?: string[] | string;

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  private getSelectedValuesArray(): string[] {
    if (Array.isArray(this.value)) {
      return this.value;
    }
    if (typeof this.value === "string" && this.value) {
      return this.value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
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

  getDescriptionAsTemplate(): TemplateRef<unknown> | null {
    if (this.description) {
      return typeof this.description === "string" ? null : this.description;
    }
    return null;
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
    this.onChange.emit(detail);
    this.markAsTouched();

    // Update the form control with the selected values
    const selectedValues = detail.selectedValues || [];
    this.value = selectedValues;
    this.fcChange?.(selectedValues);
  }

  // Override writeValue to handle both array and string inputs
  override writeValue(value: string[] | string | null): void {
    if (Array.isArray(value)) {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    } else {
      this.value = [];
    }
  }
}
