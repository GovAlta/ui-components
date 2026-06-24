import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { GoabText, GoabBadge, GoabCallout, GoabButton } from "@abgov/react-components";

type Status = "not-started" | "in-progress" | "completed";
type Task = { slug?: string; name: string; status: Status };
type Section = { title: string; tasks: Task[]; locked?: boolean; lockedNote?: string };

// Gallery content, styled as a real task list (see step-1-demo-spec.md).
// Statuses are illustrative, to show the badge states. Everything unlocked is a link
// (free-jump); the last section is locked to demo that state too.
const sections: Section[] = [
  {
    // A real multi-page task (an organized section with branching), to contrast
    // with the single-page pattern demos below.
    title: "Before you apply",
    tasks: [{ slug: "eligibility", name: "Confirm your eligibility", status: "not-started" }],
  },
  {
    title: "Question types",
    tasks: [
      { slug: "single-question", name: "Single question", status: "completed" },
      { slug: "multiple-questions", name: "Multiple questions on a page", status: "completed" },
      { slug: "details", name: "Question with Details", status: "in-progress" },
      { slug: "grouped-fields", name: "Grouped fields, one topic", status: "not-started" },
      { slug: "reveal", name: "Reveal", status: "not-started" },
      { slug: "content-before", name: "Content before the question", status: "not-started" },
      { slug: "file-upload", name: "File upload", status: "not-started" },
    ],
  },
  {
    title: "Repeating questions",
    tasks: [
      { slug: "inline-list", name: "Inline list", status: "not-started" },
      { slug: "modal-drawer", name: "Add in a modal", status: "not-started" },
      { slug: "drawer", name: "Add in a drawer", status: "not-started" },
      { slug: "multi-step", name: "Multi-step entry", status: "not-started" },
      { slug: "new-page", name: "New page per item, with branches", status: "not-started" },
    ],
  },
  {
    title: "Result pages",
    tasks: [
      { slug: "result-eligible", name: "Eligible", status: "not-started" },
      { slug: "result-not-eligible", name: "Not eligible", status: "not-started" },
      { slug: "result-submitted", name: "Submitted", status: "not-started" },
    ],
  },
  {
    title: "Review pages",
    tasks: [
      { slug: "review-editable", name: "Editable", status: "not-started" },
      { slug: "review-readonly", name: "Read-only", status: "not-started" },
      { slug: "review-question-types", name: "Question types", status: "not-started" },
    ],
  },
  {
    title: "Locked example",
    locked: true,
    lockedNote: "You need to complete the previous section before you can start this task.",
    tasks: [],
  },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "completed") return <GoabBadge type="success" content="Completed" />;
  if (status === "in-progress") return <GoabBadge type="important" content="In progress" />;
  return <GoabBadge type="information" content="Not started" />;
}

// Hand-built task-list section card -> the goab-task-list / task-list-item spec for Step 2.
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
      <GoabText tag="h2" mt="none" mb={section.locked ? "xs" : "s"}>
        {index}. {section.title}
      </GoabText>

      {section.locked ? (
        <GoabText mt="none" mb="none" color="secondary">{section.lockedNote}</GoabText>
      ) : (
        section.tasks.map((task, i) => {
          // Full-bleed clickable row: negative horizontal margin cancels the
          // card's padding so the hover background spans the whole card width,
          // and the whole row is the link target (click anywhere).
          const rowStyle: CSSProperties = {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--goa-space-m)",
            padding: "var(--goa-space-m) var(--goa-space-xl)",
            margin: "0 calc(-1 * var(--goa-space-xl))",
            borderTop: i > 0 ? "1px solid var(--goa-color-greyscale-100)" : "none",
            textDecoration: "none",
            color: "inherit",
          };
          return task.slug ? (
            <Link key={task.slug} to={task.slug} className="pf-task-row" style={rowStyle}>
              <span className="pf-task-name">{task.name}</span>
              <StatusBadge status={task.status} />
            </Link>
          ) : (
            <div key={task.name} style={rowStyle}>
              <span className="pf-task-name">{task.name}</span>
              <StatusBadge status={task.status} />
            </div>
          );
        })
      )}
    </div>
  );
}

export function TaskListHome() {
  return (
    <div>
      <style>{`
        .pf-task-row { transition: background-color 0.12s ease; }
        .pf-task-row:hover,
        .pf-task-row:focus-visible { background-color: var(--goa-color-greyscale-100); }
        .pf-task-row:hover .pf-task-name,
        .pf-task-row:focus-visible .pf-task-name { text-decoration: underline; }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--goa-space-s)",
          marginBottom: "var(--goa-space-2xs)",
        }}
      >
        <GoabText tag="h1" mt="none" mb="none">
          Apply for a [service]
        </GoabText>
        <GoabBadge type="information" content="Draft" />
      </div>
      <GoabText mt="xs" mb="xl" color="secondary">
        Your progress is saved automatically. You can return to complete this application at any time.
      </GoabText>

      <GoabCallout type="information" heading="2 sections left to complete" mb="xl">
        <div style={{ marginBottom: "var(--goa-space-xs)", color: "var(--goa-color-text-secondary)" }}>
          You have completed 1 of 3 sections
        </div>
        <Link to="single-question">Continue</Link>
      </GoabCallout>

      {sections.map((section, i) => (
        <SectionCard key={section.title} section={section} index={i + 1} />
      ))}

      <GoabText mt="l" mb="s" color="secondary">
        Complete all sections above to submit your application.
      </GoabText>
      <GoabButton type="primary" disabled>
        Submit application
      </GoabButton>
    </div>
  );
}
