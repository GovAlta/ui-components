import { GoabWorkSideMenuItemType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-work-side-menu-item", // eslint-disable-line
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-work-side-menu-item
        [attr.label]="label"
        [attr.url]="url"
        [attr.badge]="badge"
        [attr.current]="current"
        [attr.divider]="divider"
        [attr.icon]="icon"
        [attr.testid]="testId"
        [attr.type]="type"
      >
        @if (popoverContent) {
          <div slot="popoverContent">
            <ng-container [ngTemplateOutlet]="popoverContent"></ng-container>
          </div>
        }
        <ng-content />
      </goa-work-side-menu-item>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkSideMenuItem implements OnInit {
  /** @required The text label displayed for the menu item. */
  @Input({ required: true }) label!: string;
  /** The URL the menu item links to. Optional — when absent, renders as a button instead of a link. */
  @Input() url?: string;
  /** Badge text displayed alongside the menu item (e.g., notification count). */
  @Input() badge?: string;
  /** When true, indicates this is the currently active menu item. */
  @Input() current?: boolean;
  /** When true, displays a divider line above this menu item. */
  @Input() divider?: boolean;
  /** Icon displayed before the menu item label. */
  @Input() icon?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Sets the visual style of the badge. Use "emergency" for urgent items, "success" for positive status. @default "normal" */
  @Input() type?: GoabWorkSideMenuItemType = "normal";
  /** @required Template reference for the popover content slot. */
  @Input() popoverContent!: TemplateRef<any>;

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
}
