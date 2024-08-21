import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-column-layout",
  template: `
    <goa-one-column-layout>
      <ng-content />
    </goa-one-column-layout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabColumnLayout {
  /** no props **/
}
