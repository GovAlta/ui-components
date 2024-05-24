import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-side-menu-group",
  template: `
    <goa-side-menu-group
      [heading]="heading"
    >
      <ng-content />
    </goa-side-menu-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovSideMenuGroup {
  @Input({ required: true }) heading!: string;
}
