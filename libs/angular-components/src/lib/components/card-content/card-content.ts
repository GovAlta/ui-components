import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card-content",
  template: `
    <goa-card-content>
      <ng-content />
    </goa-card-content>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCardContent {
}
