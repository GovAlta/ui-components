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
import { NgTemplateOutlet } from "@angular/common";
@Component({
  standalone: true,
  selector: "goabx-work-side-menu", // eslint-disable-line
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-work-side-menu
        [open]="open ?? false"
        [attr.heading]="heading"
        [attr.url]="url"
        [attr.user-name]="userName"
        [attr.user-secondary-text]="userSecondaryText"
        [attr.testid]="testId"
        (_toggle)="_onToggle()"
        (_navigate)="_onNavigate($event)"
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
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxWorkSideMenu implements OnInit {
  /** The application name displayed in the header. */
  @Input({ required: true }) heading!: string;
  /** URL for the header link. Clicking the logo/heading navigates to this URL. */
  @Input({ required: true }) url!: string;
  /**
   * User's name displayed in the profile section.
   * @default ""
   */
  @Input() userName?: string;
  /**
   * Secondary text displayed below the user's name, such as role or email.
   * @default ""
   */
  @Input() userSecondaryText?: string;
  /**
   * Controls whether the side menu is expanded or collapsed.
   * @default false
   */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;
  /** TO REVIEW: Content rendered in the primary navigation slot of the side menu. */
  @Input() primaryContent!: TemplateRef<any>;
  /** TO REVIEW: Content rendered in the secondary section slot of the side menu. */
  @Input() secondaryContent!: TemplateRef<any>;
  /** TO REVIEW: Content rendered in the account section slot of the side menu. */
  @Input() accountContent!: TemplateRef<any>;
  @Output() onToggle = new EventEmitter();
  @Output() onNavigate = new EventEmitter<string>();

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

  _onNavigate(e: Event) {
    this.onNavigate.emit((e as CustomEvent).detail.url);
  }
}
