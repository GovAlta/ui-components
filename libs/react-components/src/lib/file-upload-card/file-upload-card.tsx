import {
  DataGridProps,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps {
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
      "goa-file-upload-card": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
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
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["onDelete", "onCancel"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const deleteHandler = () => props.onDelete?.({ filename: props.filename });
    const cancelHandler = () => props.onCancel?.({ filename: props.filename });
    current.addEventListener("_delete", deleteHandler);
    current.addEventListener("_cancel", cancelHandler);
    return () => {
      current.removeEventListener("_delete", deleteHandler);
      current.removeEventListener("_cancel", cancelHandler);
    };
  }, [el, props.onDelete, props.onCancel, props.filename]);

  return (
    <goa-file-upload-card ref={el} {..._props} />
  );
}

export default GoabFileUploadCard;
