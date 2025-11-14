import { Component } from "@angular/core";
import {
  GoabFormItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFileUploadInputOnSelectFileDetail,
} from "@abgov/angular-components";
import { NgFor } from "@angular/common";

interface Uploader {
  upload: (url: string | ArrayBuffer) => void;
  abort: () => void;
}
interface Upload {
  file: File;
  uploader: Uploader;
}
class MockUploader implements Uploader {
  public onprogress: (percent: number) => void = (_: number) => {
    /* This function intentionally does nothing */
  };
  public onabort: () => void = () => {
    /* This function intentionally does nothing */
  };
  public onfail: (err: string) => void = (_: string) => {
    /* This function intentionally does nothing */
  };
  public oncomplete: () => void = () => {
    /* This function intentionally does nothing */
  };

  upload(_url: string | ArrayBuffer) {
    /* This function intentionally does nothing */
  }

  abort() {
    /* This function intentionally does nothing */
  }
}

@Component({
  selector: "abgov-accordion",
  standalone: true,
  templateUrl: "./bug2459.component.html",
  imports: [GoabFormItem, GoabFileUploadCard, GoabFileUploadInput, NgFor],
})
export class Bug2459Component {
  uploads: Upload[] = [];
  progressList: Record<string, number> = {};

  uploadFile(e: GoabFileUploadInputOnSelectFileDetail) {
    const reader = new FileReader();
    const file = e.file;
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) return;
      const url = e.target.result;
      const uploader = new MockUploader();

      this.uploads.push({ file, uploader });

      uploader.onabort = () => console.log("Aborting upload");
      uploader.onfail = (err) => console.log("Upload failed: ", err);
      uploader.oncomplete = () => console.log("File upload complete");
      uploader.onprogress = (percent) => {
        this.progressList[file.name] = percent;
      };
      if (url) {
        uploader.upload(url);
      }
    };
    reader.readAsDataURL(file);
  }

  deleteFile(upload: Upload) {
    upload.uploader.abort();
    this.uploads = this.uploads.filter((u) => u.file.name !== upload.file.name);
  }
}
