import { GoabPageBlockSize } from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-page-block",
  template: `
    @if (isReady) {
      <goa-page-block [attr.width]="width" [attr.testid]="testId">
        <ng-content></ng-content>
      </goa-page-block>
    }
  `,

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabPageBlock implements OnInit {
  isReady = false;
  @Input() width?: GoabPageBlockSize;
  @Input() testId?: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
