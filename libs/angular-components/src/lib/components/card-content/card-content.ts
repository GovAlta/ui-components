import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card-content",
  template: `
    @if (isReady) {
      <goa-card-content>
        <ng-content />
      </goa-card-content>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCardContent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  isReady = false;

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
