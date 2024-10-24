<script lang="ts">
  interface Uploader {
    upload: (url: string | ArrayBuffer) => void;
    abort: () => void;
  }
  interface Upload {
    file: File;
    uploader: Uploader;
  }

  let uploads: Upload[] = [];
  let progressList: Record<string, number> = {};

  function deleteFile(upload: Upload) {
    upload.uploader.abort();
    uploads = uploads.filter((u) => u.file.name !== upload.file.name);
  }

  class MockUploader implements Uploader {
    private processId?: any;

    public onprogress: (percent: number) => void = (_: number) => {};
    public onabort: () => void = () => {};
    public onfail: (err: string) => void = (_: string) => {};
    public oncomplete: () => void = () => {};

    upload(_url: string | ArrayBuffer) {
      let progress = 0;

      this.processId = setInterval(() => {
        progress += Math.random() * 10;
        this.onprogress(progress);
        if (progress >= 100) {
          this.oncomplete();
          clearInterval(this.processId);
        }
      }, 200);
    }

    abort() {
      // implement your logic to abort file upload
      console.log("implement logic here");
    }
  }

  function uploadFile(e: Event) {
    const reader = new FileReader();
    const file = (e as CustomEvent).detail.file;
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) return;
      const url = e.target.result;
      const uploader = new MockUploader();

      uploads = [...uploads, { file, uploader }];

      uploader.onabort = () => {
        console.log("aborting...");
      };
      uploader.onfail = (err: string) => console.log("Upload failed: ", err);
      uploader.oncomplete = () => console.log("File upload complete");
      uploader.onprogress = (percent: number) => {
        progressList = { ...progressList, [file.name]: percent };
      };
      if (url) {
        uploader.upload(url);
      }
    };
    reader.readAsDataURL(file);
  }
</script>

<goa-form-item label="Upload a file">
  <goa-file-upload-input on:_selectFile={uploadFile} maxfilesize="100MB"
  ></goa-file-upload-input>
  {#each uploads as upload}
    <goa-file-upload-card
      type={upload.file.type}
      size={upload.file.size}
      filename={upload.file.name}
      progress={progressList[upload.file.name]}
      on:_delete={() => deleteFile(upload)}
      on:_cancel={() => deleteFile(upload)}
    >
    </goa-file-upload-card>
  {/each}
</goa-form-item>
