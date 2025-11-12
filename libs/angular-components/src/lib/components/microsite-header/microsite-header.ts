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
import { NgTemplateOutlet, CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-microsite-header",
  template: `
    <goa-microsite-header
      *ngIf="isReady"
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
  `,
  imports: [NgTemplateOutlet, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabMicrositeHeader implements OnInit {
  isReady = false;
  @Input({ required: true }) type!: GoabServiceLevel;
  @Input() version!: string | TemplateRef<any>;
  @Input() feedbackUrl?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: GoabLinkTarget;
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
