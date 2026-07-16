import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { GoabText, GoabBadge, GoabCallout } from "@abgov/react-components";

type Status = "not-started" | "in-progress" | "completed" | "cannot-start";

type Task = {
  /** Route this task links to. A task with no slug is not clickable (locked). */
  slug?: string;
  name: string;
  status: Status;
  /** Extra line under the name, e.g. why a locked task can't be started yet. */
  hint?: string;
};

type Section = { title: string; tasks: Task[] };

// The service's tasks. Hardcoded for now; a real service would derive statuses
// from saved answers.
const sections: Section[] = [
  {
    title: "Before you start",
    tasks: [
      { slug: "eligibility", name: "Eligibility questions", status: "completed" },
      { slug: "terms", name: "Read terms of use", status: "completed" },
    ],
  },
  {
    title: "Prepare application",
    tasks: [
      {
        name: "Your contact details",
        status: "cannot-start",
        hint: "You need to complete the previous section before you can start this task.",
      },
      { name: "Your family", status: "cannot-start" },
      { name: "Verify your identity", status: "cannot-start" },
    ],
  },
  {
    title: "Schedule service",
    tasks: [
      { name: "Receive email confirmation", status: "cannot-start" },
      { name: "Choose date", status: "cannot-start" },
      { name: "Pay service fee", status: "cannot-start" },
    ],
  },
];

/** A section counts as done only when every task in it is done. */
const isSectionComplete = (section: Section) =>
  section.tasks.every((task) => task.status === "completed");

/**
 * "Cannot start yet" is muted text rather than a badge: a badge reads as a state
 * the user reached, and a locked task is one they have not.
 */
function TaskStatus({ status }: { status: Status }) {
  switch (status) {
    case "completed":
      return <GoabBadge type="success" content="Completed" />;
    case "in-progress":
      return <GoabBadge type="important" content="In progress" />;
    case "not-started":
      return <GoabBadge type="information" content="Not started" />;
    case "cannot-start":
      return <span style={{ color: "var(--goa-color-text-secondary)" }}>Cannot start yet</span>;
  }
}

function SectionCard({ section, index }: { section: Section; index: number }) {
  return (
    <div
      style={{
        border: "1px solid var(--goa-color-greyscale-200)",
        borderRadius: "var(--goa-border-radius-xl)",
        padding: "var(--goa-space-l) var(--goa-space-xl)",
        marginBottom: "var(--goa-space-l)",
      }}
    >
      <GoabText tag="h2" mt="none" mb="s">
        {index}. {section.title}
      </GoabText>

      {section.tasks.map((task, i) => {
        // Full-bleed row: the negative horizontal margin cancels the card's
        // padding so the hover background spans the whole card, and the whole
        // row is the link target.
        const rowStyle: CSSProperties = {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "var(--goa-space-m)",
          padding: "var(--goa-space-m) var(--goa-space-xl)",
          margin: "0 calc(-1 * var(--goa-space-xl))",
          borderTop: i > 0 ? "1px solid var(--goa-color-greyscale-100)" : "none",
          textDecoration: "none",
          color: "inherit",
        };

        const body = (
          <>
            <span>
              <span className="pf-task-name">{task.name}</span>
              {task.hint && (
                <span
                  style={{
                    display: "block",
                    marginTop: "var(--goa-space-3xs)",
                    color: "var(--goa-color-text-secondary)",
                  }}
                >
                  {task.hint}
                </span>
              )}
            </span>
            <TaskStatus status={task.status} />
          </>
        );

        return task.slug ? (
          <Link key={task.slug} to={task.slug} className="pf-task-row" style={rowStyle}>
            {body}
          </Link>
        ) : (
          <div key={task.name} style={rowStyle}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Task list (route "/"): the service's home page. It is the map of the whole
 * application -- every section, every task, and where the user is in each.
 */
export function TaskList() {
  const completedCount = sections.filter(isSectionComplete).length;
  const remaining = sections.length - completedCount;

  return (
    <div>
      <style>{`
        .pf-task-row { transition: background-color 0.12s ease; }
        .pf-task-row:hover,
        .pf-task-row:focus-visible { background-color: var(--goa-color-greyscale-100); }
        .pf-task-row:hover .pf-task-name,
        .pf-task-row:focus-visible .pf-task-name { text-decoration: underline; }
      `}</style>

      <GoabText tag="h1" mt="none" mb="xl">
        Apply for a service (demo)
      </GoabText>

      <GoabCallout type="important" heading="Application incomplete" mb="xl">
        You have completed {completedCount} of {sections.length} sections.
        {remaining > 0 && ` ${remaining} left to complete.`}
      </GoabCallout>

      {sections.map((section, i) => (
        <SectionCard key={section.title} section={section} index={i + 1} />
      ))}
    </div>
  );
}
