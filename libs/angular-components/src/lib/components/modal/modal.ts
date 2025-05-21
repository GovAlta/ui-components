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
} from "@angular/core";
import { NgIf, NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-modal",
  imports: [NgIf, NgTemplateOutlet],
  template: `
    <goa-modal
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
export class GoabModal {
  @Input() calloutVariant?: GoabModalCalloutVariant;
  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() maxWidth?: string;
  @Input() closable = false;
  @Input() transition?: GoabModalTransition;
  @Input() testId?: string;
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
