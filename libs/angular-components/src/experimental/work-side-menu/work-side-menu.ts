import {
  booleanAttribute,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule, NgTemplateOutlet } from "@angular/common";
@Component({
  standalone: true,
  selector: "goabx-work-side-menu", // eslint-disable-line
  imports: [NgTemplateOutlet, CommonModule],
  template: `
    <goa-work-side-menu
      *ngIf="isReady"
      [open]="open ?? false"
      [attr.heading]="heading"
      [attr.url]="url"
      [attr.user-name]="userName"
      [attr.user-secondary-text]="userSecondaryText"
      [attr.testid]="testId"
      (_toggle)="_onToggle()"
    >
      <div slot="primary">
        <ng-container [ngTemplateOutlet]="primaryContent"></ng-container>
      </div>
      <div slot="secondary">
        <ng-container [ngTemplateOutlet]="secondaryContent"></ng-container>
      </div>
      <div slot="account">
        <ng-container [ngTemplateOutlet]="accountContent"></ng-container>
      </div>
    </goa-work-side-menu>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxWorkSideMenu implements OnInit {
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) url!: string;
  @Input() userName?: string;
  @Input() userSecondaryText?: string;
  @Input({ transform: booleanAttribute }) open?: boolean;
  @Input() testId?: string;
  @Input() primaryContent!: TemplateRef<any>;
  @Input() secondaryContent!: TemplateRef<any>;
  @Input() accountContent!: TemplateRef<any>;
  @Output() onToggle = new EventEmitter();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onToggle() {
    this.onToggle.emit();
  }
}
