import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card-actions",
  template: `
    <goa-card-actions>
      <ng-content />
    </goa-card-actions>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCardActions {
}
