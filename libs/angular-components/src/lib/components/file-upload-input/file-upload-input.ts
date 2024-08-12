import { GoABFileUploadInputOnSelectFileDetail, GoABFileUploadInputVariant, Spacing } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-file-upload-input",
  template: `<goa-file-upload-input
    [attr.variant]="variant"
    [attr.accept]="accept"
    [attr.maxfilesize]="maxFileSize"
    [attr.data-testid]="testId"
    [id]="id"
    [attr.mt]="mt"
    [attr.mb]="mb"
    [attr.mr]="mr"
    [attr.ml]="ml"
    (_selectFile)="_onSelectFile($event)"
  >
  </goa-file-upload-input>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoABFileUploadInput {
  @Input() id?: string = "";
  @Input({ required: true }) variant!: GoABFileUploadInputVariant;
  @Input() maxFileSize?: string = "5MB";
  @Input() accept?: string;
  @Input() testId?: string;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() mr?: Spacing;
  @Input() ml?: Spacing;

  @Output() onSelectFile = new EventEmitter<GoABFileUploadInputOnSelectFileDetail>();

  _onSelectFile(e: Event) {
    const detail = (e as CustomEvent<GoABFileUploadInputOnSelectFileDetail>).detail;
    this.onSelectFile.emit(detail);
  }
}
