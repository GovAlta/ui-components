import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  EventEmitter,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
  inject,
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
/** Provide structure to help users find their way around the service. */
export class GoabAppHeader extends GoabBaseComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the URL to link from the alberta.ca logo. A full url is required. */
  @Input() url?: string;
  /** Sets the service name to display in the app header. */
  @Input() heading?: string;
  /** V2 only: Secondary text displayed under the service name. */
  @Input() secondaryText?: string;
  /** Maximum width of the content area. */
  @Input() maxContentWidth?: string;
  /** Sets the breakpoint in px for the full menu to display. */
  @Input({ transform: numberAttribute }) fullMenuBreakpoint?: number;

  isReady = false;
  version = "2";

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  /** Emits when the menu button is clicked. Used for custom menu handling. */
  @Output() onMenuClick = new EventEmitter();

  _onMenuClick() {
    this.onMenuClick.emit();
  }
}
