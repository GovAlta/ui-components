import { useState } from "react";
import {
  GoabxCallout,
  GoabxBadge,
  GoabxCheckbox,
  GoabxFormItem,
} from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";
import { GoabxButton } from "@abgov/react-components/experimental";
import { Application, TaskStatus } from "../types";

// Simple action link styled like GoabxLink (for onClick handlers)
function ActionLink({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
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
  onStartTask: (taskNumber: 1 | 2 | 3 | 4) => void;
  onSubmitApplication: () => void;
  onBackToDashboard: () => void;
  canSubmit: boolean;
  isSubmitting?: boolean;
  submissionError?: string | null;
};

function getTaskStatus(hasState: boolean, isComplete: boolean): TaskStatus {
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
  const isComplete = status === "complete";
  const [isHovered, setIsHovered] = useState(false);

  // Determine text color based on status and hover state
  const getTextColor = () => {
    if (isLocked) return "var(--goa-color-text-default)";
    if (isHovered) return "var(--goa-color-interactive-hover)";
    if (isComplete) return "var(--goa-color-text-default)";
    return "var(--goa-color-interactive-default)";
  };

  // Determine text decoration based on status and hover state
  const getTextDecoration = () => {
    if (isLocked) return "none";
    if (isComplete) return isHovered ? "underline" : "none";
    return "underline";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: isLast
          ? "none"
          : "1px solid var(--task-item-border, var(--goa-color-greyscale-100))",
        padding: "12px 16px 8px 16px",
        minHeight: "48px",
        cursor: isLocked ? "default" : "pointer",
        backgroundColor:
          !isLocked && isHovered
            ? "var(--task-item-hover-bg, var(--goa-color-greyscale-50))"
            : "transparent",
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
          color: getTextColor(),
          textDecoration: getTextDecoration(),
          transition: "color 0.15s ease, text-decoration 0.15s ease",
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
        backgroundColor: "var(--task-group-bg, var(--goa-color-greyscale-white))",
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
            {lockedMessage ||
              "You need to complete the previous section before you can start this task."}
          </span>
        </div>
      ) : (
        <div style={{ marginTop: "var(--goa-space-m)" }}>{children}</div>
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

function StatusCallout({
  completedCount,
  totalCount,
  hasAnyProgress,
  onContinue,
}: StatusCalloutProps) {
  const allComplete = completedCount === totalCount;
  const noneComplete = completedCount === 0;

  if (allComplete) {
    return (
      <GoabxCallout type="information" heading="Ready to submit" emphasis="low">
        All {totalCount} sections complete. Confirm and submit your application below.
      </GoabxCallout>
    );
  }

  if (noneComplete && !hasAnyProgress) {
    return (
      <GoabxCallout
        type="information"
        heading={`You have ${totalCount} sections to complete`}
        emphasis="low"
      >
        <ActionLink onClick={() => onContinue?.()}>Start first section</ActionLink>
      </GoabxCallout>
    );
  }

  // Some progress made but not all sections complete
  const sectionsLeft = totalCount - completedCount;
  const headingText = `${sectionsLeft} ${sectionsLeft === 1 ? "section" : "sections"} left to complete`;

  return (
    <GoabxCallout type="information" heading={headingText} emphasis="low">
      You have completed {completedCount} of {totalCount} sections.
      <div style={{ marginTop: "var(--goa-space-m)" }}>
        <ActionLink onClick={() => onContinue?.()}>Continue</ActionLink>
      </div>
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
  isSubmitting = false,
  submissionError = null,
}: TaskListPageProps) {
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [showConfirmError, setShowConfirmError] = useState(false);

  const task1Status = getTaskStatus(!!application.task1State, application.task1Complete);
  const task2Status = getTaskStatus(!!application.task2State, application.task2Complete);
  const task3Status = getTaskStatus(!!application.task3State, application.task3Complete);
  const task4Status = getTaskStatus(!!application.task4State, application.task4Complete);

  // Section 1: Verify your eligibility (task 2 - age, task 3 - situation)
  const section1Complete = application.task2Complete && application.task3Complete;
  // Section 2: Your application (task 1 - personal information)
  const section2Complete = application.task1Complete;
  // Section 3: Important documents (task 4 - ID upload)
  const section3Complete = application.task4Complete;

  // Count completed sections
  const completedSections = [section1Complete, section2Complete, section3Complete].filter(
    Boolean,
  ).length;
  const totalSections = 3;

  // Check if any task has been started or completed
  const hasAnyProgress = !!(
    application.task1State ||
    application.task2State ||
    application.task3State ||
    application.task4State
  );

  // Find the next task to continue
  const getNextTask = (): 1 | 2 | 3 | 4 => {
    if (!application.task2Complete) return 2; // Verify your age
    if (!application.task3Complete) return 3; // Your situation
    if (!application.task1Complete) return 1; // Personal information
    if (!application.task4Complete) return 4; // Upload ID
    return 4; // Default
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

  const isSubmitted = application.status === "submitted";

  return (
    <div className="form-set">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--goa-space-m)",
          marginTop: "var(--goa-space-2xl)",
        }}
      >
        <GoabText as="h1" size="heading-l" mt="none" mb="none">
          Application for a service
        </GoabText>
        {isSubmitted ? (
          <GoabxBadge type="success" emphasis="subtle" content="Submitted" size="large" />
        ) : (
          <GoabxBadge type="default" emphasis="subtle" content="Draft" size="large" />
        )}
      </div>

      <GoabText size="body-m" mt="m" mb="xl">
        {isSubmitted
          ? "You can review your answers below."
          : "Your progress is saved automatically. You can return to complete this application at any time."}
      </GoabText>

      {isSubmitted && (
        <GoabxCallout type="success" heading="Application submitted" emphasis="low">
          Reference number: <strong>{application.referenceId}</strong>
        </GoabxCallout>
      )}

      {!isSubmitted && (
        <StatusCallout
          completedCount={completedSections}
          totalCount={totalSections}
          hasAnyProgress={hasAnyProgress}
          onContinue={() => onStartTask(getNextTask())}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--goa-space-m)",
          marginTop: "var(--goa-space-xl)",
        }}
      >
        {/* Section 1: Verify your eligibility */}
        <TaskGroup number={1} title="Verify your eligibility">
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

        {/* Section 2: Your application (locked until eligibility verified) */}
        <TaskGroup
          number={2}
          title="Your application"
          locked={!section1Complete}
          lockedMessage="You need to verify your eligibility before continuing."
        >
          <TaskItem
            name="Personal information"
            status={task1Status}
            onClick={() => onStartTask(1)}
            isLast
          />
        </TaskGroup>

        {/* Section 3: Important documents (locked until section 1 complete) */}
        <TaskGroup
          number={3}
          title="Important documents"
          locked={!section1Complete}
          lockedMessage="You need to verify your eligibility before uploading documents."
        >
          <TaskItem
            name="Upload your identification"
            status={section1Complete ? task4Status : "locked"}
            onClick={() => onStartTask(4)}
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
        {/* Already submitted - show back button */}
        {isSubmitted && (
          <GoabxButton
            type="secondary"
            leadingIcon="arrow-back"
            onClick={onBackToDashboard}
          >
            Back to my applications
          </GoabxButton>
        )}

        {/* Not ready to submit */}
        {!isSubmitted && !canSubmit && (
          <>
            <GoabText size="body-xs" color="secondary" mt="none" mb="m">
              Complete all sections above to submit your application.
            </GoabText>
            <GoabxButton type="primary" disabled>
              Submit application
            </GoabxButton>
          </>
        )}

        {/* Ready to submit */}
        {!isSubmitted && canSubmit && (
          <>
            {submissionError && (
              <div style={{ marginBottom: "var(--goa-space-l)" }}>
                <GoabxCallout type="emergency" heading="Submission failed" emphasis="low">
                  {submissionError}
                </GoabxCallout>
              </div>
            )}
            <GoabxFormItem
              label=""
              error={
                showConfirmError
                  ? "You must confirm that all of your answers are correct"
                  : ""
              }
            >
              <GoabxCheckbox
                name="confirmSubmit"
                text="I confirm that all of my answers are correct"
                checked={confirmChecked}
                onChange={handleConfirmChange}
                disabled={isSubmitting}
              />
            </GoabxFormItem>
            <div style={{ marginTop: "var(--goa-space-l)" }}>
              <GoabxButton type="primary" onClick={handleSubmit} disabled={isSubmitting}>
                Submit application
              </GoabxButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
