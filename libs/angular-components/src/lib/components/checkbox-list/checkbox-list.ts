import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox-list",
  template: ` <goa-checkbox-list
    *ngIf="isReady"
    [attr.name]="name"
    [value]="value"
    [disabled]="disabled"
    [attr.error]="error"
    [attr.testid]="testId"
    [id]="id"
    [attr.maxwidth]="maxWidth"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.ml]="ml"
    [attr.mr]="mr"
    (_change)="_onChange($event)"
  >
    <ng-content />
  </goa-checkbox-list>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckboxList),
    },
  ],
})
export class GoabCheckboxList extends GoabControlValueAccessor implements OnInit {
  isReady = false;
  @Input() name!: string;
  @Input() maxWidth?: string;

  // Override value to handle string arrays consistently
  @Input() override value?: string[];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  _onChange(e: Event) {
    try {
      const detail = (e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail;
      this.onChange.emit(detail);
      this.markAsTouched();

      // Update the form control with the selected values
      const selectedValues = detail.value || [];
      // clone to ensure a new reference so the underlying web component updates
      this.value = [...selectedValues];
      this.fcChange?.([...selectedValues]);
    } catch (error) {
      console.error("Error handling checkbox list change:", error);
    }
  }

  // Simplified writeValue - expects array input directly
  override writeValue(value: string[] | null): void {
    try {
      // clone to ensure a new reference and trigger downstream updates
      this.value = Array.isArray(value) ? [...value] : [];
    } catch (error) {
      console.error("Error setting checkbox list value:", error);
      this.value = [];
    }
  }
}
