import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-footer",
  template: `
    <goa-app-footer
      [attr.maxcontentwidth]="maxContentWidth"
    >
      <ng-content select="[slot=nav]" />
      <ng-content select="[slot=meta]" />
    </goa-app-footer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABAppFooter {
  @Input() maxContentWidth?: string;
}

