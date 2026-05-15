import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
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
  selector: "goab-container",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-container
      [attr.type]="type"
      [attr.accent]="accent"
      [attr.padding]="padding"
      [attr.width]="width"
      [attr.maxwidth]="maxWidth"
      [attr.minheight]="minHeight"
      [attr.maxheight]="maxHeight"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      @if (title) {
        <div slot="title">
          <ng-container [ngTemplateOutlet]="title"></ng-container>
        </div>
      }
      <ng-content />
      @if (actions) {
        <div slot="actions">
          <ng-container [ngTemplateOutlet]="actions"></ng-container>
        </div>
      }
    </goa-container>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Group information, create hierarchy, and show related information. */
export class GoabContainer extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the container and accent bar styling. @default "interactive" */
  @Input() type?: GoabContainerType = "interactive";
  /** Sets the style of accent on the container. @default "filled" */
  @Input() accent?: GoabContainerAccent = "filled";
  /** Sets the amount of white space in the container. @default "relaxed" */
  @Input() padding?: GoabContainerPadding = "relaxed";
  /** Sets the width of the container. @default "full" */
  @Input() width?: GoabContainerWidth = "full";
  /** Sets the maximum width of the container. */
  @Input() maxWidth?: string;
  /** Sets the minimum height of the container. */
  @Input() minHeight?: string;
  /** Sets the maximum height of the container. */
  @Input() maxHeight?: string;
  /** Sets the template for the title slot content. */
  @Input() title!: TemplateRef<any>;
  /** Sets the template for the actions slot content. */
  @Input() actions!: TemplateRef<any>;

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
