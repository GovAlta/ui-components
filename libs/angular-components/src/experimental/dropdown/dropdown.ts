import {
  GoabDropdownOnChangeDetail,
  GoabDropdownSize,
  GoabIconType,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

import { GoabControlValueAccessor } from "../base.component";

// "disabled", "value", "id" is an exposed property of HTMLInputElement, no need to bind with attr
@Component({
  standalone: true,
  selector: "goabx-dropdown",

  template: `
    @if (isReady) {
      <goa-dropdown
        #goaComponentRef
        [attr.version]="version"
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
        [attr.size]="size"
        [id]="id"
        (_change)="_onChange($event)"
      >
        <ng-content />
      </goa-dropdown>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GoabxDropdown),
    },
  ],
})
export class GoabxDropdown extends GoabControlValueAccessor implements OnInit {
  /**
   * Identifier for the dropdown. Should be unique.
   */
  @Input() name?: string;
  /**
   * Defines how the selected value will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  @Input() ariaLabel?: string;
  /**
   * The aria-labelledby attribute identifies the element(or elements) that labels the dropdown it is applied to. Normally it is the id of the label.
   * @default ""
   */
  @Input() ariaLabelledBy?: string;
  /**
   * When true the dropdown will have the ability to filter options by typing into the input field.
   * @default false
   */
  @Input({ transform: booleanAttribute }) filterable?: boolean;
  /** Icon shown to the left of the dropdown input. */
  @Input() leadingIcon?: GoabIconType;
  /**
   * Maximum height of the dropdown menu. Non-native only.
   * @default "276px"
   */
  @Input() maxHeight?: string;
  @Input({ transform: booleanAttribute }) multiselect?: boolean;
  /**
   * When true will render the native select HTML element.
   * @default false
   */
  @Input({ transform: booleanAttribute }) native?: boolean;
  /**
   * The text displayed for the dropdown before a selection is made. Non-native only.
   * @default ""
   */
  @Input() placeholder?: string;
  /**
   * Overrides the autosized menu width. Non-native only.
   * @default ""
   */
  @Input() width?: string;
  /**
   * Sets the maximum width of the dropdown. Use a CSS unit (px, %, ch, rem, em).
   * @default ""
   */
  @Input() maxWidth?: string;
  /**
   * Specifies the autocomplete attribute for the dropdown input. Native only.
   * @default ""
   */
  @Input() autoComplete?: string;
  /**
   * Sets the size of the dropdown. Compact reduces height for dense layouts.
   * @default "default"
   */
  @Input() size?: GoabDropdownSize = "default";
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  @Output() onChange = new EventEmitter<GoabDropdownOnChangeDetail>();

  isReady = false;
  version = "2";

  constructor(
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
  ) {
    super(renderer);
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onChange(e: Event) {
    const detail = { ...(e as CustomEvent<GoabDropdownOnChangeDetail>).detail, event: e };
    // Keep local value in sync with emitted detail
    this.value = detail.value || null;
    this.onChange.emit(detail);

    this.markAsTouched();
    this.fcChange?.(detail.value || "");
  }
}
