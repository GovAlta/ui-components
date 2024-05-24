import { ABGovSkeletonSize, ABGovSkeletonType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-skeleton",
  template: `
    <goa-skeleton
      [maxwidth]="maxWidth"
      [size]="size"
      [linecount]="lineCount"
      [type]="type"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
    </goa-skeleton>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovSkeleton {
  @Input({ required: true }) type!: ABGovSkeletonType;
  @Input() maxWidth?: string;
  @Input() size?: ABGovSkeletonSize;
  @Input() lineCount?: number;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}


