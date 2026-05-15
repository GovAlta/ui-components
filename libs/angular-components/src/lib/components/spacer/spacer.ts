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
  inject,
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
/** Negative area between the components and the interface. */
export class GoabSpacer implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Horizontal spacing. */
  @Input() hSpacing?: GoabSpacerHorizontalSpacing;
  /** Vertical spacing. */
  @Input() vSpacing?: GoabSpacerVerticalSpacing;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
