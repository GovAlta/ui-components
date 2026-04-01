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
export class GoabSpacer implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  @Input() hSpacing?: GoabSpacerHorizontalSpacing;
  @Input() vSpacing?: GoabSpacerVerticalSpacing;
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
