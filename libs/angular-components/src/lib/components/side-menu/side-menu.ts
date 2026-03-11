import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
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
export class GoabSideMenu implements OnInit {
  isReady = false;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
