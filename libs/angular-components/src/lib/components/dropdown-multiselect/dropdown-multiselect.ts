import {
  GoabDropdownMultiselectOnChangeDetail,
  GoabCheckboxSize,
  GoabPopoverPosition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  inject,
  booleanAttribute,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-dropdown-multiselect",
  template: `@if (isReady) {
    <goa-dropdown-multiselect
      [attr.name]="name"
      [value]="value"
      [attr.disabled]="disabled ? 'true' : undefined"
      [attr.error]="error ? 'true' : undefined"
      [attr.testid]="testId"
      [attr.maxwidth]="maxWidth"
      [attr.size]="size"
      [attr.placeholder]="placeholder"
      [attr.popoverposition]="popoverPosition"
      [attr.popovermaxwidth]="popoverMaxWidth"
      [attr.popoverminwidth]="popoverMinWidth"
      [attr.popoverpadded]="popoverPadded === undefined ? undefined : popoverPadded ? 'true' : 'false'"
      [attr.popoverwidth]="popoverWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
      (_popoveropen)="_onPopoverOpen()"
      (_popoverclose)="_onPopoverClose()"
    >
      <ng-content />
    </goa-dropdown-multiselect>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A multiselect dropdown that combines a Popover trigger with a CheckboxList. */
export class GoabDropdownMultiselect extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;

  /** @required The name for the checkbox list group. Used as group identifier in change events. */
  @Input() name!: string;
  /** Array of currently selected checkbox values. */
  @Input() value?: string[];
  /** Disables the trigger button and all checkboxes. */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** Shows an error state on the trigger and all checkboxes. */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /** Sets the maximum width of the checkbox list inside the popover. */
  @Input() maxWidth?: string;
  /** Sets the size of the checkbox list. 'compact' reduces spacing between items. @default "default" */
  @Input() size?: GoabCheckboxSize = "default";
  /** Sets the placeholder text shown in the trigger when no values are selected. */
  @Input() placeholder?: string;
  /** Provides control to where the popover content is positioned. @default "auto" */
  @Input() popoverPosition?: GoabPopoverPosition;
  /** Sets the maximum width of the popover container. @default "320px" */
  @Input() popoverMaxWidth?: string;
  /** Sets the minimum width of the popover container. */
  @Input() popoverMinWidth?: string;
  /** Sets if the popover has padding. */
  @Input() popoverPadded?: boolean;
  /** Sets a fixed width for the popover container. */
  @Input() popoverWidth?: string;

  /** Emits when a checkbox selection changes. */
  @Output() onChange = new EventEmitter<GoabDropdownMultiselectOnChangeDetail>();
  /** Emits when the popover opens. */
  @Output() onPopoverOpen = new EventEmitter<void>();
  /** Emits when the popover closes. */
  @Output() onPopoverClose = new EventEmitter<void>();

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
  }

  _onPopoverOpen() {
    this.onPopoverOpen.emit();
  }

  _onPopoverClose() {
    this.onPopoverClose.emit();
  }
}
