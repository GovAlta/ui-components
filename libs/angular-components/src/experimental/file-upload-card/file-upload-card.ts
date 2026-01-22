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
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "goabx-file-upload-card",
  template: `<goa-file-upload-card
    *ngIf="isReady"
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
  </goa-file-upload-card>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabxFileUploadCard implements OnInit {
  @Input({ required: true }) filename!: string;
  @Input({ transform: numberAttribute }) size?: number;
  @Input() type?: string;
  @Input({ transform: numberAttribute }) progress?: number;
  @Input() error?: string;
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
