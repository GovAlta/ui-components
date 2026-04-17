import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import {
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFormItem,
} from "@abgov/angular-components";

type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

@Component({
  standalone: true,
  selector: "abgov-bug3602",
  templateUrl: "./bug3602.component.html",
  imports: [CommonModule, GoabFileUploadInput, GoabFileUploadCard, GoabFormItem],
})
export class Bug3602Component {
  smallFiles: UploadedFile[] = [];
  largeFiles: UploadedFile[] = [];

  onSmallFileSelect(detail: GoabFileUploadInputOnSelectFileDetail) {
    const file = detail.file;
    this.smallFiles = [
      ...this.smallFiles,
      {
        id: `${file.name}-${Date.now()}`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      },
    ];
  }

  onLargeFileSelect(detail: GoabFileUploadInputOnSelectFileDetail) {
    const file = detail.file;
    this.largeFiles = [
      ...this.largeFiles,
      {
        id: `${file.name}-${Date.now()}`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      },
    ];
  }

  private removeFirstMatchingFile(
    files: UploadedFile[],
    detail: GoabFileUploadOnDeleteDetail,
  ): UploadedFile[] {
    const index = files.findIndex((f) => f.filename === detail.filename);
    if (index === -1) {
      return files;
    }
    return [...files.slice(0, index), ...files.slice(index + 1)];
  }

  onSmallFileDelete(detail: GoabFileUploadOnDeleteDetail) {
    this.smallFiles = this.removeFirstMatchingFile(this.smallFiles, detail);
  }

  onLargeFileDelete(detail: GoabFileUploadOnDeleteDetail) {
    this.largeFiles = this.removeFirstMatchingFile(this.largeFiles, detail);
  }
}
