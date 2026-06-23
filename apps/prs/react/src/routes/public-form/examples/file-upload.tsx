import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabFileUploadInput,
  GoabFileUploadCard,
  GoabDetails,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

type UploadedFile = { name: string; size: number; type: string };

function validate(file: UploadedFile | null): FieldError[] {
  return file ? [] : [{ fieldId: "idDocument", text: "Upload a copy of your ID" }];
}

/**
 * File upload.
 *
 * Drag-and-drop upload with constraints (max 10MB; JPG, PNG, PDF) and a Details
 * for help. Selecting a file swaps the dropzone for a file card with a remove
 * action. Validates on submit (a file is required).
 *
 * Note: GoabFileUploadInput has no `error` prop, so the required-file error can
 * only surface via the form item message + summary, not a red dropzone. Minor
 * gap for Vanessa.
 */
export function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (detail: { file: File }) => {
    const next = { name: detail.file.name, size: detail.file.size, type: detail.file.type };
    setFile(next);
    if (submitted) setErrors(validate(next));
  };

  const handleDelete = () => {
    setFile(null);
    if (submitted) setErrors(validate(null));
  };

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(file);
    setErrors(found);
    if (found.length === 0) navigate("/public-form");
  };

  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Upload your ID"
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={errors}
      >
        <GoabFormItem
          label=""
          id="idDocument"
          helpText="Maximum file size is 10MB. Accepted formats: JPG, PNG, PDF"
          error={errors.find((e) => e.fieldId === "idDocument")?.text}
        >
          {file ? (
            <GoabFileUploadCard
              filename={file.name}
              size={file.size}
              type={file.type}
              onDelete={handleDelete}
            />
          ) : (
            <GoabFileUploadInput
              variant="dragdrop"
              accept=".jpg,.jpeg,.png,.pdf"
              maxFileSize="10MB"
              onSelectFile={handleSelect}
            />
          )}
        </GoabFormItem>

        <GoabDetails heading="What can I use as ID?" mt="l">
          <p>You can upload any government-issued photo ID, such as:</p>
          <ul>
            <li>Driver's licence</li>
            <li>Passport</li>
            <li>Provincial ID card</li>
            <li>Permanent resident card</li>
          </ul>
          <p>Make sure the image is clear and all the text is readable.</p>
        </GoabDetails>
      </FormSet>
    </PublicFormLayout>
  );
}
