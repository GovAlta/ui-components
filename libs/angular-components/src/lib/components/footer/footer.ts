import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer",
  template: `
    <goa-app-footer
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.url]="url"
      [attr.testid]="testId"
    >
      <ng-content select="[slot=nav]" />
      <ng-content select="goab-app-footer-meta-section"></ng-content>
      <ng-content></ng-content>
    </goa-app-footer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppFooter {
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input() url?: string;
}
