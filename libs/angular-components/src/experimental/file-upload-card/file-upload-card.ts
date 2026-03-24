import {
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  numberAttribute,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goabx-file-upload-card",
  template: ` @if (isReady) {
    <goa-file-upload-card
      [attr.version]="version"
      [attr.filename]="filename"
      [attr.size]="size"
      [attr.type]="type"
      [attr.progress]="progress"
      [attr.error]="error"
      [attr.testid]="testId"
      (_cancel)="_onCancel($event)"
      (_delete)="_onDelete($event)"
    >
    </goa-file-upload-card>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabxFileUploadCard implements OnInit {
  /** The name of the uploaded file to display. */
  @Input({ required: true }) filename!: string;
  /**
   * The file size in bytes. Displayed in a human-readable format (KB, MB).
   * @required
   */
  @Input({ transform: numberAttribute }) size?: number;
  /**
   * The MIME type of the file. Used to determine the file type icon.
   * @default ""
   */
  @Input() type?: string;
  /** Upload progress percentage from 0-100. Use -1 to indicate upload is complete. */
  @Input({ transform: numberAttribute }) progress?: number;
  /**
   * Error message to display. When set, the card shows an error state with a cancel button.
   * @default ""
   */
  @Input() error?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  @Input() testId?: string;

  @Output() onCancel = new EventEmitter<GoabFileUploadOnCancelDetail>();
  @Output() onDelete = new EventEmitter<GoabFileUploadOnDeleteDetail>();

  isReady = false;
  version = "2";

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // For Angular 20, we need to delay rendering the web component
    // to ensure all attributes are properly bound before the component initializes
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onCancel(event: Event) {
    this.onCancel.emit({ filename: this.filename, event });
  }

  _onDelete(event: Event) {
    this.onDelete.emit({ filename: this.filename, event });
  }
}
