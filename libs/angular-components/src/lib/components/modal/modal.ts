import {
  GoabModalCalloutVariant,
  GoabModalTransition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  booleanAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet, CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-modal",
  imports: [NgTemplateOutlet, CommonModule],
  template: `
    <goa-modal
      *ngIf="isReady"
      [attr.calloutvariant]="calloutVariant"
      [attr.open]="open"
      [attr.maxwidth]="maxWidth"
      [attr.testid]="testId"
      [attr.role]="role"
      [attr.closable]="closable"
      [attr.transition]="transition"
      [attr.heading]="getHeadingAsString()"
      (_close)="_onClose()"
      >
      <div slot="heading">
        <ng-container *ngIf="this.heading !== '' && getHeadingAsTemplate() !== null" [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
      </div>

      <ng-content></ng-content>

      <div slot="actions">
        <ng-container *ngIf="this.actions" [ngTemplateOutlet]="actions"></ng-container>
      </div>
    </goa-modal>
    `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabModal implements OnInit {
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

  @Input() calloutVariant?: GoabModalCalloutVariant;
  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() maxWidth?: string;
  @Input() closable = false;
  @Input() transition?: GoabModalTransition;
  @Input() testId?: string;
  /**
   * @deprecated The role property is deprecated and will be removed in a future version.
   * The modal will always use role="dialog".
   */
  @Input() role?: string;
  @Input() heading!: string | TemplateRef<any>;
  @Input() actions!: TemplateRef<any>;

  @Output() onClose = new EventEmitter();

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }

  _onClose() {
    this.onClose.emit();
  }
}
