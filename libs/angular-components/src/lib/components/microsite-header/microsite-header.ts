import { GoABLinkTarget, GoABServiceLevel } from "@abgov/ui-components-common";
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
export class GoABMicrositeHeader {
  @Input() type?: GoABServiceLevel;
  @Input() version?: string;
  @Input() feedbackUrl?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: GoABLinkTarget;
  @Input() headerUrlTarget?: GoABLinkTarget;
}
