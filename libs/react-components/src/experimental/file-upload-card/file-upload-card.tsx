import {
  DataAttributes,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps {
  filename: string;
  size: number;
  type?: string;
  progress?: number;
  error?: string;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-file-upload-card": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

/* eslint-disable-next-line */
export interface GoabxFileUploadCardProps extends DataAttributes {
  /**
   * The name of the uploaded file to display.
   * @required
   */
  filename: string;
  /**
   * The file size in bytes. Displayed in a human-readable format (KB, MB).
   * @required
   */
  size: number;
  /**
   * The MIME type of the file. Used to determine the file type icon.
   * @default ""
   */
  type?: string;
  /**
   * Upload progress percentage from 0-100. Use -1 to indicate upload is complete.
   * @default -1
   */
  progress?: number;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Error message to display. When set, the card shows an error state with a cancel button.
   * @default ""
   */
  error?: string;
  onDelete?: (detail: GoabFileUploadOnDeleteDetail) => void;
  onCancel?: (detail: GoabFileUploadOnCancelDetail) => void;
  version?: string;
}

export function GoabxFileUploadCard({
  onDelete,
  onCancel,
  filename,
  version = "2",
  ...rest
}: GoabxFileUploadCardProps) {
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

  return <goa-file-upload-card ref={el} {..._props} version={version} />;
}

export default GoabxFileUploadCard;
