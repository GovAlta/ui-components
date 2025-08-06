import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgTemplateOutlet, CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-hero-banner",
  imports: [NgTemplateOutlet, CommonModule],
  template: `
    <goa-hero-banner
      *ngIf="isReady"
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
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabHeroBanner implements OnInit {
  isReady = false;
  @Input() heading?: string;
  @Input() backgroundUrl?: string;
  @Input() minHeight?: string;
  @Input() testId?: string;
  @Input() maxContentWidth?: string;
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() actions!: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }
}
