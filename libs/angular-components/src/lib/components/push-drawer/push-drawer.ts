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

@Component({
  standalone: true,
  selector: "goab-push-drawer",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-push-drawer
        [open]="open"
        [attr.heading]="getHeadingAsString()"
        [attr.test-id]="testId"
        [attr.width]="width"
        (_close)="_onClose()"
      >
        <ng-content></ng-content>
        @if (getHeadingAsTemplate()) {
          <div slot="heading">
            <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
          </div>
        }
        @if (actions) {
          <div slot="actions">
            <ng-container [ngTemplateOutlet]="actions"></ng-container>
          </div>
        }
      </goa-push-drawer>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPushDrawer implements OnInit {
  @Input({ transform: booleanAttribute }) open?: boolean;
  /** TO REVIEW: Custom heading content rendered as a template. Use this when the heading requires rich content beyond plain text. */
  @Input() heading?: string | TemplateRef<any>;
  @Input() testId?: string;
  @Input() width?: string;
  /** TO REVIEW: Action buttons or elements displayed in the component's action area. */
  @Input() actions?: TemplateRef<any>;
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
    return this.heading instanceof TemplateRef ? "" : this.heading || "";
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }
}
