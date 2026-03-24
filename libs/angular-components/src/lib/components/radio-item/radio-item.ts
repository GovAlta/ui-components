import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    @if (isReady) {
      <goa-radio-item
        [attr.name]="name"
        [attr.value]="value"
        [attr.label]="label"
        [attr.description]="getDescriptionAsString()"
        [attr.arialabel]="ariaLabel"
        [attr.revealarialabel]="revealAriaLabel"
        [disabled]="disabled"
        [attr.maxwidth]="maxWidth"
        [attr.checked]="checked"
        [attr.error]="error"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content />
        <div slot="description">
          <ng-container [ngTemplateOutlet]="getDescriptionAsTemplate()"></ng-container>
        </div>
        <div slot="reveal">
          @if (this.reveal) {
            <ng-container [ngTemplateOutlet]="reveal"></ng-container>
          }
        </div>
      </goa-radio-item>
    }
  `,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabRadioItem extends GoabBaseComponent {
  /** The value of this radio option. Will be emitted when selected. */
  @Input() value?: string;
  /**
   * The display label for this radio option. Falls back to value if not provided.
   * @default ""
   */
  @Input() label?: string;
  /**
   * The name of the radio group. Inherited from the parent RadioGroup if not set.
   * @default ""
   */
  @Input() name?: string;
  @Input() description!: string | TemplateRef<any>;
  @Input() reveal?: TemplateRef<any>;
  /**
   * Defines how this option will be announced by screen readers.
   * @default ""
   */
  @Input() ariaLabel?: string;
  /**
   * Text announced by screen readers when the reveal slot content is displayed.
   * @default ""
   */
  @Input() revealAriaLabel?: string;
  /**
   * Disables this radio option. Also disabled if the parent RadioGroup is disabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /**
   * Sets this radio option as checked/selected.
   * @default false
   */
  @Input({ transform: booleanAttribute }) checked?: boolean;
  /**
   * Shows an error state on this radio option.
   * @default false
   */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /**
   * Sets the maximum width of this radio item.
   * @default "none"
   */
  @Input() maxWidth?: string;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  getDescriptionAsString(): string {
    return !this.description || this.description instanceof TemplateRef
      ? ""
      : this.description;
  }

  getDescriptionAsTemplate(): TemplateRef<any> | null {
    if (!this.description) return null;
    return this.description instanceof TemplateRef ? this.description : null;
  }
}
