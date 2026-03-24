import { GoabSkeletonSize, GoabSkeletonType, Spacing } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-skeleton",
  template: `
    @if (isReady) {
      <goa-skeleton
        [attr.maxwidth]="maxWidth"
        [attr.size]="size"
        [attr.linecount]="lineCount"
        [attr.type]="type"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
      </goa-skeleton>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSkeleton extends GoabBaseComponent implements OnInit {
  isReady = false;
  @Input({ required: true }) type!: GoabSkeletonType;
  /**
   * Sets the maximum width. Currently only used in card skeleton type.
   * @default "300px"
   */
  @Input() maxWidth = "300px";
  /**
   * Size can affect either the height, width or both for different skeleton types.
   * @default "1"
   */
  @Input() size?: GoabSkeletonSize;
  /**
   * Used within components that contain multiple lines. Currently only used in card skeleton type
   * @default 3
   */
  @Input({ transform: numberAttribute }) lineCount?: number;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
