import { GoABSkeletonSize, GoABSkeletonType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-skeleton",
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
export class GoABSkeleton {
  @Input({ required: true }) type!: GoABSkeletonType;
  @Input() maxWidth?: string;
  @Input() size?: GoABSkeletonSize;
  @Input() lineCount?: number;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}


