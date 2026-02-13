import { useState, useRef, useEffect } from "react";
import { GoabxFormItem, GoabxFileUploadInput, GoabxFileUploadCard } from "@abgov/react-components/experimental";
import { GoabDetails } from "@abgov/react-components";

type UploadedFile = {
  name: string;
  size: number;
  type: string;
  url: string; // Blob URL for preview/download
};

/**
 * Page 6: Upload ID
 *
 * File upload for personal identification card.
 * Uses GoabxFileUploadCard to display uploaded file.
 * Dispatches _change event for public form to capture the filename.
 * Heading comes from outline.props automatically.
 */
export function UploadId() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // When file changes, dispatch _change event for public form
  useEffect(() => {
    if (inputRef.current) {
      // Store file data as JSON string (includes blob URL for preview in review summary)
      const fileData = uploadedFile
        ? JSON.stringify({
            name: uploadedFile.name,
            url: uploadedFile.url,
            size: uploadedFile.size,
            type: uploadedFile.type,
          })
        : "";

      // Public form listens for _change events with { name, value } detail
      const event = new CustomEvent("_change", {
        bubbles: true,
        detail: {
          name: "idDocument",
          value: fileData,
        },
      });
      inputRef.current.dispatchEvent(event);
    }
  }, [uploadedFile]);

  const handleSelectFile = (detail: { file: File }) => {
    const file = detail.file;
    if (file) {
      // Create blob URL for preview/download in review summary
      const blobUrl = URL.createObjectURL(file);
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        url: blobUrl,
      });
      // In production: upload file to backend and store permanent URL instead
    }
  };

  const handleDelete = () => {
    // Revoke the blob URL to free memory
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }
    setUploadedFile(null);
  };

  return (
    <div className="form-fields">
      <GoabxFormItem label="" helpText={!uploadedFile ? "Maximum file size is 10MB. Accepted formats: JPG, PNG, PDF" : ""}>
        {/* Text input (visually hidden) to capture filename for public form */}
        <input
          ref={inputRef}
          type="text"
          name="idDocument"
          data-pf-item=""
          value={uploadedFile ? JSON.stringify({ name: uploadedFile.name, url: uploadedFile.url }) : ""}
          onChange={() => {}} // Controlled by state
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            border: 0,
          }}
          aria-hidden="true"
          tabIndex={-1}
        />

        {!uploadedFile ? (
          <GoabxFileUploadInput
            accept=".jpg,.jpeg,.png,.pdf"
            maxFileSize="10MB"
            onSelectFile={handleSelectFile}
          />
        ) : (
          <GoabxFileUploadCard
            filename={uploadedFile.name}
            size={uploadedFile.size}
            type={uploadedFile.type}
            onDelete={handleDelete}
          />
        )}
      </GoabxFormItem>

      <GoabDetails heading="What can I use as personal identification?">
        <p>You can upload any government-issued photo ID, such as:</p>
        <ul>
          <li>Driver's licence</li>
          <li>Passport</li>
          <li>Provincial ID card</li>
          <li>Permanent resident card</li>
        </ul>
        <p>
          Make sure the image is clear and all text is readable. Both sides of
          the ID may be required.
        </p>
      </GoabDetails>
    </div>
  );
}
