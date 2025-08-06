import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
} from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgTemplateOutlet, NgIf, CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-tooltip",
  template: `
    <goa-tooltip
      *ngIf="isReady"
      [attr.position]="position"
      [attr.content]="getContentAsString()"
      [attr.halign]="hAlign"
      [attr.testid]="testId"
      [attr.maxwidth]="maxWidth"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <div slot="content">
        <ng-container
          *ngIf="getContentAsTemplate()"
          [ngTemplateOutlet]="getContentAsTemplate()"
        ></ng-container>
        {{ getContentAsString() }}
      </div>
      <ng-content />
    </goa-tooltip>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet, NgIf, CommonModule],
})
export class GoabTooltip extends GoabBaseComponent implements OnInit {
  isReady = false;
  @Input() position?: GoabTooltipPosition;
  @Input() content?: string | TemplateRef<unknown>;
  @Input() hAlign?: GoabTooltipHorizontalAlignment;
  @Input() maxWidth?: string;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  getContentAsString(): string {
    return this.content instanceof TemplateRef ? "" : this.content || "";
  }

  getContentAsTemplate(): TemplateRef<unknown> | null {
    if (!this.content) return null;
    return this.content instanceof TemplateRef ? this.content : null;
  }
}