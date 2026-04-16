import { GoabIconType } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  inject,
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
/** Section heading in side menu. */
export class GoabSideMenuHeading implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  version = "2";
  /** @required Icon displayed before the heading text. */
  @Input() icon!: GoabIconType;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Sets the template for the meta slot content. */
  @Input() meta!: TemplateRef<any>;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
