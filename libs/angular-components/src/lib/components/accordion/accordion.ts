import {
  GoabAccordionHeadingSize,
  GoabAccordionIconPosition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-accordion",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-accordion
        [attr.heading]="heading"
        [attr.secondarytext]="secondaryText"
        [attr.open]="open"
        [attr.headingsize]="headingSize"
        [attr.maxwidth]="maxWidth"
        [attr.testid]="testId"
        [attr.iconposition]="iconPosition"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_change)="_onChange($event)"
      >
        <div slot="headingcontent">
          <ng-container [ngTemplateOutlet]="headingContent"></ng-container>
        </div>
        <ng-content></ng-content>
      </goa-accordion>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAccordion extends GoabBaseComponent implements OnInit {
  /**
   * Sets the heading text.
   * @required
   * @default ""
   */
  @Input() heading?: string;
  /**
   * Sets secondary text.
   * @default ""
   */
  @Input() secondaryText?: string;
  /**
   * Sets the state of the accordion container open or closed.
   * @default false
   */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /**
   * Sets the heading size of the accordion container heading.
   * @default "small"
   */
  @Input() headingSize?: GoabAccordionHeadingSize;
  @Input() headingContent!: TemplateRef<any>;
  /**
   * Sets the maximum width of the accordion.
   * @default "none"
   */
  @Input() maxWidth?: string;
  /**
   * Sets the position of the expand/collapse icon.
   * @default "left"
   */
  @Input() iconPosition?: GoabAccordionIconPosition;

  @Output() onChange = new EventEmitter<boolean>();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onChange(e: Event) {
    const detail = (e as CustomEvent).detail;
    this.onChange.emit(detail.open as boolean);
  }
}
