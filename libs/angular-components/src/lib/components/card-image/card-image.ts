import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
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
export class GoabCardImage implements OnInit {
  /**
   * The URL of the image to display.
   * @required
   */
  @Input({ required: true }) src!: string;
  /**
   * Height of the image container. Accepts CSS values like "200px" or "100%".
   * @required
   */
  @Input({ required: true }) height!: string;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
