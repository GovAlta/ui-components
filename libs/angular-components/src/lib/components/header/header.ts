import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-header",
  template: `
    <goa-app-header
      [attr.url]="url"
      [attr.heading]="heading"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.fullmenubreakpoint]="fullMenuBreakpoint"
      [attr.data-testid]="testId"
    >
      <ng-content />
    </goa-app-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppHeader {
  @Input() url?: string;
  @Input() heading?: string;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input() fullMenuBreakpoint?: number;
}
