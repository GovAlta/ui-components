import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-sticky-container",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-sticky-container
      [attr.height]="height"
      [attr.testid]="testId"
      [style.height]="height"
    >
      @if (header) {
        <div slot="header">
          <ng-container [ngTemplateOutlet]="header"></ng-container>
        </div>
      }
      <ng-content />
      @if (footer) {
        <div slot="footer">
          <ng-container [ngTemplateOutlet]="footer"></ng-container>
        </div>
      }
    </goa-sticky-container>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabStickyContainer extends GoabBaseComponent implements OnInit {
  /**
   * Sets the height of the container. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   */
  @Input() height?: string;
  /** Template ref for the sticky header region. */
  @Input() header!: TemplateRef<unknown>;
  /** Template ref for the sticky footer region. */
  @Input() footer!: TemplateRef<unknown>;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular, delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
