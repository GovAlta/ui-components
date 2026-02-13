import { useState } from "react";
import {
  GoabxCallout,
  GoabxBadge,
  GoabxCheckbox,
  GoabxFormItem,
} from "@abgov/react-components/experimental";
import { GoabButton, GoabText } from "@abgov/react-components";
import { Application, TaskStatus } from "../types";

// Simple action link styled like GoabxLink (for onClick handlers)
function ActionLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: 0,
        border: "none",
        background: "none",
        color: "var(--goa-color-interactive-default)",
        font: "var(--goa-typography-body-m)",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

type TaskListPageProps = {
  application: Application;
  onStartTask: (taskNumber: 1 | 2 | 3) => void;
  onSubmitApplication: () => void;
  onBackToDashboard: () => void;
  canSubmit: boolean;
};

function getTaskStatus(
  hasState: boolean,
  isComplete: boolean
): TaskStatus {
  if (isComplete) return "complete";
  if (hasState) return "in-progress";
  return "not-started";
}

// ============================================
// Task Item Component
// ============================================
type TaskItemProps = {
  name: string;
  status: TaskStatus | "locked";
  onClick?: () => void;
  isLast?: boolean;
};

function TaskItem({ name, status, onClick, isLast }: TaskItemProps) {
  const isLocked = status === "locked";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: isLast ? "none" : "1px solid var(--goa-color-greyscale-100)",
        padding: "12px 16px 8px 16px",
        minHeight: "48px",
        cursor: isLocked ? "default" : "pointer",
        backgroundColor: !isLocked && isHovered ? "var(--goa-color-greyscale-50)" : "transparent",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={() => !isLocked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isLocked && onClick?.()}
      role={isLocked ? undefined : "button"}
      tabIndex={isLocked ? undefined : 0}
      onKeyDown={(e) => {
        if (!isLocked && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Task name */}
      <span
        style={{
          fontSize: "18px",
          lineHeight: "24px",
          color: isLocked
            ? "var(--goa-color-text-default)"
            : isHovered
              ? "var(--goa-color-interactive-hover)"
              : "var(--goa-color-interactive-default)",
          textDecoration: isLocked ? "none" : "underline",
          transition: "color 0.15s ease",
        }}
      >
        {name}
      </span>

      {/* Status indicator */}
      {status === "not-started" && (
        <GoabxBadge type="archived" content="Not started" emphasis="subtle" />
      )}
      {status === "in-progress" && (
        <GoabxBadge type="important" content="In progress" emphasis="subtle" />
      )}
      {status === "complete" && (
        <GoabxBadge type="success" content="Completed" emphasis="subtle" />
      )}
      {status === "locked" && (
        <span
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "var(--goa-color-text-secondary)",
          }}
        >
          Cannot start yet
        </span>
      )}
    </div>
  );
}

// ============================================
// Task Group Component
// ============================================
type TaskGroupProps = {
  number: number;
  title: string;
  locked?: boolean;
  lockedMessage?: string;
  children?: React.ReactNode;
};

function TaskGroup({ number, title, locked, lockedMessage, children }: TaskGroupProps) {
  return (
    <div
      style={{
        border: "1px solid var(--goa-color-greyscale-150)",
        borderRadius: "12px",
        backgroundColor: "var(--goa-color-greyscale-white)",
        padding: "32px",
      }}
    >
      {/* Group heading */}
      <GoabText as="h2" size="heading-s" mt="none" mb="none">
        {number}. {title}
      </GoabText>

      {/* Task items or locked message */}
      {locked ? (
        <div style={{ marginTop: "var(--goa-space-m)" }}>
          <span
            style={{
              fontSize: "16px",
              lineHeight: "22px",
              color: "var(--goa-color-text-secondary)",
            }}
          >
            {lockedMessage || "You need to complete the previous section before you can start this task."}
          </span>
        </div>
      ) : (
        <div style={{ marginTop: "var(--goa-space-m)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================
// Status Callout Component
// ============================================
type StatusCalloutProps = {
  completedCount: number;
  totalCount: number;
  hasAnyProgress: boolean; // True if any task has been started or completed
  onContinue?: () => void;
};

function StatusCallout({ completedCount, totalCount, hasAnyProgress, onContinue }: StatusCalloutProps) {
  const allComplete = completedCount === totalCount;
  const noneComplete = completedCount === 0;

  if (allComplete) {
    return (
      <GoabxCallout type="success" heading="Application complete" emphasis="low">
        You have completed all sections of this application.
        <br />
        <a href="#submit-section" style={{ color: "inherit" }}>Submit your application below</a>
      </GoabxCallout>
    );
  }

  if (noneComplete && !hasAnyProgress) {
    return (
      <GoabxCallout type="information" heading={`You have ${totalCount} sections to complete`} emphasis="low">
        <ActionLink onClick={() => onContinue?.()}>Start first section</ActionLink>
      </GoabxCallout>
    );
  }

  // Some progress made but not all sections complete
  const headingText = completedCount === 0
    ? "No sections complete"
    : `${completedCount} ${completedCount === 1 ? "section" : "sections"} complete`;
  return (
    <GoabxCallout
      type="information"
      heading={headingText}
      emphasis="low"
    >
      You have completed {completedCount} of {totalCount} sections
    </GoabxCallout>
  );
}

// ============================================
// Main TaskListPage Component
// ============================================
export function TaskListPage({
  application,
  onStartTask,
  onSubmitApplication,
  onBackToDashboard,
  canSubmit,
}: TaskListPageProps) {
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);

  const task1Status = getTaskStatus(!!application.task1State, application.task1Complete);
  const task2Status = getTaskStatus(!!application.task2State, application.task2Complete);
  const task3Status = getTaskStatus(!!application.task3State, application.task3Complete);

  // Section 1 is complete when tasks 2 and 3 are complete
  const section1Complete = application.task2Complete && application.task3Complete;
  // Section 2 is complete when task 1 is complete
  const section2Complete = application.task1Complete;

  // Count completed sections
  const completedSections = [section1Complete, section2Complete].filter(Boolean).length;
  const totalSections = 2;

  // Check if any task has been started or completed
  const hasAnyProgress = !!(application.task1State || application.task2State || application.task3State);

  // Find the next task to continue (Section 1: tasks 2,3 then Section 2: task 1)
  const getNextTask = (): 1 | 2 | 3 => {
    if (!application.task2Complete) return 2;
    if (!application.task3Complete) return 3;
    return 1; // Section 2
  };

  const handleSubmit = () => {
    if (!confirmChecked) {
      setShowConfirmError(true);
      return;
    }
    setShowConfirmError(false);
    onSubmitApplication();
  };

  const handleConfirmChange = () => {
    setConfirmChecked(!confirmChecked);
    if (showConfirmError) {
      setShowConfirmError(false);
    }
  };

  return (
    <div className="form-set">
      <GoabText as="h1" size="heading-l" mt="2xl" mb="none">
        Application {application.referenceId}
      </GoabText>

      <GoabText size="body-m" mt="m" mb="xl">
        Your progress is saved automatically. You can return to complete this application at any time.
      </GoabText>

      <StatusCallout
        completedCount={completedSections}
        totalCount={totalSections}
        hasAnyProgress={hasAnyProgress}
        onContinue={() => onStartTask(getNextTask())}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--goa-space-m)",
          marginTop: "var(--goa-space-xl)",
        }}
      >
        {/* Section 1: Prepare your application */}
        <TaskGroup number={1} title="Prepare your application">
          <TaskItem
            name="Verify your age"
            status={task2Status}
            onClick={() => onStartTask(2)}
          />
          <TaskItem
            name="Your situation"
            status={task3Status}
            onClick={() => onStartTask(3)}
            isLast
          />
        </TaskGroup>

        {/* Section 2: Additional information (locked until section 1 complete) */}
        <TaskGroup
          number={2}
          title="Additional information"
          locked={!section1Complete}
          lockedMessage="You need to complete the previous section before you can start this task."
        >
          <TaskItem
            name="Personal information"
            status={task1Status}
            onClick={() => onStartTask(1)}
            isLast
          />
        </TaskGroup>
      </div>

      {/* Submit Section */}
      <div
        id="submit-section"
        style={{
          marginTop: "var(--goa-space-2xl)",
        }}
      >
        {/* Not ready to submit */}
        {!canSubmit && (
          <>
            <GoabText size="body-xs" color="secondary" mt="none" mb="m">
              Complete all sections above to submit your application.
            </GoabText>
            <GoabButton type="primary" disabled>
              Submit application
            </GoabButton>
          </>
        )}

        {/* Ready to submit */}
        {canSubmit && (
          <>
            <GoabxFormItem
              label=""
              error={showConfirmError ? "You must confirm that all of your answers are correct" : ""}
            >
              <GoabxCheckbox
                name="confirmSubmit"
                text="I confirm that all of my answers are correct"
                checked={confirmChecked}
                onChange={handleConfirmChange}
              />
            </GoabxFormItem>
            <div style={{ marginTop: "var(--goa-space-l)" }}>
              <GoabButton type="primary" onClick={handleSubmit}>
                Submit application
              </GoabButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
