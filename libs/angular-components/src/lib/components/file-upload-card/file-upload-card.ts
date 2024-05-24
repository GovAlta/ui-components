import { ABGovFileUploadOnCancelDetail, ABGovFileUploadOnDeleteDetail, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-file-upload-card",
  template: `<goa-file-upload-card
    [filename]="filename"
    [size]="size"
    [type]="type"
    [progress]="progress"
    [error]="error"
    [mt]="mt"
    [mb]="mb"
    [mr]="mr"
    [ml]="ml"
    (_cancel)="_onCancel()"
    (_delete)="_onDelete()"
  >
  </goa-file-upload-card>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ABGovFileUploadCard {
  @Input({ required: true }) filename!: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;
  @Input() size?: number;
  @Input() type?: string;
  @Input() progress?: number;
  @Input() error?: string;

  @Output() onCancel = new EventEmitter<ABGovFileUploadOnCancelDetail>();
  @Output() onDelete = new EventEmitter<ABGovFileUploadOnDeleteDetail>();

  _onCancel() {
    this.onCancel.emit({ filename: this.filename })
  }

  _onDelete() {
    this.onDelete.emit({ filename: this.filename })
  }
}
