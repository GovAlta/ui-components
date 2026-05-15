import { DocsFileUploaderRoute } from "../../../routes/docs/file-uploader/file-uploader";
import type { PrRouteDefinition } from "../../route-manifest";

export default {
  type: "docs",
  id: "file-uploader",
  path: "docs/file-uploader",
  title: "File Uploader",
  component: DocsFileUploaderRoute,
} satisfies PrRouteDefinition;
