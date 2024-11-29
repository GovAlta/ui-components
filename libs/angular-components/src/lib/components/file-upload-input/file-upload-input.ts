import { GoabFileUploadInputOnSelectFileDetail, GoabFileUploadInputVariant } from "@abgov/ui-components-common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-file-upload-input",
  template: `<goa-file-upload-input
    [attr.variant]="variant"
    [attr.accept]="accept"
    [attr.maxfilesize]="maxFileSize"
    [attr.testid]="testId"
    (_selectFile)="_onSelectFile($event)"
  >
  </goa-file-upload-input>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFileUploadInput {
  @Input() id?: string = "";
  @Input({ required: true }) variant!: GoabFileUploadInputVariant;
  @Input() maxFileSize?: string = "5MB";
  @Input() accept?: string;
  @Input() testId?: string;

  @Output() onSelectFile = new EventEmitter<GoabFileUploadInputOnSelectFileDetail>();

  _onSelectFile(e: Event) {
    const detail = (e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail;
    this.onSelectFile.emit(detail);
  }
}
