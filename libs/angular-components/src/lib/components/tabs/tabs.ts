import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-tabs",
  template: `
    <goa-tabs
      [initialtab]="initialTab"
    >
      <ng-content />
    </goa-tabs>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABTabs {
  @Input() initialTab?: number;
}

