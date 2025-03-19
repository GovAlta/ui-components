import { NgTemplateOutlet } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { GoabDrawerPosition, GoabDrawerSize } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-drawer",
  imports: [NgTemplateOutlet],
  template: `
    <goa-drawer
      [open]="open"
      [attr.position]="position"
      [attr.heading]="getHeadingAsString()"
      [attr.maxsize]="maxSize"
      [attr.testid]="testId"
      (_close)="_onClose()"
    >
      <ng-content></ng-content>
      <div slot="heading">
        <ng-container [ngTemplateOutlet]="getHeadingAsTemplate()"></ng-container>
      </div>
      <div slot="actions">
        <ng-container [ngTemplateOutlet]="actions"></ng-container>
      </div>
    </goa-drawer>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabDrawer {
  @Input({ required: true }) open!: boolean;
  @Input({ required: true }) position!: GoabDrawerPosition;
  @Input() heading!: string | TemplateRef<any>;
  @Input() maxSize?: GoabDrawerSize;
  @Input() testId?: string;
  @Input() actions!: TemplateRef<any>;
  @Output() onClose = new EventEmitter();

  _onClose() {
    this.onClose.emit();
  }

  getHeadingAsString(): string {
    return this.heading instanceof TemplateRef ? "" : this.heading;
  }

  getHeadingAsTemplate(): TemplateRef<any> | null {
    if (!this.heading) return null;
    return this.heading instanceof TemplateRef ? this.heading : null;
  }
}

