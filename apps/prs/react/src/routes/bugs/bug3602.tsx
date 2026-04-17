import { useState, type Dispatch, type SetStateAction } from "react";
import { GoabFileUploadInputOnSelectFileDetail } from "@abgov/ui-components-common";
import {
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFormItem,
} from "@abgov/react-components";

type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

export function Bug3602Route() {
  const [smallFiles, setSmallFiles] = useState<UploadedFile[]>([]);
  const [largeFiles, setLargeFiles] = useState<UploadedFile[]>([]);

  function handleFileChange(
    detail: GoabFileUploadInputOnSelectFileDetail,
    setFiles: Dispatch<SetStateAction<UploadedFile[]>>,
  ) {
    const file = detail.file;
    setFiles((prev) => [
      ...prev,
      {
        id: `${file.name}-${Date.now()}`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      },
    ]);
  }

  return (
    <>
      <h1>3602 FileUploadInput and FileUploadCard Improvements</h1>
      <div>
        <GoabFormItem label="Small file (100KB limit)">
          <GoabFileUploadInput
            maxFileSize="100KB"
            onSelectFile={(detail) => handleFileChange(detail, setSmallFiles)}
          />
        </GoabFormItem>
        <div style={{ paddingTop: "0.75rem", paddingBottom: "2rem" }}>
          {smallFiles.map((f) => (
            <GoabFileUploadCard
              key={f.id}
              filename={f.filename}
              size={f.size}
              type={f.type}
              progress={f.progress}
              onDelete={() => setSmallFiles((prev) => prev.filter((item) => item.id !== f.id))}
            />
          ))}
        </div>
        <GoabFormItem label="Large file (50MB limit)">
          <GoabFileUploadInput
            maxFileSize="50MB"
            onSelectFile={(detail) => handleFileChange(detail, setLargeFiles)}
          />
        </GoabFormItem>
        <div style={{ paddingTop: "0.75rem", paddingBottom: "2rem" }}>
          {largeFiles.map((f) => (
            <GoabFileUploadCard
              key={f.id}
              filename={f.filename}
              size={f.size}
              type={f.type}
              progress={f.progress}
              onDelete={() => setLargeFiles((prev) => prev.filter((item) => item.id !== f.id))}
            />
          ))}
        </div>
      </div>
    </>
  );
}
