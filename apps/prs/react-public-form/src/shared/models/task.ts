export type TaskStatus = "not-started" | "in-progress" | "completed" | "cannot-start";
export type Task = {
  /** Route this task links to. A task with no slug is not clickable (locked). */
  slug?: string;
  name: string;
  status: TaskStatus;
  /** Extra line under the name, e.g. why a locked task can't be started yet. */
  hint?: string;
};
export type TaskSection = { title: string; tasks: Task[] };
