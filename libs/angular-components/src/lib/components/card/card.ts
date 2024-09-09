import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card",
  template: `
    <goa-card
      [elevation]="elevation"
      [width]="width"
      [testid]="testId"
    >
      <ng-content />
    </goa-card>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCard {
  @Input() elevation?: number;
  @Input() width?: string;
  @Input() testId?: string;
}
