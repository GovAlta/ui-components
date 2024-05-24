import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-radio-item",
  template: `
    <goa-radio-item
      [value]="value"
      [label]="label"
      [disabled]="disabled"
      [checked]="checked"
      [error]="error"
      [testid]="testId"
    >
      <ng-content />
      <ng-content selector="[slot=description]" />
    </goa-radio-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoABRadioItem {
  @Input() value?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() checked?: boolean;
  @Input() error?: boolean;
  @Input() testId?: string;
}
