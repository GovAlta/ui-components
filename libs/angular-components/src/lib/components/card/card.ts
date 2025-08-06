import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-card",
  imports: [CommonModule],
  template: `
    <goa-card
      *ngIf="isReady"
      [attr.elevation]="elevation"
      [attr.width]="width"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-card>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCard extends GoabBaseComponent implements OnInit {
  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  @Input({ transform: numberAttribute }) elevation?: number;
  @Input() width?: string;
}
