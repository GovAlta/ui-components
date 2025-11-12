import { GoabSkeletonSize, GoabSkeletonType, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, numberAttribute, OnInit, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-skeleton",
  template: `
    <goa-skeleton
      *ngIf="isReady"
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
  `,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSkeleton extends GoabBaseComponent implements OnInit {
  isReady = false;
  @Input({ required: true }) type!: GoabSkeletonType;
  @Input() maxWidth = "300px";
  @Input() size?: GoabSkeletonSize;
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
