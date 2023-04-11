export type BadgeType =
  | "success"
  | "warning"
  | "information"
  | "emergency"
  | "inactive"
  | "dark"
  | "midtone"
  | "light";

export interface Uploader {
  upload: (url: string | ArrayBuffer) => void;
  abort: () => void;
}

export interface Upload {
  file: File;
  uploader: Uploader;
}
