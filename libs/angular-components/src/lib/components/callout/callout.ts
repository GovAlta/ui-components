import {
  GoabCalloutAriaLive,
  GoabCalloutSize,
  GoabCalloutType,
  GoabCalloutIconTheme,
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
  selector: "goab-callout",
  imports: [CommonModule],
  template: `
    <goa-callout
      *ngIf="isReady"
      [attr.type]="type"
      [attr.heading]="heading"
      [attr.size]="size"
      [attr.maxwidth]="maxWidth"
      [attr.arialive]="ariaLive"
      [attr.icontheme]="iconTheme"
      [attr.testid]="testId"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-callout>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabCallout extends GoabBaseComponent implements OnInit {
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

  @Input() type?: GoabCalloutType = "information";
  @Input() heading?: string = "";
  @Input() size?: GoabCalloutSize = "large";
  @Input() maxWidth?: string;
  @Input() ariaLive?: GoabCalloutAriaLive = "off";
  @Input() iconTheme?: GoabCalloutIconTheme = "outline";
}
