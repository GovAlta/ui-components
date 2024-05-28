import {
  GoABFileUploadOnCancelDetail,
  GoABFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";

interface WCProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-file-upload-card": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface GoABFileUploadCardProps {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  testId: string;
  error?: string;
  onDelete?: (detail: GoABFileUploadOnDeleteDetail) => void;
  onCancel?: (detail: GoABFileUploadOnCancelDetail) => void;
}

export function GoABFileUploadCard({
  filename,
  size,
  type,
  progress,
  error,
  testId,
  onDelete,
  onCancel,
}: GoABFileUploadCardProps) {
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
      data-testid={testId}
    />
  );
}

export default GoABFileUploadCard;
