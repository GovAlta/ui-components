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
export class GoabWorkSideMenu implements OnInit {
  private cdr = inject(ChangeDetectorRef);

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
