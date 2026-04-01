import {
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-tooltip",
  template: `
    @if (isReady) {
      <goa-tooltip
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
          @if (getContentAsTemplate()) {
            <ng-container [ngTemplateOutlet]="getContentAsTemplate()"></ng-container>
          }
          {{ getContentAsString() }}
        </div>
        <ng-content />
      </goa-tooltip>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
})
/** A small popover that displays more information about an item. */
export class GoabTooltip extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Position with respect to the child element. @default "top" */
  @Input() position?: GoabTooltipPosition;
  /** The content of the tooltip. */
  @Input() content?: string | TemplateRef<unknown>;
  /** Horizontal alignment to the child element. @default "center" */
  @Input() hAlign?: GoabTooltipHorizontalAlignment;
  /** Sets the maximum width of the tooltip. Must use 'px' unit. */
  @Input() maxWidth?: string;

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
