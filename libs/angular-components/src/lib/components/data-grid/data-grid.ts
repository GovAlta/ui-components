import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, booleanAttribute, ChangeDetectorRef, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-data-grid",
  imports: [CommonModule],
  template: `
    <goa-data-grid
      *ngIf="isReady"
      [attr.keyboard-icon]="keyboardIcon ? '' : null"
      [attr.keyboard-nav]="keyboardNav"
    >
      <ng-content></ng-content>
    </goa-data-grid>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDataGrid implements OnInit {
  @Input({ transform: booleanAttribute }) keyboardIcon = true;
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
