# File uploader

Help users select and upload a file.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/file-upload-input

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accept` | string | (none) | No | Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf"). |
| `maxFileSize` | string | `5MB` | No | Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Files exceeding this will be rejected. |
| `testId` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | GoabFileUploadInputVariant | `dragdrop` | No | The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onSelectFile` | (detail: GoabFileUploadInputOnSelectFileDetail) => void | Callback fired when a valid file is selected or dropped. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accept` | string | (none) | No | Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf"). |
| `id` | string | (none) | No | Sets the id attribute on the file upload input element. |
| `maxFileSize` | string | `5MB` | No | Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Files exceeding this will be rejected. |
| `mb` | Spacing | (none) | No | Sets the bottom margin spacing token. |
| `ml` | Spacing | (none) | No | Sets the left margin spacing token. |
| `mr` | Spacing | (none) | No | Sets the right margin spacing token. |
| `mt` | Spacing | (none) | No | Sets the top margin spacing token. |
| `testId` | string | (none) | No | Sets the data-testid attribute for automated testing. |
| `variant` | GoabFileUploadInputVariant | `dragdrop` | No | The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onSelectFile` | (event: GoabFileUploadInputOnSelectFileDetail) => void | Emits when a file is selected. Emits the selected file details. |

---

## Web Components

Tag: `goa-file-upload-input`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `accept` | string | `*` | No | Accepted file types as a comma-separated list of MIME types or file extensions (e.g., "image/*,.pdf"). |
| `maxfilesize` | string | `5MB` | No | Maximum file size with unit (e.g., "5MB", "100KB", "1GB"). Defaults to 5MB. Files exceeding this will be rejected. |
| `testid` | string | (none) | No | Sets a data-testid attribute for automated testing. |
| `variant` | "dragdrop" \| "button" | `dragdrop` | No | The input display variant. "dragdrop" shows a drag-and-drop area, "button" shows a simple button. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_selectFile` | CustomEvent<{ file: File; event: Event }> | (none) |

---

## Usage guidance

### Other

- **[Do]** Use file upload input with file upload card for complete file upload experiences.
- **[Tip]** Validate as much as possible before the upload starts. File type, size, and other client-side checks should happen first so the file doesn't begin uploading until it's known to be valid. Once an upload is in progress, the only error a user should see on the file upload card is something like a network or server problem.

### Content

- **[Do]** Use additional helper text to provide instructions about accepted file types.
- **[Do]** Show maximum file size in the file drop zone.

---

## Related components

- [Form item](/components/form-item): Wraps an input control with a text label, requirement label, helper text, and error text.
