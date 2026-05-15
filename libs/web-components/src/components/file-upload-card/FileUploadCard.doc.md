# FileUploadCard

Use it like this:
```ts
export class FileUploadComponent {
  uploads: Upload[] = [];
  progressList: Record<string, number> = {};
  uploadFile(e: any) {
    const { file } = e.detail;
    if (uploads.find(upload => upload.file.name === file.name)) {
      return;
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target!.result;  
      const uploader = new MockUploader();    
      this.uploads = [...this.uploads, { file, uploader }]
      uploader.oncomplete = () => console.log("File upload complete")    
      uploader.onprogress = (percent: number) => this.progressList[file.name] = percent;
      uploader.onabort = () => console.log("Aborting the upload");
      uploader.onfail = (err: string) =>  console.log("Upload failed: ", err)
      if (url) {
        uploader.upload(url)
      }
    }
    reader.readAsDataURL(file)  
  }
  deleteFile(upload: Upload) {
    upload.uploader.abort()
    this.uploads = [...this.uploads].filter(u => u.file.name !== upload.file.name)
  }  
}
```

```html
<goa-file-upload-input (_selectFile)="uploadFile($event)"></goa-file-upload-input> 
<goa-file-upload-card
  *ngFor="let upload of uploads; index as i"
  [type]="upload.file.type"
  [size]="upload.file.size"
  [filename]="upload.file.name"
  [progress]="progressList[upload.file.name]"
  (delete)="deleteFile(upload)"
  (cancel)="deleteFile(upload)"
>
</goa-file-upload-card>
```
