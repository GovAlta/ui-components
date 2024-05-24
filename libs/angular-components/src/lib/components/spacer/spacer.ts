import { ABGovSpacerHorizontalSpacing, ABGovSpacerVerticalSpacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-spacer",
  template: `
    <goa-spacer
      [hspacing]="hSpacing"
      [vspacing]="vSpacing"
    >
    </goa-spacer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovSpacer {
  @Input() hSpacing?: ABGovSpacerHorizontalSpacing;
  @Input() vSpacing?: ABGovSpacerVerticalSpacing;
}

