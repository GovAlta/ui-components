import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-tab",
  template: `
    <goa-tab
      [heading]="heading"
    >
      <ng-content select="[slot=heading]" />
      <ng-content />
    </goa-tab>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABTab {
  @Input() heading?: string;
}
