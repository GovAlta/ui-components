import {
  DataAttributes,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
  testid?: string;
}

/* eslint-disable-next-line */
export interface GoabFileUploadCardProps extends DataAttributes {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  testId?: string;
  error?: string;
  onDelete?: (detail: GoabFileUploadOnDeleteDetail) => void;
  onCancel?: (detail: GoabFileUploadOnCancelDetail) => void;
}

export function GoabFileUploadCard({
  onDelete,
  onCancel,
  filename,
  ...rest
}: GoabFileUploadCardProps) {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>({ filename, ...rest }, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const deleteHandler = (event: Event) => onDelete?.({ filename, event });
    const cancelHandler = (event: Event) => onCancel?.({ filename, event });
    current.addEventListener("_delete", deleteHandler);
    current.addEventListener("_cancel", cancelHandler);
    return () => {
      current.removeEventListener("_delete", deleteHandler);
      current.removeEventListener("_cancel", cancelHandler);
    };
  }, [el, onDelete, onCancel, filename]);

  return (
    <goa-file-upload-card ref={el} {..._props} />
  );
}

export default GoabFileUploadCard;
