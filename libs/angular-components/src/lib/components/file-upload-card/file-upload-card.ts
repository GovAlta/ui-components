import { GoabFileUploadOnCancelDetail, GoabFileUploadOnDeleteDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-file-upload-card",
  template: `<goa-file-upload-card
    [attr.filename]="filename"
    [attr.size]="size"
    [attr.type]="type"
    [attr.progress]="progress"
    [attr.error]="error"
    [attr.data-testid]="testId"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.mr]="mr"
    [attr.ml]="ml"
    (_cancel)="_onCancel()"
    (_delete)="_onDelete()"
  >
  </goa-file-upload-card>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabFileUploadCard {
  @Input({ required: true }) filename!: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;
  @Input() size?: number;
  @Input() type?: string;
  @Input() progress?: number;
  @Input() error?: string;
  @Input() testId?: string;

  @Output() onCancel = new EventEmitter<GoabFileUploadOnCancelDetail>();
  @Output() onDelete = new EventEmitter<GoabFileUploadOnDeleteDetail>();

  _onCancel() {
    this.onCancel.emit({ filename: this.filename })
  }

  _onDelete() {
    this.onDelete.emit({ filename: this.filename })
  }
}
