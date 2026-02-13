import { PFState } from "@abgov/ui-components-common";

/**
 * Views in the public form application.
 * Three-level hierarchy: my-applications → task-list → task-n
 */
export type View =
  | "start"
  | "my-applications"
  | "task-list"
  | "task-1"
  | "task-2"
  | "task-3"
  | "confirmation"
  | "results"
  | "ineligible";

/**
 * Application status lifecycle.
 * - not-started: Created but no tasks begun
 * - in-progress: At least one task has been started
 * - submitted: Application fully submitted
 */
export type ApplicationStatus = "not-started" | "in-progress" | "submitted";

/**
 * A single application instance.
 * Users can have multiple applications (drafts, submitted, etc.)
 */
export type Application = {
  id: string;
  referenceId: string; // Generated at creation (e.g., "APP-7X2K9M")
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;

  // Task state preservation (for resume)
  task1State: PFState | null;
  task2State: PFState | null;
  task3State: PFState | null;

  // Explicit completion tracking (set when "Submit section" clicked)
  task1Complete: boolean;
  task2Complete: boolean;
  task3Complete: boolean;
};

/**
 * Status for individual tasks within an application.
 */
export type TaskStatus = "not-started" | "in-progress" | "complete";

/**
 * Generate a short reference ID (e.g., "7X2K9M").
 * Uses base36 (0-9, A-Z) for readability.
 */
function generateReferenceId(): string {
  // Use timestamp + random to ensure uniqueness
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  // Take last 4 of timestamp + 3 random = 7 chars (e.g., "1234ABC")
  return timestamp.slice(-4) + random.slice(0, 3);
}

/**
 * Create a new application with default values.
 */
export function createApplication(): Application {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    referenceId: generateReferenceId(),
    status: "not-started",
    createdAt: now,
    updatedAt: now,
    task1State: null,
    task2State: null,
    task3State: null,
    task1Complete: false,
    task2Complete: false,
    task3Complete: false,
  };
}
