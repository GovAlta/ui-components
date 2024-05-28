import {
  GoABFileUploadInputOnSelectFileDetail,
  GoABFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  variant?: GoABFileUploadInputVariant;
  accept?: string;
  maxfilesize?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-file-upload-input": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABFileUploadInputProps {
  variant?: GoABFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (detail: GoABFileUploadInputOnSelectFileDetail) => void;
}

export function GoABFileUploadInput({
  variant,
  accept,
  maxFileSize,
  testId,
  onSelectFile,
}: GoABFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoABFileUploadInputOnSelectFileDetail>).detail;
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
      data-testid={testId}
    />
  );
}

export default GoABFileUploadInput;
