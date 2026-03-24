import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-data-grid",

  template: `
    @if (isReady) {
      <goa-data-grid
        [attr.keyboard-icon-visibility]="keyboardIconVisibility"
        [attr.keyboard-icon-position]="keyboardIconPosition"
        [attr.keyboard-nav]="keyboardNav"
      >
        <ng-content></ng-content>
      </goa-data-grid>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDataGrid implements OnInit {
  /**
   * Controls visibility of the keyboard navigation indicator icon. Use "visible" to show or "hidden" to hide.
   * @default "visible"
   */
  @Input() keyboardIconVisibility: "visible" | "hidden" = "visible";
  /**
   * Position of the keyboard navigation indicator icon.
   * @default "left"
   */
  @Input() keyboardIconPosition: "left" | "right" = "left";
  @Input({ required: true }) keyboardNav!: "layout" | "table";

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
