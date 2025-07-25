import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-checkbox-list-item",
  template: `
    <goa-checkbox-list-item
      [attr.value]="value"
      [attr.text]="text"
      [attr.disabled]="disabled ? 'true' : 'false'"
      [attr.testid]="testId"
      [attr.arialabel]="ariaLabel"
    >
      <ng-content />
    </goa-checkbox-list-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabCheckboxListItem {
  @Input() value?: string;
  @Input() text?: string;
  @Input() disabled?: boolean;
  @Input() testId?: string;
  @Input() ariaLabel?: string;
}