import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  inject,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-scroll-panel",
  imports: [NgTemplateOutlet],
  template: `@if (isReady) {
    <goa-scroll-panel
      [attr.height]="height"
      [attr.direction]="direction"
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
    </goa-scroll-panel>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabScrollPanel implements OnInit {
  /**
   * Sets the height of the panel. Any valid CSS height value (e.g. "400px", "100%", "100vh").
   * Defaults to "100%". The parent element must establish a height context for "100%" to work.
   */
  @Input() height?: string;
  /** The scroll direction. Can be "vertical" (default) or "horizontal". */
  @Input() direction?: "vertical" | "horizontal";
  /** Template ref for the sticky header region. */
  @Input() header!: TemplateRef<unknown>;
  /** Template ref for the sticky footer region. */
  @Input() footer!: TemplateRef<unknown>;
  /** Sets the data-testid attribute for automated testing. */
  @Input() testId?: string;

  isReady = false;

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // For Angular, delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
