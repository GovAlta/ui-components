# File Upload Card

Display uploaded file with actions.

**Status:** stable | **Category:** Inputs And Actions | **Docs:** https://design.alberta.ca/components/file-upload-card

---

## React

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string | — | No | Error message to display. When set, the card shows an error state with a cancel button. |
| `filename` | string | — | Yes | The name of the uploaded file to display. |
| `progress` | number | `-1` | No | Upload progress percentage from 0-100. Use -1 to indicate upload is complete. |
| `size` | number | — | Yes | The file size in bytes. Displayed in a human-readable format (KB, MB). |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | string | — | No | The MIME type of the file. Used to determine the file type icon. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onCancel` | (detail: GoabFileUploadOnCancelDetail) => void | Callback fired when the user clicks the cancel button during file upload. |
| `onDelete` | (detail: GoabFileUploadOnDeleteDetail) => void | Callback fired when the user clicks the remove button on an uploaded file. |

---

## Angular

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string | — | No | Error message to display. When set, the card shows an error state with a cancel button. |
| `filename` | string | — | Yes | The name of the uploaded file to display. |
| `progress` | number | — | No | Upload progress percentage from 0-100. Use -1 to indicate upload is complete. |
| `size` | number | — | Yes | The file size in bytes. Displayed in a human-readable format (KB, MB). |
| `testId` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | string | — | No | The MIME type of the file. Used to determine the file type icon. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onCancel` | (event: GoabFileUploadOnCancelDetail) => void | Emits when the user cancels a file upload. Emits a GoabFileUploadOnCancelDetail object with the filename. |
| `onDelete` | (event: GoabFileUploadOnDeleteDetail) => void | Emits when the user removes an uploaded file. Emits a GoabFileUploadOnDeleteDetail object with the filename. |

---

## Web Components

Tag: `goa-file-upload-card`

### Attributes

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `error` | string | — | No | Error message to display. When set, the card shows an error state with a cancel button. |
| `filename` | string | — | Yes | The name of the uploaded file to display. |
| `progress` | number | `-1` | No | Upload progress percentage from 0-100. Use -1 to indicate upload is complete. |
| `size` | number | — | Yes | The file size in bytes. Displayed in a human-readable format (KB, MB). |
| `testid` | string | — | No | Sets a data-testid attribute for automated testing. |
| `type` | string | — | No | The MIME type of the file. Used to determine the file type icon. |
| `version` | "1" | "2" | `1` | No | Design system version for styling. |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `_cancel` | CustomEvent |  |
| `_delete` | CustomEvent |  |

---

## Usage guidance

### Other

- ✅ **Do:** Use file upload input with file upload card for complete file upload experiences.
- 💡 **Tip:** Validate as much as possible before the upload starts. File type, size, and other client-side checks should happen first so the file doesn't begin uploading until it's known to be valid. Once an upload is in progress, the only error a user should see on the file upload card is something like a network or server problem.

---

## Related components

- [File uploader](/components/file-upload-input): Help users select and upload a file.
