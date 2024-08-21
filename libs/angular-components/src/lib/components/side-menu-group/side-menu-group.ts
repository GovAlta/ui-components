import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-side-menu-group",
  template: `
    <goa-side-menu-group [attr.heading]="heading" [attr.data-testid]="testId">
      <ng-content />
    </goa-side-menu-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSideMenuGroup {
  @Input({ required: true }) heading!: string;
  @Input() testId?: string;
}
