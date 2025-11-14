import {
  GoabFormItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
} from "@abgov/react-components";
import {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnDeleteDetail,
  GoabFileUploadOnCancelDetail,
} from "@abgov/ui-components-common";
import { useState } from "react";

export const Bug2459Route = () => {
  interface Uploader {
    upload: (url: string | ArrayBuffer) => void;
    abort: () => void;
  }
  interface Upload {
    file: File;
    uploader: Uploader;
  }
  class MockUploader implements Uploader {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upload(_url: string | ArrayBuffer) {
      // implement your logic to upload files
    }

    abort() {
      // implement your logic to abort file upload
    }
  }

  const [uploads, setUploads] = useState<Upload[]>([]);
  const [progressList, setProgressList] = useState<Record<string, number>>({});

  function deleteFile(fileName: string) {
    setUploads((uploadz) => {
      return uploadz.filter((u) => fileName !== u.file.name);
    });
  }

  function uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) return;
      const url = e.target.result;
      const uploader = new MockUploader();

      setUploads((old) => [...old, { file, uploader }]);

      uploader.onabort = () => console.log("Aborting upload");
      uploader.onfail = (err) => console.log("Upload failed: ", err);
      uploader.oncomplete = () => console.log("File upload complete");
      uploader.onprogress = (percent) => {
        setProgressList((old) => ({ ...old, [file.name]: percent }));
      };

      if (url) {
        uploader.upload(url);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <main>
      <GoabFormItem label="Upload a file">
        <GoabFileUploadInput
          onSelectFile={(event: GoabFileUploadInputOnSelectFileDetail) =>
            uploadFile(event.file)
          }
          maxFileSize="100MB"
        />
        {uploads.map((upload) => (
          <GoabFileUploadCard
            key={upload.file.name}
            filename={upload.file.name}
            type={upload.file.type}
            size={upload.file.size}
            progress={progressList[upload.file.name]}
            onDelete={(detail: GoabFileUploadOnDeleteDetail) =>
              deleteFile(detail.filename)
            }
            onCancel={(detail: GoabFileUploadOnCancelDetail) =>
              deleteFile(detail.filename)
            }
          />
        ))}
      </GoabFormItem>
    </main>
  );
};
