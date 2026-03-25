import { GoabPopoverPosition } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-popover",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-popover
        [attr.maxwidth]="maxWidth"
        [attr.minwidth]="minWidth"
        [attr.padded]="padded"
        [attr.position]="position"
        [attr.relative]="relative"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
      >
        <ng-content></ng-content>
        <div slot="target">
          <ng-container [ngTemplateOutlet]="target"></ng-container>
        </div>
      </goa-popover>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPopover extends GoabBaseComponent implements OnInit {
  isReady = false;
  /**
   * Sets the maximum width of the popover container.
   * @default "320px"
   */
  @Input() maxWidth = "320px";
  /**
   * Sets the minimum width of the popover container.
   * @default ""
   */
  @Input() minWidth?: string;
  /**
   * Sets if the popover has padding. Use false when content needs to be flush with boundaries.
   * @default true
   */
  @Input() padded = true;
  /**
   * Provides control to where the popover content is positioned.
   * @default "auto"
   */
  @Input() position?: GoabPopoverPosition;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  @Input() relative?: boolean;
  /**
   * The popover trigger/target element.
   * @required
   */
  @Input({ required: true }) target!: TemplateRef<any>;

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
