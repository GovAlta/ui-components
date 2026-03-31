import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-hero-banner",
  imports: [NgTemplateOutlet],
  template: `
    @if (isReady) {
      <goa-hero-banner
        [attr.heading]="heading"
        [attr.backgroundurl]="backgroundUrl"
        [attr.minheight]="minHeight"
        [attr.testid]="testId"
        [attr.maxcontentwidth]="maxContentWidth"
        [attr.backgroundColor]="backgroundColor"
        [attr.textcolor]="textColor"
      >
        <ng-content />
        <div slot="actions">
          <ng-container [ngTemplateOutlet]="actions"></ng-container>
        </div>
      </goa-hero-banner>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabHeroBanner implements OnInit {
  isReady = false;
  /** Main heading text. */
  @Input() heading?: string;
  /** Background image url. */
  @Input() backgroundUrl?: string;
  /** Minimum height of the hero banner. Defaults to 600px when a background image is provided. */
  @Input() minHeight?: string;
  /** Sets a data-testid attribute for automated testing. */
  @Input() testId?: string;
  /** Maximum width of the content area. */
  @Input() maxContentWidth?: string;
  /** Hero Banner background color when no background image is provided. */
  @Input() backgroundColor?: string;
  /** Text color within the hero banner. */
  @Input() textColor?: string;
  /** @required Angular template reference for the actions slot content. */
  @Input() actions!: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
