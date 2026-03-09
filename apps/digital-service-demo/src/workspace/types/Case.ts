// Workspace Case type - adapted for worker workspace display
export interface WorkspaceCase {
  [key: string]: unknown;
  id: string;
  name: string;
  referenceNumber: string;
  status: "information" | "success" | "important" | "emergency";
  statusText: string;
  submittedAt: string;
  assignedWorker: string | null;
  citizenEmail: string | null;
  formType: string;
}
