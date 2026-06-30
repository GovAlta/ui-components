import {
  GoabDropdownMultiselectLabelFormatOptions,
  GoabDropdownMultiselectOnChangeDetail,
  GoabDropdownMultiselectSize,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  booleanAttribute,
  forwardRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-dropdown-multiselect",
  template: `@if (isReady) {
    <goa-dropdown-multiselect
      [attr.name]="name"
      [value]="value"
      [attr.placeholder]="placeholder"
      [attr.disabled]="disabled ? 'true' : undefined"
      [attr.error]="error ? 'true' : undefined"
      [attr.filterable]="filterable"
      [attr.leading-icon]="leadingIcon"
      [attr.testid]="testId"
      [attr.aria-label]="ariaLabel"
      [attr.aria-labelledby]="ariaLabelledBy"
      [attr.max-height]="maxHeight"
      [attr.width]="width"
      [attr.size]="size"
      [attr.label-format]="labelFormat ? labelFormat : undefined"
      [attr.show-select-all]="showSelectAll ? 'true' : undefined"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-dropdown-multiselect>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabDropdownMultiselect),
    },
  ],
})
/** A dropdown that presents a list of checkboxes for multiple selection. */
export class GoabDropdownMultiselect extends GoabControlValueAccessor implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;

  /** @required Identifier for the group. Used in change events. */
  @Input({ required: true }) name!: string;
  /** Array of currently selected checkbox values. */
  @Input() override value?: string[];
  /** Text shown when nothing is selected. */
  @Input() placeholder?: string;
  /** Enables filtering of options by typing in the trigger. */
  @Input({ transform: booleanAttribute }) filterable?: boolean;
  /** Icon shown to the left of the dropdown input. */
  @Input() leadingIcon?: GoabIconType;
  /** Provides an accessible label when no visible label is associated. */
  @Input() ariaLabel?: string;
  /** References an external element that labels this component. */
  @Input() ariaLabelledBy?: string;
  /** Sets the maximum height of the dropdown content area. @default "276px" */
  @Input() maxHeight?: string;
  /** Sets a fixed width for the component and popover panel. */
  @Input() width?: string;
  /** Sets the size variant. @default "default" */
  @Input() size?: GoabDropdownMultiselectSize = "default";
  /** The display label format of the closed dropdown. When 'count' the display label shows only "n items" in the label, when 'list' it shows a comma separated list of selected item labels. @default "list" */
  @Input() labelFormat?: GoabDropdownMultiselectLabelFormatOptions;
  /** Shows a "Select All" checkbox at the top of the options list. @default false */
  @Input({ transform: booleanAttribute }) showSelectAll?: boolean;
  /** Emits when the selected value change. */
  @Output() onChange = new EventEmitter<GoabDropdownMultiselectOnChangeDetail>();

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  _onChange(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabDropdownMultiselectOnChangeDetail>).detail,
      event: e,
    };
    this.onChange.emit(detail);
    this.markAsTouched();
    this.value = [...(detail.value || [])];
    this.fcChange?.([...(detail.value || [])]);
  }

  override writeValue(value: string[] | null): void {
    this.value = Array.isArray(value) ? [...value] : [];
  }
}
