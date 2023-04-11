import { GoAFileUploadCard, GoAFileUploadInput } from "@abgov/react-components";
import * as React from "react";
import { useState } from "react";
import { MockUploader, Upload } from "@abgov/shared/common";

export default function FileUpload() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [progressList, setProgressList] = useState<Record<string, number>>({});
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
  function deleteFile(upload: Upload) {
    upload.uploader.abort();
    setUploads([...uploads].filter((u) => u.file.name !== upload.file.name));
  }
  return (
    <>
      <GoAFileUploadInput onSelectFile={uploadFile} />
      {uploads.map((upload) => (
        <GoAFileUploadCard
          key={upload.file.name}
          filename={upload.file.name}
          type={upload.file.type}
          size={upload.file.size}
          progress={progressList[upload.file.name]}
          onDelete={() => deleteFile(upload)}
          onCancel={() => deleteFile(upload)}
        />
      ))}
    </>
  );
}
