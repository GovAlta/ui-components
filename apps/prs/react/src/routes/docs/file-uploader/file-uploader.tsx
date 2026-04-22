import { useState } from "react";
import {
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFormItem,
} from "@abgov/react-components";
import type {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";

type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

export function DocsFileUploaderRoute() {
  const [basicFiles, setBasicFiles] = useState<UploadedFile[]>([]);
  const [imageFiles, setImageFiles] = useState<UploadedFile[]>([]);
  const [pdfFiles, setPdfFiles] = useState<UploadedFile[]>([]);
  const [smallFiles, setSmallFiles] = useState<UploadedFile[]>([]);
  const [largeFiles, setLargeFiles] = useState<UploadedFile[]>([]);
  const [buttonFiles, setButtonFiles] = useState<UploadedFile[]>([]);
  const [dragdropFiles, setDragdropFiles] = useState<UploadedFile[]>([]);

  function uploadFile(
    detail: GoabFileUploadInputOnSelectFileDetail,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  ) {
    const file = detail.file;
    const id = `${file.name}-${Date.now()}`;
    const uploaded: UploadedFile = {
      id,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    };
    setFiles((prev) => [...prev, uploaded]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress: -1 } : f)),
        );
        clearInterval(interval);
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: Math.round(progress) } : f,
          ),
        );
      }
    }, 300);
  }

  function deleteFile(
    detail: GoabFileUploadOnDeleteDetail,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  ) {
    setFiles((prev) => prev.filter((f) => f.filename !== detail.filename));
  }

  return (
    <div>
      <h2>File uploader</h2>

      <h3>Basic file upload</h3>
      <GoabFormItem label="Upload document" mb="l">
        <GoabFileUploadInput
          onSelectFile={(detail) => uploadFile(detail, setBasicFiles)}
        />
      </GoabFormItem>
      {basicFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setBasicFiles)}
        />
      ))}

      <h3>Accepted file types</h3>
      <GoabFormItem label="Upload image" mb="l">
        <GoabFileUploadInput
          accept="image/*"
          onSelectFile={(detail) => uploadFile(detail, setImageFiles)}
        />
      </GoabFormItem>
      {imageFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setImageFiles)}
        />
      ))}
      <GoabFormItem label="Upload PDF" mb="l">
        <GoabFileUploadInput
          accept=".pdf"
          onSelectFile={(detail) => uploadFile(detail, setPdfFiles)}
        />
      </GoabFormItem>
      {pdfFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setPdfFiles)}
        />
      ))}

      <h3>Max file size</h3>
      <GoabFormItem label="Small file (100KB limit)" mb="l">
        <GoabFileUploadInput
          maxFileSize="100KB"
          onSelectFile={(detail) => uploadFile(detail, setSmallFiles)}
        />
      </GoabFormItem>
      {smallFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setSmallFiles)}
        />
      ))}
      <GoabFormItem label="Large file (50MB limit)" mb="l">
        <GoabFileUploadInput
          maxFileSize="50MB"
          onSelectFile={(detail) => uploadFile(detail, setLargeFiles)}
        />
      </GoabFormItem>
      {largeFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setLargeFiles)}
        />
      ))}

      <h3>Variants</h3>
      <GoabFormItem label="Button variant" mb="l">
        <GoabFileUploadInput
          variant="button"
          onSelectFile={(detail) => uploadFile(detail, setButtonFiles)}
        />
      </GoabFormItem>
      {buttonFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setButtonFiles)}
        />
      ))}
      <GoabFormItem label="Dragdrop variant" mb="l">
        <GoabFileUploadInput
          variant="dragdrop"
          onSelectFile={(detail) => uploadFile(detail, setDragdropFiles)}
        />
      </GoabFormItem>
      {dragdropFiles.map((f) => (
        <GoabFileUploadCard
          key={f.id}
          filename={f.filename}
          size={f.size}
          type={f.type}
          progress={f.progress}
          onDelete={(detail) => deleteFile(detail, setDragdropFiles)}
        />
      ))}

      <h2>File upload card</h2>

      <h3>Basic file upload card</h3>
      <GoabFileUploadCard
        filename="document.pdf"
        size={1024000}
        onDelete={(detail) => console.log("delete", detail)}
      />

      <h3>File types</h3>
      <GoabFileUploadCard
        filename="report.pdf"
        type="application/pdf"
        size={256000}
        onDelete={(detail) => console.log("delete", detail)}
      />
      <GoabFileUploadCard
        filename="photo.jpg"
        type="image/jpeg"
        size={1024000}
        onDelete={(detail) => console.log("delete", detail)}
      />
      <GoabFileUploadCard
        filename="data.csv"
        type="text/csv"
        size={48000}
        onDelete={(detail) => console.log("delete", detail)}
      />

      <h3>With upload progress</h3>
      <GoabFileUploadCard filename="image.png" size={2048000} progress={65} />

      <h3>Error state</h3>
      <GoabFileUploadCard
        filename="large-file.zip"
        size={104857600}
        error="File exceeds maximum size limit"
        onDelete={(detail) => console.log("delete", detail)}
      />
    </div>
  );
}
