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
  selector: "goab-side-menu",
  template: `
    @if (isReady) {
      <goa-side-menu [attr.testid]="testId">
        <ng-content />
      </goa-side-menu>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A side navigation that helps the user navigate between pages. */
export class GoabSideMenu implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
