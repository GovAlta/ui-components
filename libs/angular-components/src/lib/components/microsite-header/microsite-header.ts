import { GoabLinkTarget, GoabServiceLevel } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-microsite-header",
  template: `
    <goa-microsite-header
      [attr.type]="type"
      [attr.version]="getVersionAsString()"
      [attr.feedbackurl]="feedbackUrl"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.feedbackurltarget]="feedbackUrlTarget"
      [attr.headerurltarget]="headerUrlTarget"
      [attr.data-testid]="testId"
    >
      <div slot="version">
        <ng-container [ngTemplateOutlet]="getVersionAsTemplate()"></ng-container>
      </div>
    </goa-microsite-header>
  `,
  imports: [NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabMicrositeHeader {
  @Input() type?: GoabServiceLevel;
  @Input() version!: string | TemplateRef<any>;
  @Input() feedbackUrl?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: GoabLinkTarget;
  @Input() headerUrlTarget?: GoabLinkTarget;

  getVersionAsString(): string {
    return typeof this.version === "string" ? this.version : "";
  }

  getVersionAsTemplate(): TemplateRef<any> | null {
    if (!this.version) return null;
    return this.version instanceof TemplateRef ? this.version : null;
  }
}
