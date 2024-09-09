import { GoabLinkTarget, GoabServiceLevel } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-microsite-header",
  template: `
    <goa-microsite-header
      [attr.type]="type"
      [attr.version]="version"
      [attr.feedbackurl]="feedbackUrl"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.feedbackurltarget]="feedbackUrlTarget"
      [attr.headerurltarget]="headerUrlTarget"
      [attr.data-testid]="testId"
    >
    </goa-microsite-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabMicrositeHeader {
  @Input() type?: GoabServiceLevel;
  @Input() version?: string;
  @Input() feedbackUrl?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: GoabLinkTarget;
  @Input() headerUrlTarget?: GoabLinkTarget;
}
