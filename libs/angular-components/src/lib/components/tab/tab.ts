import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  booleanAttribute,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  standalone: true,
  selector: "goab-tab",
  template: `
    @if (isReady) {
      <goa-tab
        [attr.slug]="slug"
        [attr.disabled]="disabled || null"
        [attr.heading]="getHeadingAsString()"
      >
        <ng-content />
        @if (typeof heading !== "string") {
          <div slot="heading">
            <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
          </div>
        }
      </goa-tab>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgTemplateOutlet],
})
export class GoabTab implements OnInit {
  isReady = false;
  @Input() heading!: string | TemplateRef<any>;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Input() slug?: string;

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
