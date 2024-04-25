import { useEffect, useRef } from "react";

export type GoAFileUploadInputVariant = "dragdrop" | "button";

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  variant?: GoAFileUploadInputVariant;
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
export interface GoAFileUploadInputProps {
  variant?: GoAFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (file: File) => void;
}

export function GoAFileUploadInput({
  variant,
  accept,
  maxFileSize,
  testId,
  onSelectFile,
}: GoAFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      onSelectFile((e as CustomEvent).detail.file);
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

export default GoAFileUploadInput;
