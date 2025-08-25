import {
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
export interface GoabFileUploadInputProps extends DataGridProps {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (detail: GoabFileUploadInputOnSelectFileDetail) => void;
}

export function GoabFileUploadInput(props: GoabFileUploadInputProps) {
  const [dataGridProps, {
    variant,
    accept,
    maxFileSize,
    testId,
    onSelectFile,
  }] = useDataGridProps(props);
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
      {...dataGridProps}
    />
  );
}

export default GoabFileUploadInput;
