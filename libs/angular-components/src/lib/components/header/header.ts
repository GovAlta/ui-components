import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-app-header",
  template: `
    <goa-app-header
      [attr.url]="url"
      [attr.heading]="heading"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.fullmenubreakpoint]="fullMenuBreakpoint"
      [attr.testid]="testId"
      [attr.hasmenuclickhandler]="onMenuClick.observed ? 'true' : 'false'"
      (_menuClick)="_onMenuClick()"
    >
      <ng-content />
    </goa-app-header>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppHeader {
  @Input() url?: string;
  @Input() heading?: string;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input() fullMenuBreakpoint?: number;

  @Output() onMenuClick = new EventEmitter();

  _onMenuClick() {
    this.onMenuClick.emit();
  }
}
