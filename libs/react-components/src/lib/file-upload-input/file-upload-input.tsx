import {
  DataAttributes,
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadInputVariant,
} from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxfilesize?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-file-upload-input": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

/* eslint-disable-next-line */
export interface GoabFileUploadInputProps extends DataAttributes {
  variant?: GoabFileUploadInputVariant;
  accept?: string;
  maxFileSize?: string;
  testId?: string;
  onSelectFile: (detail: GoabFileUploadInputOnSelectFileDetail) => void;
}

export function GoabFileUploadInput({
  onSelectFile,
  ...rest
}: GoabFileUploadInputProps) {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) return;

    const current = el.current;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<GoabFileUploadInputOnSelectFileDetail>).detail;
      onSelectFile({ ...detail, event: e });
    };
    current.addEventListener("_selectFile", handler);
    return () => {
      current.removeEventListener("_selectFile", handler);
    };
  }, [el, onSelectFile]);

  return (
    <goa-file-upload-input ref={el} {..._props} />
  );
}

export default GoabFileUploadInput;
