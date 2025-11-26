import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  ChangeDetectorRef,
  HostBinding,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabTextColor,
  GoabTextHeadingElement,
  GoabTextMaxWidth,
  GoabTextSize,
  GoabTextTextElement,
  Spacing,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-text",
  imports: [CommonModule],
  template: `
    <goa-text
      *ngIf="isReady"
      [attr.as]="tag"
      [attr.size]="size"
      [attr.maxwidth]="maxWidth"
      [attr.color]="color"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
    </goa-text>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabText implements OnInit {
  @Input() tag?: GoabTextTextElement | GoabTextHeadingElement;
  @Input() size?: GoabTextSize;
  @Input() maxWidth?: GoabTextMaxWidth;
  @Input() color?: GoabTextColor;
  @Input() id?: string;
  /*
    This is necessary because angular outputs two elements, <goab-text> and <goa-text>
    This removes the id from <goa-text> and only outputs it to <goab-text>
  */
  @HostBinding("attr.id") get hostId() {
    return this.id;
  }
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;

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
