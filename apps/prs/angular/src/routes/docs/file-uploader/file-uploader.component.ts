import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFormItem,
} from "@abgov/angular-components";
import type {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";

interface UploadedFile {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
}

@Component({
  standalone: true,
  selector: "abgov-docs-file-uploader",
  templateUrl: "./file-uploader.component.html",
  imports: [CommonModule, GoabFileUploadCard, GoabFileUploadInput, GoabFormItem],
})
export class DocsFileUploaderComponent {
  basicFiles: UploadedFile[] = [];
  imageFiles: UploadedFile[] = [];
  pdfFiles: UploadedFile[] = [];
  smallFiles: UploadedFile[] = [];
  largeFiles: UploadedFile[] = [];
  buttonFiles: UploadedFile[] = [];
  dragdropFiles: UploadedFile[] = [];

  private simulateUpload(
    detail: GoabFileUploadInputOnSelectFileDetail,
    getList: () => UploadedFile[],
    setList: (next: UploadedFile[]) => void,
  ): void {
    const file = detail.file;
    const id = `${file.name}-${Date.now()}`;
    const uploaded: UploadedFile = {
      id,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    };
    setList([...getList(), uploaded]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        setList(
          getList().map((f) => (f.id === id ? { ...f, progress: -1 } : f)),
        );
        clearInterval(interval);
      } else {
        setList(
          getList().map((f) =>
            f.id === id ? { ...f, progress: Math.round(progress) } : f,
          ),
        );
      }
    }, 300);
  }

  uploadBasic(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.basicFiles, (next) => (this.basicFiles = next));
  }
  deleteBasic(detail: GoabFileUploadOnDeleteDetail): void {
    this.basicFiles = this.basicFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadImage(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.imageFiles, (next) => (this.imageFiles = next));
  }
  deleteImage(detail: GoabFileUploadOnDeleteDetail): void {
    this.imageFiles = this.imageFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadPdf(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.pdfFiles, (next) => (this.pdfFiles = next));
  }
  deletePdf(detail: GoabFileUploadOnDeleteDetail): void {
    this.pdfFiles = this.pdfFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadSmall(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.smallFiles, (next) => (this.smallFiles = next));
  }
  deleteSmall(detail: GoabFileUploadOnDeleteDetail): void {
    this.smallFiles = this.smallFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadLarge(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.largeFiles, (next) => (this.largeFiles = next));
  }
  deleteLarge(detail: GoabFileUploadOnDeleteDetail): void {
    this.largeFiles = this.largeFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadButton(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.buttonFiles, (next) => (this.buttonFiles = next));
  }
  deleteButton(detail: GoabFileUploadOnDeleteDetail): void {
    this.buttonFiles = this.buttonFiles.filter((f) => f.filename !== detail.filename);
  }

  uploadDragdrop(detail: GoabFileUploadInputOnSelectFileDetail): void {
    this.simulateUpload(detail, () => this.dragdropFiles, (next) => (this.dragdropFiles = next));
  }
  deleteDragdrop(detail: GoabFileUploadOnDeleteDetail): void {
    this.dragdropFiles = this.dragdropFiles.filter((f) => f.filename !== detail.filename);
  }

  handleCardDelete(detail: GoabFileUploadOnDeleteDetail): void {
    console.log("delete", detail);
  }
}
