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
  TemplateRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-app-header",
  imports: [NgTemplateOutlet],
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
      @if (this.banner) {
        <div slot="banner">
          <ng-container [ngTemplateOutlet]="banner"></ng-container>
        </div>
      }
      @if (this.phase) {
        <div slot="phase">
          <ng-container [ngTemplateOutlet]="phase"></ng-container>
        </div>
      }
      @if (this.navigation) {
        <div slot="navigation">
          <ng-container [ngTemplateOutlet]="navigation"></ng-container>
        </div>
      }
      @if (this.utilities) {
        <div slot="utilities">
          <ng-container [ngTemplateOutlet]="utilities"></ng-container>
        </div>
      }
      <ng-content />
    </goa-app-header>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Provide structure to help users find their way around the service. */
export class GoabAppHeader implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** Sets the URL to link from the alberta.ca logo. A full url is required. */
  @Input() url?: string;
  /** Sets the service name to display in the app header. */
  @Input() heading?: string;
  /** Secondary text displayed under the service name. */
  @Input() secondaryText?: string;
  /** Maximum width of the content area. */
  @Input() maxContentWidth?: string;
  /** Sets the breakpoint in px for the full menu to display. */
  @Input({ transform: numberAttribute }) fullMenuBreakpoint?: number;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Banner content displayed above the header. */
  @Input() banner?: TemplateRef<any>;
  /** Phase badge content displayed beside the service name. */
  @Input() phase?: TemplateRef<any>;
  /** Links and app header menus appear in the navigation bar below the header. Use plain links for single items and app header menu for grouped items with a dropdown. */
  @Input() navigation?: TemplateRef<any>;
  /** Actions like user account menus appear on the right side of the header. Use menu button for dropdowns with actions. */
  @Input() utilities?: TemplateRef<any>;

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
