import {
  GoabModalCalloutVariant,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-modal",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-modal
        [attr.version]="version"
        [attr.calloutvariant]="calloutVariant"
        [attr.open]="open"
        [attr.maxwidth]="maxWidth"
        [attr.testid]="testId"
        [attr.role]="role"
        [attr.closable]="closable"
        [attr.transition]="transition"
        [attr.heading]="getHeadingAsString()"
        (_close)="_onClose()"
      >
        <div slot="heading">
          @if (this.heading !== "" && getHeadingAsTemplate() !== null) {
            <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
          }
        </div>

        <ng-content></ng-content>

        <div slot="actions">
          @if (this.actions) {
            <ng-container [ngTemplateOutlet]="actions"></ng-container>
          }
        </div>
      </goa-modal>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** An overlay that appears in front of all other content, and requires a user to take an action before continuing. */
export class GoabModal implements OnInit {
  private cdr = inject(ChangeDetectorRef);

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

  /** Define the context and colour of the callout modal. It is required when type is set to callout. */
  @Input() calloutVariant?: GoabModalCalloutVariant;
  /** Controls if modal is visible or not. */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /** Set the max allowed width of the modal. */
  @Input() maxWidth?: string;
  /** Show close icon and allow clicking the background to close the modal. */
  @Input() closable = false;
  /** Sets the animation transition when opening/closing. 'fast' or 'slow' for animated, 'none' for instant. */
  @Input() transition?: GoabModalTransition;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /**
   * @deprecated The role property is deprecated and will be removed in a future version.
   * The modal will always use role="dialog".
   */
  @Input() role?: string;
  /** The heading text displayed at the top of the modal. */
  @Input() heading!: string | TemplateRef<any>;
  /** Sets the template reference for the modal action buttons. */
  @Input() actions!: TemplateRef<any>;

  /** Emits when the modal is closed. */
  @Output() onClose = new EventEmitter<void>();

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }

  _onClose() {
    this.onClose.emit();
  }
}
