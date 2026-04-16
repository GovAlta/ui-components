import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-card-actions",
  template: `
    @if (isReady) {
      <goa-card-actions>
        <ng-content />
      </goa-card-actions>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A container that groups related content and actions. */
export class GoabCardActions implements OnInit {
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
