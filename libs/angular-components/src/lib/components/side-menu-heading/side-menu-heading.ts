import { GoabIconType } from "@abgov/ui-components-common";
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
  selector: "goab-side-menu-heading",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-side-menu-heading
        [attr.version]="version"
        [attr.testid]="testId"
        [attr.icon]="icon"
      >
        <ng-content />
        <span slot="meta">
          <ng-container [ngTemplateOutlet]="meta"></ng-container>
        </span>
      </goa-side-menu-heading>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSideMenuHeading implements OnInit {
  isReady = false;
  version = "2";
  @Input() icon!: GoabIconType;
  @Input() testId?: string;
  @Input() meta!: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
