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
  @Input({ required: true }) label!: string;
  @Input() url?: string;
  @Input() badge?: string;
  @Input() current?: boolean;
  @Input() divider?: boolean;
  @Input() icon?: string;
  @Input() testId?: string;
  @Input() type?: GoabWorkSideMenuItemType = "normal";
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
