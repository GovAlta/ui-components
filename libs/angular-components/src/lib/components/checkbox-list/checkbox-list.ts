import {
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxSize,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
    inject,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox-list",
  template: `@if (isReady) {
    <goa-checkbox-list
      [attr.name]="name"
      [value]="value"
      [disabled]="disabled"
      [attr.error]="error"
      [attr.testid]="testId"
      [id]="id"
      [attr.maxwidth]="maxWidth"
      [attr.version]="version"
      [attr.size]="size"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-checkbox-list>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabCheckboxList),
    },
  ],
})
/** A multiple selection input. */
export class GoabCheckboxList extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  /** @required The name for the checkbox list group. Used as group identifier in change events. */
  @Input() name!: string;
  /** Sets the maximum width of the checkbox list container. */
  @Input() maxWidth?: string;
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. @default "default" */
  @Input() size?: GoabCheckboxSize = "default";

  // Override value to handle string arrays consistently
  /** Array of currently selected checkbox values. */
  @Input() override value?: string[];


  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when a checkbox selection changes. Emits the change detail including name, value array, and event. */
  @Output() onChange = new EventEmitter<GoabCheckboxListOnChangeDetail>();

  _onChange(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabCheckboxListOnChangeDetail>).detail,
      event: e,
    };
    this.onChange.emit(detail);
    this.markAsTouched();

    // Update the form control with the selected values
    const selectedValues = detail.value || [];
    // clone to ensure a new reference so the underlying web component updates
    this.value = [...selectedValues];
    this.fcChange?.([...selectedValues]);
  }

  // Simplified writeValue - expects array input directly
  override writeValue(value: string[] | null): void {
    // clone to ensure a new reference and trigger downstream updates
    this.value = Array.isArray(value) ? [...value] : [];
  }
}
