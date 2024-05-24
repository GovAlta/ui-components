import {
  GoABModalCalloutVariant,
  GoABModalTransition,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-modal",
  template: `
    <goa-modal
      [calloutvariant]="calloutVariant"
      [open]="open"
      [maxwidth]="maxWidth"
      [closable]="closable"
      [transition]="transition"
      (_close)="_onClose()"
    >
      <ng-content></ng-content>
    </goa-modal>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABModal {
  @Input() calloutVariant?: GoABModalCalloutVariant;
  @Input() open?: boolean;
  @Input() maxWidth?: string;
  @Input() closable = false;
  @Input() transition?: GoABModalTransition;
  @Input() testId?: string;
  @Input() role?: string;

  @Output() onClose = new EventEmitter();

  _onClose() {
    this.onClose.emit();
  }
}
