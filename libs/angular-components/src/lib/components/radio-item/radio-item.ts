import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    @if (isReady) {
      <goa-radio-item
        [attr.version]="version"
        [attr.name]="name"
        [attr.value]="value"
        [attr.label]="label"
        [attr.description]="getDescriptionAsString()"
        [attr.arialabel]="ariaLabel"
        [attr.revealarialabel]="revealAriaLabel"
        [disabled]="disabled"
        [attr.compact]="compact"
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
/** Individual radio option within a group. */
export class GoabRadioItem extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** The value of this radio option. Will be emitted when selected. */
  @Input() value?: string;
  /** The display label for this radio option. Falls back to value if not provided. */
  @Input() label?: string;
  /** The name of the radio group. Inherited from the parent RadioGroup if not set. */
  @Input() name?: string;
  /** Additional description text displayed below the label. */
  @Input() description!: string | TemplateRef<any>;
  /** Sets the template reference for the reveal slot content. */
  @Input() reveal?: TemplateRef<any>;
  /** Defines how this option will be announced by screen readers. */
  @Input() ariaLabel?: string;
  /** Text announced by screen readers when the reveal slot content is displayed. */
  @Input() revealAriaLabel?: string;
  /** Disables this radio option. Also disabled if the parent RadioGroup is disabled. */
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  /** @internal Sets this radio option as checked/selected. */
  @Input({ transform: booleanAttribute }) checked?: boolean;
  /** Shows an error state on this radio option. */
  @Input({ transform: booleanAttribute }) error?: boolean;
  /** Sets the maximum width of this radio item. */
  @Input() maxWidth?: string;
  /** Enables compact layout for the radio item, reducing spacing for dense layouts. */
  @Input({ transform: booleanAttribute }) compact?: boolean;

  isReady = false;
  version = "2";

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
