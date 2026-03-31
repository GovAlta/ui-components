import { GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  booleanAttribute,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-work-side-menu-group", // eslint-disable-line

  template: `
    @if (isReady) {
      <goa-work-side-menu-group
        [attr.heading]="heading"
        [attr.icon]="icon"
        [attr.open]="open ? '' : null"
        [attr.testid]="testId"
      >
        <ng-content />
      </goa-work-side-menu-group>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabWorkSideMenuGroup implements OnInit {
  /** @required The text displayed in the group heading. */
  @Input({ required: true }) heading!: string;
  /** Icon displayed before the group label. When omitted, no icon is rendered and no space is reserved. */
  @Input() icon?: GoabIconType;
  /** Whether the group is open. */
  @Input({ transform: booleanAttribute }) open?: boolean;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

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
