import { GoabPageBlockSize } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-page-block",
  template: `
    <goa-page-block
      [attr.width]="width"
      [attr.testid]="testId"
    >
      <ng-content></ng-content>
    </goa-page-block>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPageBlock {
  @Input() width?: GoabPageBlockSize;
  @Input() testId?: string;
}
