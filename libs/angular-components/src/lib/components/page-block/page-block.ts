import { GoabPageBlockSize } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-page-block",
  template: `
    @if (isReady) {
      <goa-page-block [attr.width]="width" [attr.testid]="testId">
        <ng-content></ng-content>
      </goa-page-block>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Full-width section with optional background. */
export class GoabPageBlock implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Maximum width of the content area. Use "full" for 100% width or a CSS dimension like "1200px". */
  @Input() width?: GoabPageBlockSize;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
