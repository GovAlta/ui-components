import { GoabCalendarOnChangeDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-calendar",
  template: `
    <goa-calendar
      [attr.name]="name"
      [value]="value"
      [attr.min]="min"
      [attr.max]="max"
      [attr.data-testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
      (_change)="_onChange($event)"
    >
      <ng-content />
    </goa-calendar>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCalendar {
  @Input() name?: string;
  @Input() value?: Date;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

  @Output() onChange = new EventEmitter<GoabCalendarOnChangeDetail>();

  _onChange(e: Event) {
    const details = (e as CustomEvent<GoabCalendarOnChangeDetail>).detail;
    this.onChange.emit(details)
  }
}
