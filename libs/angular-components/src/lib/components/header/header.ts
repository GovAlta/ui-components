import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-app-header",
  template: `@if (isReady) {
    <goa-app-header
      [attr.url]="url"
      [attr.heading]="heading"
      [attr.secondarytext]="secondaryText"
      [attr.maxcontentwidth]="maxContentWidth"
      [attr.fullmenubreakpoint]="fullMenuBreakpoint"
      [attr.testid]="testId"
      [attr.hasmenuclickhandler]="onMenuClick.observed ? 'true' : 'false'"
      [attr.version]="version"
      (_menuClick)="_onMenuClick()"
    >
      <ng-content />
    </goa-app-header>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppHeader extends GoabBaseComponent implements OnInit {
  @Input() url?: string;
  @Input() heading?: string;
  @Input() secondaryText?: string;
  @Input() maxContentWidth?: string;
  @Input({ transform: numberAttribute }) fullMenuBreakpoint?: number;

  isReady = false;
  version = "2";

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  @Output() onMenuClick = new EventEmitter();

  _onMenuClick() {
    this.onMenuClick.emit();
  }
}
