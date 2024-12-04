import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter } from "@angular/core";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-tabs",
  template: `
    <goa-tabs
      [attr.initialtab]="initialTab"
      [attr.testid]="testId"
      (_change)="_onChange($event)"

    >
      <ng-content />
    </goa-tabs>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabTabs {
  @Input() initialTab?: number;
  @Input() testId?: string;

  @Output() onChange = new EventEmitter<GoabTabsOnChangeDetail>();

  _onChange(e: Event) {
    const detail = (e as CustomEvent<GoabTabsOnChangeDetail>).detail;
    this.onChange.emit(detail);
  }
}

