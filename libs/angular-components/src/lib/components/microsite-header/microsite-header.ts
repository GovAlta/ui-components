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
  inject,
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
/** Communicate what stage the service is at, connect to Alberta.ca, and gather feedback on your service. */
export class GoabMicrositeHeader implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** @required The service type which determines the badge style. "live" shows official government site text, "alpha" and "beta" show development stage badges. */
  @Input({ required: true }) type!: GoabServiceLevel;
  /** @required App or service version displayed on the right side of the header. */
  @Input() version!: string | TemplateRef<any>;
  /** Url to feedback page that will be displayed when provided. */
  @Input() feedbackUrl?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Maximum width of the content area. */
  @Input() maxContentWidth?: string;
  /** For internal feedback urls sets target. */
  @Input() feedbackUrlTarget?: GoabLinkTarget;
  /** Sets the target attribute for the header link. */
  @Input() headerUrlTarget?: GoabLinkTarget;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  /** Emits when the feedback link is clicked. */
  @Output() onFeedbackClick = new EventEmitter<void>();

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
