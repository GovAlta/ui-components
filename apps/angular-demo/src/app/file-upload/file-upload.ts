import { Component } from "@angular/core";
import { Upload, MockUploader } from "@abgov/shared/common";

@Component({
  selector: "abgov-file-upload",
  templateUrl: "./file-upload.html",
})
export class FileUploadComponent {
  uploads: Upload[] = [];
  progressList: Record<string, number> = {};

  uploadFile(e: any) {
    const { file } = e.detail;
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
