import { GoabFileUploadCard, GoabFileUploadInput } from "@abgov/angular-components";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

interface Uploader {
  upload: (url: string | ArrayBuffer) => void;
  abort: () => void;
}

interface Upload {
  file: File;
  uploader: Uploader;
}

class MockUploader implements Uploader {
  public onprogress: (percent: number) => void = (_: number) => { };
  public onabort: () => void = () => { };
  public onfail: (err: string) => void = (_: string) => { };
  public oncomplete: () => void = () => { };

  upload(_url: string | ArrayBuffer) {
    // implement your logic to upload files
  }

  abort() {
    // implement your logic to abort file upload
  }
}

@Component({
  standalone: true,
  selector: "abgov-file-upload",
  templateUrl: "./file-upload.html",
  imports: [
    GoabFileUploadInput,
    GoabFileUploadCard,
    CommonModule,
  ],
})
export class FileUploadComponent {
  uploads: Upload[] = [];
  progressList: Record<string, number> = {};

  uploadFile(e: any) {
    const { file } = e;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!ev.target || !ev.target.result) {
        return;
      }

      const url = ev.target.result;
      const uploader = new MockUploader();

      this.uploads = [...this.uploads, { file, uploader }];

      uploader.oncomplete = () => console.log("File upload complete");
      uploader.onprogress = (percent: number) =>
        (this.progressList[file.name] = percent);
      uploader.onabort = () => console.log("Aborting upload");
      uploader.onfail = (err: string) => console.log("Upload failed: ", err);

      if (url) {
        uploader.upload(url);
      }
    };
    reader.readAsDataURL(file);
  }

  deleteFile(upload: Upload) {
    upload.uploader.abort();
    this.uploads = [...this.uploads].filter(
      (u) => u.file.name !== upload.file.name
    );
  }
}
