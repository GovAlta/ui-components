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
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-push-drawer",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-push-drawer
      [open]="open"
      [attr.heading]="getHeadingAsString()"
      [attr.testid]="testId"
      [attr.width]="width"
      [attr.version]="version"
      (_close)="_onClose()"
    >
      <ng-content></ng-content>
      <div slot="heading">
        <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
      </div>
      @if (actions) {
        <div slot="actions">
          <ng-container [ngTemplateOutlet]="actions"></ng-container>
        </div>
      }
    </goa-push-drawer>
  } `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A panel that pushes the main page content aside on desktop, falling back to an overlay drawer on smaller screens. */
export class GoabPushDrawer implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  version = "2";

  /** Sets the open state of the push drawer. */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /** Sets the heading text or template for the push drawer. */
  @Input() heading!: string | TemplateRef<any>;
  /** Sets the width of the push drawer panel. */
  @Input() width?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Sets the template reference for the actions slot content. */
  @Input() actions!: TemplateRef<any>;
  /** Emits when the push drawer closes. */
  @Output() onClose = new EventEmitter<void>();

  isReady = false;

  ngOnInit(): void {
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
