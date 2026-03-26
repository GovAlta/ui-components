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
export class GoabPushDrawer implements OnInit {
  version = "2";

  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() heading!: string | TemplateRef<any>;
  @Input() width?: string;
  @Input() testId?: string;
  @Input() actions!: TemplateRef<any>;
  @Output() onClose = new EventEmitter();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

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
