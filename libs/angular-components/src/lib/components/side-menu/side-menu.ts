import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-side-menu",
  template: `
    <goa-side-menu [attr.data-testid]="testId">
      <ng-content />
    </goa-side-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabSideMenu {
  @Input() testId?: string;
}
