import {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxfilesize?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-file-upload-input": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFileUploadInputProps {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (detail: GoabFileUploadInputOnSelectFileDetail) => void;
}

export function GoabFileUploadInput({
  variant,
  accept,
  maxFileSize,
  testId,
  onSelectFile,
}: GoabFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail;
      onSelectFile(detail);
    };
    current.addEventListener("_selectFile", handler);
    return () => {
      current.removeEventListener("_selectFile", handler);
    };
  }, [el, onSelectFile]);

  return (
    <goa-file-upload-input
      ref={el}
      variant={variant}
      accept={accept}
      maxfilesize={maxFileSize}
      testid={testId}
    />
  );
}

export default GoabFileUploadInput;
