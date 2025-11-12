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
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-app-header",
  template: `
    <goa-app-header
      *ngIf="isReady"
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
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabAppHeader implements OnInit {
  isReady = false;
  @Input() url?: string;
  @Input() heading?: string;
  @Input() maxContentWidth?: string;
  @Input() testId?: string;
  @Input({ transform: numberAttribute }) fullMenuBreakpoint?: number;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  @Output() onMenuClick = new EventEmitter();

  _onMenuClick() {
    this.onMenuClick.emit();
  }
}
