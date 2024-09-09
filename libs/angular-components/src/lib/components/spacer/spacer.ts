import { GoabSpacerHorizontalSpacing, GoabSpacerVerticalSpacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spacer",
  template: `
    <goa-spacer
      [attr.hspacing]="hSpacing"
      [attr.vspacing]="vSpacing"
      [attr.data-testid]="testId"
    >
    </goa-spacer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSpacer {
  @Input() hSpacing?: GoabSpacerHorizontalSpacing;
  @Input() vSpacing?: GoabSpacerVerticalSpacing;
  @Input() testId?: string;
}
