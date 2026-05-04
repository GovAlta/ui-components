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
  selector: "goab-card-image",
  template: `
    @if (isReady) {
      <goa-card-image [attr.src]="src" [attr.height]="height">
        <ng-content />
      </goa-card-image>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/** A container that groups related content and actions. */
export class GoabCardImage implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  /** @required The URL of the image to display. */
  @Input({ required: true }) src!: string;
  /** @required Height of the image container. Accepts CSS values like "200px" or "100%". */
  @Input({ required: true }) height!: string;

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
