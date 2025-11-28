import {
  GoabBlockAlignment,
  GoabBlockDirection,
  Spacing,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-block",
  imports: [CommonModule],
  template: `
    <goa-block
      *ngIf="isReady"
      [attr.gap]="gap"
      [attr.direction]="direction"
      [attr.alignment]="alignment"
      [attr.width]="width"
      [attr.min-width]="minWidth"
      [attr.max-width]="maxWidth"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-block>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabBlock extends GoabBaseComponent implements OnInit {
  @Input() gap?: Spacing;
  @Input() direction?: GoabBlockDirection;
  @Input() alignment?: GoabBlockAlignment;
  @Input() width?: string;
  @Input() minWidth?: string;
  @Input() maxWidth?: string;

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
}
