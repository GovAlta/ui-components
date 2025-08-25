import {
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps {
  ref: React.RefObject<HTMLElement | null>;
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-file-upload-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFileUploadCardProps extends DataGridProps {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  testId?: string;
  error?: string;
  onDelete?: (detail: GoabFileUploadOnDeleteDetail) => void;
  onCancel?: (detail: GoabFileUploadOnCancelDetail) => void;
}

export function GoabFileUploadCard(props: GoabFileUploadCardProps) {
  const [dataGridProps, {
    filename,
    size,
    type,
    progress,
    error,
    testId,
    onDelete,
    onCancel
  }] = useDataGridProps(props);
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const deleteHandler = () => onDelete?.({ filename });
    const cancelHandler = () => onCancel?.({ filename });
    current.addEventListener("_delete", deleteHandler);
    current.addEventListener("_cancel", cancelHandler);
    return () => {
      current.removeEventListener("_delete", deleteHandler);
      current.removeEventListener("_cancel", cancelHandler);
    };
  }, [el, onDelete, onCancel]);

  return (
    <goa-file-upload-card
      ref={el}
      filename={filename}
      size={size}
      type={type}
      progress={progress}
      error={error}
      testid={testId}
      {...dataGridProps}
    />
  );
}

export default GoabFileUploadCard;
