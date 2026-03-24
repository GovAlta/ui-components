import {
  GoabSpacerHorizontalSpacing,
  GoabSpacerVerticalSpacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-spacer",
  template: `
    @if (isReady) {
      <goa-spacer
        [attr.hspacing]="hSpacing"
        [attr.vspacing]="vSpacing"
        [attr.testid]="testId"
      >
      </goa-spacer>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSpacer implements OnInit {
  isReady = false;
  /**
   * Horizontal spacing.
   * @default "none"
   */
  @Input() hSpacing?: GoabSpacerHorizontalSpacing;
  /**
   * Vertical spacing
   * @default "none"
   */
  @Input() vSpacing?: GoabSpacerVerticalSpacing;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
