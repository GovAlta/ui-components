import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgTemplateOutlet, CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-tab",
  template: `
    <goa-tab *ngIf="isReady">
      <ng-content />
      <div slot="heading">
        <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
        {{getHeadingAsString()}}
      </div>
    </goa-tab>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet, CommonModule]
})
export class GoabTab implements OnInit {
  isReady = false;
  @Input() heading!: string | TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    });
  }

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }
}
