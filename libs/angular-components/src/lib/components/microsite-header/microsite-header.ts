import { ABGovLinkTarget, ABGovServiceLevel } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-microsite-header",
  template: `
    <goa-microsite-header
      [type]="type"
      [version]="version"
      [feedbackurl]="feedbackUrl"
      [maxcontentwidth]="maxContentWidth"
      [feedbackurltarget]="feedbackUrlTarget"
      [headerurltarget]="headerUrlTarget"
    >
    </goa-microsite-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovMicrositeHeader {
  @Input() type?: ABGovServiceLevel;
  @Input() version?: string;
  @Input() feedbackUrl?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: ABGovLinkTarget;
  @Input() headerUrlTarget?: ABGovLinkTarget;
}
