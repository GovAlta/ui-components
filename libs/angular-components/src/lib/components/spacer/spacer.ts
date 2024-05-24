import { GoABSpacerHorizontalSpacing, GoABSpacerVerticalSpacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spacer",
  template: `
    <goa-spacer
      [hspacing]="hSpacing"
      [vspacing]="vSpacing"
    >
    </goa-spacer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABSpacer {
  @Input() hSpacing?: GoABSpacerHorizontalSpacing;
  @Input() vSpacing?: GoABSpacerVerticalSpacing;
}

