import { GoabSkeletonSize, GoabSkeletonType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-skeleton",
  template: `
    <goa-skeleton
      [attr.maxwidth]="maxWidth"
      [attr.size]="size"
      [attr.linecount]="lineCount"
      [attr.type]="type"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
    </goa-skeleton>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabSkeleton {
  @Input({ required: true }) type!: GoabSkeletonType;
  @Input() maxWidth= "300px";
  @Input() size?: GoabSkeletonSize;
  @Input() lineCount?: number;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}


