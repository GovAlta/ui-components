import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  booleanAttribute,
} from "@angular/core";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-details",
  template: `
    <goa-details
      [attr.heading]="heading"
      [attr.testid]="testId"
      [attr.open]="open"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-details>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDetails extends GoabBaseComponent {
  @Input({ required: true }) heading!: string;
  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() maxWidth?: string;
}
