import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-header",
  template: `
    <goa-app-header
      [url]="url"
      [heading]="heading"
      [maxcontentwidth]="maxContentWidth"
      [testid]="testId"
    >
      <ng-content />
    </goa-app-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovAppHeader {
  @Input() url?: string;
  @Input() heading?: string;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
}

