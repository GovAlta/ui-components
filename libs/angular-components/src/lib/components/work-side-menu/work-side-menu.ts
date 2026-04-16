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
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
@Component({
  standalone: true,
  selector: "goab-work-side-menu", // eslint-disable-line
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
/** Side menu variant for worker applications. */
export class GoabWorkSideMenu implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** @required The application name displayed in the header. */
  @Input({ required: true }) heading!: string;
  /** @required URL for the header link. Clicking the logo/heading navigates to this URL. */
  @Input({ required: true }) url!: string;
  /** User's name displayed in the profile section. */
  @Input() userName?: string;
  /** Secondary text displayed below the user's name, such as role or email. */
  @Input() userSecondaryText?: string;
  /** Controls whether the side menu is expanded or collapsed. */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Template reference for the primary navigation slot content. */
  @Input() primaryContent!: TemplateRef<any>;
  /** Template reference for the secondary navigation slot content. */
  @Input() secondaryContent!: TemplateRef<any>;
  /** Template reference for the account slot content. */
  @Input() accountContent!: TemplateRef<any>;
  /** Emits when the side menu is toggled open or closed. */
  @Output() onToggle = new EventEmitter();
  /** Emits when a navigation link is clicked. Emits the URL as a string. */
  @Output() onNavigate = new EventEmitter<string>();

  isReady = false;

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
