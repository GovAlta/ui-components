import { GoABCalendarOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-calendar",
  template: `
    <goa-calendar
      [name]="name"
      [value]="value"
      [min]="min"
      [max]="max"
      [testid]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-calendar>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABCalendar {
  @Input() name?: string;
  @Input() value?: Date;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoABCalendarOnChangeDetail>();

  _onChange(e: Event) {
    const details = (e as CustomEvent<GoABCalendarOnChangeDetail>).detail;
    this.onChange.emit(details)
  }
}
