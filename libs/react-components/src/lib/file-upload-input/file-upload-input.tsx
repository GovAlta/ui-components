import { ABGovFileUploadInputOnSelectFileDetail, ABGovFileUploadInputVariant } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  variant?: ABGovFileUploadInputVariant;
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
export interface ABGovFileUploadInputProps {
  variant?: ABGovFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (detail: ABGovFileUploadInputOnSelectFileDetail) => void;
}

export function ABGovFileUploadInput({
  variant,
  accept,
  maxFileSize,
  testId,
  onSelectFile,
}: ABGovFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ABGovFileUploadInputOnSelectFileDetail>).detail;
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

export default ABGovFileUploadInput;
