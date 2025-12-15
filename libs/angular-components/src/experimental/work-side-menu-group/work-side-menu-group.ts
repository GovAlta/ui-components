import { GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goabx-work-side-menu-group", // eslint-disable-line
  imports: [CommonModule],
  template: `
    <goa-work-side-menu-group
      *ngIf="isReady"
      [attr.heading]="heading"
      [attr.icon]="icon"
      [attr.testid]="testId"
    >
      <ng-content />
    </goa-work-side-menu-group>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxWorkSideMenuGroup implements OnInit {
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) icon!: GoabIconType;
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
