import {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-file-upload-input",
  template: `@if (isReady) {
    <goa-file-upload-input
      [attr.variant]="variant"
      [attr.accept]="accept"
      [attr.maxfilesize]="maxFileSize"
      [attr.testid]="testId"
      [id]="id"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.mr]="mr"
      [attr.ml]="ml"
      (_selectFile)="_onSelectFile($event)"
    >
    </goa-file-upload-input>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabFileUploadInput extends GoabBaseComponent implements OnInit {
  @Input() id?: string = "";
  /**
   * The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button.
   * @required
   */
  @Input({ required: true }) variant!: GoabFileUploadInputVariant;
  /**
   * Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Defaults to 5MB. Files exceeding this will be rejected.
   * @default "5MB"
   */
  @Input() maxFileSize?: string = "5MB";
  /**
   * Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf").
   * @default "*"
   */
  @Input() accept?: string;

  @Output() onSelectFile = new EventEmitter<GoabFileUploadInputOnSelectFileDetail>();

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onSelectFile(e: Event) {
    const detail = {
      ...(e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail,
      event: e,
    };
    this.onSelectFile.emit(detail);
  }
}
