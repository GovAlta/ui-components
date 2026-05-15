import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-column-layout",
  template: `
    @if (isReady) {
      <goa-one-column-layout>
        <ng-content />
      </goa-one-column-layout>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** Organizes page content in one, two, or three responsive columns. */
export class GoabColumnLayout implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** no props **/
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
