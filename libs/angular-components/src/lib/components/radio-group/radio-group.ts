import { GoABRadioGroupOnChangeDetail, GoABRadioGroupOrientation, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-radio-group",
  template: `
    <goa-radio-group
      [name]="name"
      [value]="value"
      [disabled]="disabled"
      [orientation]="orientation"
      [error]="error"
      [arialabel]="ariaLabel"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"

      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-radio-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABRadioGroup {
  @Input({ required: true }) name!: string;
  @Input() value?: string;
  @Input() disabled?: boolean;
  @Input() orientation?: GoABRadioGroupOrientation;
  @Input() error?: boolean;
  @Input() ariaLabel?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABRadioGroupOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoABRadioGroupOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}
