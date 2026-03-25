import { GoabCheckboxOnChangeDetail } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgTemplateOutlet } from "@angular/common";
import { GoabControlValueAccessor } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-checkbox",
  template: ` @if (isReady) {
    <goa-checkbox
      #goaComponentRef
      [attr.name]="name"
      [checked]="checked"
      [disabled]="disabled"
      [attr.indeterminate]="indeterminate ? 'true' : undefined"
      [attr.error]="error"
      [attr.text]="text"
      [value]="value"
      [attr.testid]="testId"
      [attr.arialabel]="ariaLabel"
      [attr.description]="getDescriptionAsString()"
      [attr.revealarialabel]="revealArialLabel"
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
      <div slot="reveal">
        @if (reveal) {
          <ng-container [ngTemplateOutlet]="reveal"></ng-container>
        }
      </div>
    </goa-checkbox>
  }`,
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
export class GoabCheckbox extends GoabControlValueAccessor implements OnInit {
  isReady = false;

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

  /** Unique name to identify the checkbox. */
  @Input() name?: string;
  /**
   * Marks the checkbox item as selected.
   * @default false
   */
  @Input({ transform: booleanAttribute }) checked?: boolean;
  /**
   * Shows a mixed/partial selection state. Used for 'Select All' checkboxes when some items are selected.
   * @default false
   */
  @Input({ transform: booleanAttribute }) indeterminate?: boolean;
  /**
   * Label shown beside the checkbox.
   * @default ""
   */
  @Input() text?: string;
  // ** NOTE: can we just use the base component for this?
  @Input() override value?: string | number | boolean | null;
  /**
   * Defines how the text will be translated for the screen reader. If not specified it will fall back to the name.
   * @default ""
   */
  @Input() ariaLabel?: string;
  /**
   * Additional description text displayed below the checkbox label.
   */
  @Input() description!: string | TemplateRef<any>;
  /** TO REVIEW: Additional content that is revealed when the item is checked or selected. */
  @Input() reveal?: TemplateRef<any>;
  @Input() revealArialLabel?: string;
  /**
   * Sets the maximum width of the checkbox.
   * @default "none"
   */
  @Input() maxWidth?: string;

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
    const detail = { ...(e as CustomEvent<GoabCheckboxOnChangeDetail>).detail, event: e };
    this.onChange.emit(detail);
    this.markAsTouched();
    this.fcChange?.(detail.binding === "check" ? detail.checked : detail.value || "");
  }

  // Checkbox is a special case: it uses `checked` instead of `value`.
  override writeValue(value: string | number | boolean | null): void {
    this.value = value;
    this.checked = !!value;

    const el = this.goaComponentRef?.nativeElement as HTMLElement | undefined;
    if (el) {
      this.renderer.setAttribute(el, "checked", this.checked ? "true" : "false");
    }
  }
}
