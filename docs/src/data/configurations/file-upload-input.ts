/**
 * FileUploadInput Component Configurations
 *
 * File upload input allows users to select files.
 */

import type { ComponentConfigurations } from "./types";

const fileUploadScript = `
const inputs = document.querySelectorAll('goa-file-upload-input');

inputs.forEach(input => {
  const formItem = input.closest('goa-form-item');
  input.addEventListener('_selectFile', (e) => {
    const file = e.detail.file;
    const card = document.createElement('goa-file-upload-card');
    card.setAttribute('version', '2');
    card.setAttribute('filename', file.name);
    card.setAttribute('size', file.size);
    if (file.type) card.setAttribute('type', file.type);
    card.setAttribute('progress', '0');
    card.addEventListener('_delete', () => wrapper.remove());
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '1.5rem';
    wrapper.appendChild(card);
    formItem.after(wrapper);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        card.setAttribute('progress', '-1');
        clearInterval(interval);
      } else {
        card.setAttribute('progress', Math.round(progress).toString());
      }
    }, 300);
  });
});
`;

export const fileUploadInputConfigurations: ComponentConfigurations = {
  componentSlug: "file-upload-input",
  componentName: "File upload input",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic file upload",
      description: "Simple file selection input",
      code: {
        react: {
          ts: `type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

const [files, setFiles] = useState<UploadedFile[]>([]);

function handleFileChange(detail: GoabFileUploadInputOnSelectFileDetail) {
  const file = detail.file;
  setFiles((prev) => [
    ...prev,
    {
      id: \`\${file.name}-\${Date.now()}\`,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: -1,
    },
  ]);
}

function handleDelete(detail: GoabFileUploadOnDeleteDetail) {
  setFiles((prev) => prev.filter((f) => f.filename !== detail.filename));
}`,
          jsx: `<GoabFormItem label="Upload document" mb="l">
  <GoabFileUploadInput variant="dragdrop" onSelectFile={handleFileChange} />
</GoabFormItem>
{files.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={handleDelete}
  />
))}`,
        },
        angular: {
          ts: `export class ExampleComponent {
  files: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];

  handleFileChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    const file = detail.file;
    this.files = [
      ...this.files,
      {
        id: \`\${file.name}-\${Date.now()}\`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      },
    ];
  }

  handleDelete(detail: GoabFileUploadOnDeleteDetail) {
    this.files = this.files.filter((f) => f.filename !== detail.filename);
  }
}`,
          template: `<goab-form-item label="Upload document" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    (onSelectFile)="handleFileChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of files; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="handleDelete($event)"
>
</goab-file-upload-card>
}`,
        },
        webComponents: `<goa-form-item version="2" label="Upload document" mb="l">
  <goa-file-upload-input version="2"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "with-accept",
      name: "Accepted file types",
      description: "Restrict to specific file types",
      code: {
        react: {
          ts: `type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

const [imageFiles, setImageFiles] = useState<UploadedFile[]>([]);
const [pdfFiles, setPdfFiles] = useState<UploadedFile[]>([]);

function handleFileChange(
  detail: GoabFileUploadInputOnSelectFileDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  const file = detail.file;
  setFiles((prev) => [
    ...prev,
    {
      id: \`\${file.name}-\${Date.now()}\`,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: -1,
    },
  ]);
}

function handleDelete(
  detail: GoabFileUploadOnDeleteDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  setFiles((prev) => prev.filter((f) => f.filename !== detail.filename));
}`,
          jsx: `<GoabFormItem label="Upload image" mb="l">
  <GoabFileUploadInput
    accept="image/*"
    onSelectFile={(detail) => handleFileChange(detail, setImageFiles)}
  />
</GoabFormItem>
{imageFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setImageFiles)}
  />
))}
<GoabFormItem label="Upload PDF" mb="l">
  <GoabFileUploadInput
    accept=".pdf"
    onSelectFile={(detail) => handleFileChange(detail, setPdfFiles)}
  />
</GoabFormItem>
{pdfFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setPdfFiles)}
  />
))}`,
        },
        angular: {
          ts: `export class ExampleComponent {
  imageFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];
  pdfFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];

  handleImageChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.imageFiles = this.appendFile(this.imageFiles, detail);
  }

  handlePdfChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.pdfFiles = this.appendFile(this.pdfFiles, detail);
  }

  deleteImage(detail: GoabFileUploadOnDeleteDetail) {
    this.imageFiles = this.imageFiles.filter(
      (f) => f.filename !== detail.filename,
    );
  }

  deletePdf(detail: GoabFileUploadOnDeleteDetail) {
    this.pdfFiles = this.pdfFiles.filter((f) => f.filename !== detail.filename);
  }

  private appendFile<
    T extends {
      id: string;
      filename: string;
      size: number;
      type?: string;
      progress: number;
    },
  >(list: T[], detail: GoabFileUploadInputOnSelectFileDetail): T[] {
    const file = detail.file;
    return [
      ...list,
      {
        id: \`\${file.name}-\${Date.now()}\`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      } as T,
    ];
  }
}`,
          template: `<goab-form-item label="Upload image" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    accept="image/*"
    (onSelectFile)="handleImageChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of imageFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deleteImage($event)"
>
</goab-file-upload-card>
}
<goab-form-item label="Upload PDF" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    accept=".pdf"
    (onSelectFile)="handlePdfChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of pdfFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deletePdf($event)"
>
</goab-file-upload-card>
}`,
        },
        webComponents: `<goa-form-item version="2" label="Upload image" mb="l">
  <goa-file-upload-input version="2" accept="image/*"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Upload PDF" mb="l">
  <goa-file-upload-input version="2" accept=".pdf"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "max-file-size",
      name: "Max file size",
      description: "Custom file size limits",
      code: {
        react: {
          ts: `type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

const [smallFiles, setSmallFiles] = useState<UploadedFile[]>([]);
const [largeFiles, setLargeFiles] = useState<UploadedFile[]>([]);

function handleFileChange(
  detail: GoabFileUploadInputOnSelectFileDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  const file = detail.file;
  setFiles((prev) => [
    ...prev,
    {
      id: \`\${file.name}-\${Date.now()}\`,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: -1,
    },
  ]);
}

function handleDelete(
  detail: GoabFileUploadOnDeleteDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  setFiles((prev) => prev.filter((f) => f.filename !== detail.filename));
}`,
          jsx: `<GoabFormItem label="Small file (100KB limit)" mb="l">
  <GoabFileUploadInput
    maxFileSize="100KB"
    onSelectFile={(detail) => handleFileChange(detail, setSmallFiles)}
  />
</GoabFormItem>
{smallFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setSmallFiles)}
  />
))}
<GoabFormItem label="Large file (50MB limit)" mb="l">
  <GoabFileUploadInput
    maxFileSize="50MB"
    onSelectFile={(detail) => handleFileChange(detail, setLargeFiles)}
  />
</GoabFormItem>
{largeFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setLargeFiles)}
  />
))}`,
        },
        angular: {
          ts: `export class ExampleComponent {
  smallFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];
  largeFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];

  handleSmallChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.smallFiles = this.appendFile(this.smallFiles, detail);
  }

  handleLargeChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.largeFiles = this.appendFile(this.largeFiles, detail);
  }

  deleteSmall(detail: GoabFileUploadOnDeleteDetail) {
    this.smallFiles = this.smallFiles.filter(
      (f) => f.filename !== detail.filename,
    );
  }

  deleteLarge(detail: GoabFileUploadOnDeleteDetail) {
    this.largeFiles = this.largeFiles.filter(
      (f) => f.filename !== detail.filename,
    );
  }

  private appendFile<
    T extends {
      id: string;
      filename: string;
      size: number;
      type?: string;
      progress: number;
    },
  >(list: T[], detail: GoabFileUploadInputOnSelectFileDetail): T[] {
    const file = detail.file;
    return [
      ...list,
      {
        id: \`\${file.name}-\${Date.now()}\`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      } as T,
    ];
  }
}`,
          template: `<goab-form-item label="Small file (100KB limit)" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    maxFileSize="100KB"
    (onSelectFile)="handleSmallChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of smallFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deleteSmall($event)"
>
</goab-file-upload-card>
}
<goab-form-item label="Large file (50MB limit)" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    maxFileSize="50MB"
    (onSelectFile)="handleLargeChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of largeFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deleteLarge($event)"
>
</goab-file-upload-card>
}`,
        },
        webComponents: `<goa-form-item version="2" label="Small file (100KB limit)" mb="l">
  <goa-file-upload-input version="2" maxfilesize="100KB"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Large file (50MB limit)" mb="l">
  <goa-file-upload-input version="2" maxfilesize="50MB"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "variants",
      name: "Variants",
      description: "Different visual styles",
      code: {
        react: {
          ts: `type UploadedFile = {
  id: string;
  filename: string;
  size: number;
  type?: string;
  progress: number;
};

const [buttonFiles, setButtonFiles] = useState<UploadedFile[]>([]);
const [dragdropFiles, setDragdropFiles] = useState<UploadedFile[]>([]);

function handleFileChange(
  detail: GoabFileUploadInputOnSelectFileDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  const file = detail.file;
  setFiles((prev) => [
    ...prev,
    {
      id: \`\${file.name}-\${Date.now()}\`,
      filename: file.name,
      size: file.size,
      type: file.type,
      progress: -1,
    },
  ]);
}

function handleDelete(
  detail: GoabFileUploadOnDeleteDetail,
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
) {
  setFiles((prev) => prev.filter((f) => f.filename !== detail.filename));
}`,
          jsx: `<GoabFormItem label="Button variant" mb="l">
  <GoabFileUploadInput
    variant="button"
    onSelectFile={(detail) => handleFileChange(detail, setButtonFiles)}
  />
</GoabFormItem>
{buttonFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setButtonFiles)}
  />
))}
<GoabFormItem label="Dragdrop variant" mb="l">
  <GoabFileUploadInput
    variant="dragdrop"
    onSelectFile={(detail) => handleFileChange(detail, setDragdropFiles)}
  />
</GoabFormItem>
{dragdropFiles.map((f) => (
  <GoabFileUploadCard
    key={f.id}
    filename={f.filename}
    size={f.size}
    type={f.type}
    progress={f.progress}
    onDelete={(detail) => handleDelete(detail, setDragdropFiles)}
  />
))}`,
        },
        angular: {
          ts: `export class ExampleComponent {
  buttonFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];
  dragdropFiles: {
    id: string;
    filename: string;
    size: number;
    type?: string;
    progress: number;
  }[] = [];

  handleButtonChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.buttonFiles = this.appendFile(this.buttonFiles, detail);
  }

  handleDragdropChange(detail: GoabFileUploadInputOnSelectFileDetail) {
    this.dragdropFiles = this.appendFile(this.dragdropFiles, detail);
  }

  deleteButton(detail: GoabFileUploadOnDeleteDetail) {
    this.buttonFiles = this.buttonFiles.filter(
      (f) => f.filename !== detail.filename,
    );
  }

  deleteDragdrop(detail: GoabFileUploadOnDeleteDetail) {
    this.dragdropFiles = this.dragdropFiles.filter(
      (f) => f.filename !== detail.filename,
    );
  }

  private appendFile<
    T extends {
      id: string;
      filename: string;
      size: number;
      type?: string;
      progress: number;
    },
  >(list: T[], detail: GoabFileUploadInputOnSelectFileDetail): T[] {
    const file = detail.file;
    return [
      ...list,
      {
        id: \`\${file.name}-\${Date.now()}\`,
        filename: file.name,
        size: file.size,
        type: file.type,
        progress: -1,
      } as T,
    ];
  }
}`,
          template: `<goab-form-item label="Button variant" mb="l">
  <goab-file-upload-input
    variant="button"
    (onSelectFile)="handleButtonChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of buttonFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deleteButton($event)"
>
</goab-file-upload-card>
}
<goab-form-item label="Dragdrop variant" mb="l">
  <goab-file-upload-input
    variant="dragdrop"
    (onSelectFile)="handleDragdropChange($event)"
  >
  </goab-file-upload-input>
</goab-form-item>
@for (f of dragdropFiles; track f.id) {
<goab-file-upload-card
  [filename]="f.filename"
  [size]="f.size"
  [type]="f.type"
  [progress]="f.progress"
  (onDelete)="deleteDragdrop($event)"
>
</goab-file-upload-card>
}`,
        },
        webComponents: `<goa-form-item version="2" label="Button variant" mb="l">
  <goa-file-upload-input version="2" variant="button"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Dragdrop variant" mb="l">
  <goa-file-upload-input version="2" variant="dragdrop"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
  ],
};
