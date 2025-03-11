import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-work-side-menu",
  template: `
    <goa-work-side-menu
      [attr.title]="title"
      [attr.url]="url"
      [attr.username]="userName"
      [attr.useremail]="userEmail"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-work-side-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkSideMenu {
  @Input() title?: string;
  @Input() url?: string;
  @Input() userName?: string;
  @Input() userEmail?: string;
  @Input() testId?: string;
}
