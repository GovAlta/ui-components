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
import { CommonModule } from "@angular/common";
import { GoabBaseComponent } from "../base.component";

@Component({
  standalone: true,
  selector: "goab-file-upload-input",
  template: `<goa-file-upload-input
    *ngIf="isReady"
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
  </goa-file-upload-input>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class GoabFileUploadInput extends GoabBaseComponent implements OnInit {
  @Input() id?: string = "";
  @Input({ required: true }) variant!: GoabFileUploadInputVariant;
  @Input() maxFileSize?: string = "5MB";
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
    const detail = (e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail;
    this.onSelectFile.emit(detail);
  }
}
