import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-hero-banner",
  template: `
    <goa-hero-banner
      [attr.heading]="heading"
      [attr.backgroundurl]="backgroundUrl"
      [attr.minheight]="minHeight"
      [attr.data-testid]="testId"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.backgroundColor]="backgroundColor"
      [attr.textcolor]="textColor"
    >
      <ng-content />
    </goa-hero-banner>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABHeroBanner {
  @Input() heading?: string;
  @Input() backgroundUrl?: string;
  @Input() minHeight?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
}
