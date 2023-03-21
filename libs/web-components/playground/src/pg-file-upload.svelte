<svelte:options tag="pg-file-upload" />

<script lang="ts">

  let uploads: Upload[] = [];
  let progressList = {};

  // Uploader
  
  interface Uploader {
    upload: (url: string | ArrayBuffer) => void;
    abort: () => void;
  }

  interface Upload {
    file: File;
    uploader: Uploader;
  }

  class S3Uploader implements Uploader {
    public onabort: () => void;
    public onfail: (err: string) => void;
    public oncomplete: () => void;
    public onprogress: (percent: number) => void;

    private processId: any;

    constructor() {
      this.onabort = () => {};
      this.onfail = (_: string) => {};
      this.oncomplete = () => {};
      this.onprogress = (_: number) => {};
    }
    
    upload(_url: string | ArrayBuffer) {
      let progress = 0;

      this.processId = setInterval(() => {
        progress += Math.random() * 10;
        this.onprogress(progress);
        if (progress >= 100) {
          this.oncomplete();
          clearInterval(this.processId);
        }
      }, 200)    
    }

    abort() {
      clearInterval(this.processId);
      this.onabort();
    }
  }

  // Events
  
  function uploadFile(e: CustomEvent) {
    const { file } = e.detail;
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target.result;  
      const uploader = new S3Uploader();

      if (uploads.find(upload => upload.file.name === file.name)) {
        return;
      }

      uploads = [...uploads, { file, uploader }]
    
      uploader.oncomplete = () => {
        console.log("File upload complete")    
      }
      uploader.onprogress = (percent: number) => {
        progressList[file.name] = percent;
      }
      uploader.onabort = () => {
        console.log("Upload aborted")
      }
      uploader.onfail = (err: string) => {
        console.log("Upload failed: ", err)
      }
      uploader.upload(url)
    }
    reader.readAsDataURL(file)  
  }

  function deleteFile(upload: Upload) {
    upload.uploader.abort()
    delete progressList[upload.file.name]
    uploads = [...uploads].filter(u => u.file.name !== upload.file.name)
  }
</script>

<goa-file-upload-input on:_selectFile={uploadFile} maxfilesize="10MB" variant="button" />

<goa-form-item label="Upload a file">
  <goa-file-upload-input on:_selectFile={uploadFile} maxfilesize="10MB" variant="dragdrop" />
</goa-form-item>

{#each uploads as upload (upload.file.name)}
  <goa-file-upload-card
    filename={upload.file.name}
    type={upload.file.type}
    size={upload.file.size}
    progress={progressList[upload.file.name]}
    on:_delete={() => deleteFile(upload)}
    on:_cancel={() => deleteFile(upload)}
  />
{/each}