import { GoABLinkTarget, GoABServiceLevel } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-microsite-header",
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
export class GoABMicrositeHeader {
  @Input() type?: GoABServiceLevel;
  @Input() version?: string;
  @Input() feedbackUrl?: string;
  @Input() maxContentWidth?: string;
  @Input() feedbackUrlTarget?: GoABLinkTarget;
  @Input() headerUrlTarget?: GoABLinkTarget;
}
