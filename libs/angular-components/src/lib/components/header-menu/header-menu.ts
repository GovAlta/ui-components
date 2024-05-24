import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-header-menu",
  template: `
    <goa-app-header-menu
      [leadingicon]="leadingIcon"
      [heading]="heading"
    >
      <ng-content />
    </goa-app-header-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovAppHeaderMenu {
  @Input() leadingIcon?: string;
  @Input() heading?: string;
}
