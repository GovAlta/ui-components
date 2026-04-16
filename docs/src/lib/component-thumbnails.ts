// Slug-to-filename mapping for component thumbnails that don't match their slug
const THUMBNAIL_MAP: Record<string, string> = {
  "app-header": "header",
  icon: "icons",
  input: "text-input",
  "checkbox-list": "checkbox-group",
  "circular-progress": "circular-progress-indicator",
  "linear-progress": "linear-progress-indicator",
  notification: "notification-banner",
  skeleton: "skeleton-loader",
  "radio-group": "radio",
  "file-upload-input": "file-uploader",
  "link-button": "link",
  "page-block": "block",
};

export function getThumbnailPath(slug: string): string {
  const filename = THUMBNAIL_MAP[slug] || slug;
  return `/images/component-thumbnails/${filename}.svg`;
}
