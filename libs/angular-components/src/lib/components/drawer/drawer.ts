import { NgTemplateOutlet } from "@angular/common";
import {
  booleanAttribute,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-drawer",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-drawer
        [open]="open"
        [attr.position]="position"
        [attr.heading]="getHeadingAsString()"
        [attr.maxsize]="maxSize"
        [attr.testid]="testId"
        (_close)="_onClose()"
      >
        <ng-content></ng-content>
        <div slot="heading">
          <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
        </div>
        <div slot="actions">
          <ng-container [ngTemplateOutlet]="actions"></ng-container>
        </div>
      </goa-drawer>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDrawer implements OnInit {
  /** Whether the drawer is open. */
  @Input({ required: true, transform: booleanAttribute }) open!: boolean;
  /** The position of the drawer. */
  @Input({ required: true }) position!: GoabDrawerPosition;
  /**
   * The heading text displayed at the top of the drawer.
   * @default ""
   */
  @Input() heading!: string | TemplateRef<any>;
  /** Sets max height on bottom position, sets width on left and right position. */
  @Input() maxSize?: GoabDrawerSize;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default "drawer"
   */
  @Input() testId?: string;
  @Input() actions!: TemplateRef<any>;
  @Output() onClose = new EventEmitter();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onClose() {
    this.onClose.emit();
  }

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }
}
