import {
  DataAttributes,
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxfilesize?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabFileUploadInputProps extends DataAttributes {
  /**
   * The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button.
   * @default "dragdrop"
   */
  variant?: GoabFileUploadInputVariant;
  /**
   * Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf").
   * @default "*"
   */
  accept?: string;
  /**
   * Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Defaults to 5MB. Files exceeding this will be rejected.
   * @default "5MB"
   */
  maxFileSize?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  onSelectFile: (detail: GoabFileUploadInputOnSelectFileDetail) => void;
}

export function GoabFileUploadInput({
  onSelectFile,
  ...rest
}: GoabFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail;
      onSelectFile({ ...detail, event: e });
    };
    current.addEventListener("_selectFile", handler);
    return () => {
      current.removeEventListener("_selectFile", handler);
    };
  }, [el, onSelectFile]);

  return (
    <goa-file-upload-input ref={el} {..._props} />
  );
}

export default GoabFileUploadInput;
