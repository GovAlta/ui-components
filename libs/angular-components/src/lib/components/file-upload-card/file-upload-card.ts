import { GoabFileUploadOnCancelDetail, GoabFileUploadOnDeleteDetail } from "@abgov/ui-components-common";
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
    [attr.testid]="testId"
    (_cancel)="_onCancel()"
    (_delete)="_onDelete()"
  >
  </goa-file-upload-card>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoabFileUploadCard {
  @Input({ required: true }) filename!: string;
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
