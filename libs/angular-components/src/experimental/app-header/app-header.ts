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
  selector: "goabx-app-header",
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
export class GoabxAppHeader extends GoabBaseComponent implements OnInit {
  /**
   * Set the URL to link from the alberta.ca logo. A full url is required.
   * @default ""
   */
  @Input() url?: string;
  /**
   * Set the service name to display in the app header.
   * @default ""
   */
  @Input() heading?: string;
  /**
   * V2 only: Secondary text displayed under the service name.
   * @default ""
   */
  @Input() secondaryText?: string;
  /**
   * Maximum width of the content area.
   * @default ""
   */
  @Input() maxContentWidth?: string;
  /** Sets the breakpoint in px for the full menu to display. */
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
