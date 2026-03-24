import { GoabLinkTarget, GoabServiceLevel } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-microsite-header",
  template: `
    @if (isReady) {
      <goa-microsite-header
        [attr.type]="type"
        [attr.version]="getVersionAsString()"
        [attr.feedbackurl]="feedbackUrl"
        [attr.maxcontentwidth]="maxContentWidth"
        [attr.feedbackurltarget]="feedbackUrlTarget"
        [attr.headerurltarget]="headerUrlTarget"
        [attr.testid]="testId"
        [attr.hasfeedbackhandler]="onFeedbackClick.observed"
        (_feedbackClick)="_onFeedbackClick()"
      >
        <div slot="version">
          <ng-container [ngTemplateOutlet]="getVersionAsTemplate()"></ng-container>
        </div>
      </goa-microsite-header>
    }
  `,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabMicrositeHeader implements OnInit {
  isReady = false;
  /** The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. */
  @Input({ required: true }) type!: GoabServiceLevel;
  /**
   * App or service version displayed on the right side of the header.
   * @default ""
   */
  @Input() version!: string | TemplateRef<any>;
  /**
   * Url to feedback page that will be displayed when provided.
   * @default ""
   */
  @Input() feedbackUrl?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
  /**
   * Maximum width of the content area
   * @default "100%"
   */
  @Input() maxContentWidth?: string;
  /**
   * For internal feedback urls sets target=
   * @default "blank"
   */
  @Input() feedbackUrlTarget?: GoabLinkTarget;
  /**
   * Sets the target attribute for the header link.
   * @default "blank"
   */
  @Input() headerUrlTarget?: GoabLinkTarget;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onFeedbackClick = new EventEmitter();

  getVersionAsString(): string {
    return typeof this.version === "string" ? this.version : "";
  }

  getVersionAsTemplate(): TemplateRef<any> | null {
    if (!this.version) return null;
    return this.version instanceof TemplateRef ? this.version : null;
  }

  _onFeedbackClick() {
    this.onFeedbackClick.emit();
  }
}
