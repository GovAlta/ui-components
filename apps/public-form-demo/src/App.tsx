import { useState, useEffect } from "react";
import { GoabAppHeader } from "@abgov/react-components";
import { GoabxAppFooter, GoabxAppFooterMetaSection } from "@abgov/react-components/experimental";
import { PFState } from "@abgov/ui-components-common";

import { View, Application, createApplication } from "./types";

// Demo seed data - three applications matching Figma design
const demoApplications: Application[] = [
  {
    id: "demo-1",
    referenceId: "1234ABC",
    status: "not-started",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
    task1State: null,
    task2State: null,
    task3State: null,
    task1Complete: false,
    task2Complete: false,
    task3Complete: false,
  },
  {
    id: "demo-2",
    referenceId: "1235ABC",
    status: "in-progress",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
    task1State: { data: {}, dataBuffer: {}, history: ["urgent-need"] },
    task2State: null,
    task3State: null,
    task1Complete: false,
    task2Complete: false,
    task3Complete: false,
  },
  {
    id: "demo-3",
    referenceId: "1236ABC",
    status: "submitted",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
    task1State: { data: {}, dataBuffer: {}, history: ["review"] },
    task2State: { data: {}, dataBuffer: {}, history: ["review"] },
    task3State: { data: {}, dataBuffer: {}, history: ["review"] },
    task1Complete: true,
    task2Complete: true,
    task3Complete: true,
  },
];
import {
  StartPage,
  MyApplicationsPage,
  TaskListPage,
  ResultsPage,
  IneligibleResultsPage,
} from "./views";
import { Task1Form } from "./task1";
import { Task2Form } from "./task2";
import { Task3Form } from "./task3";

/**
 * Public Form Demo - Orchestrator
 *
 * Implements the three-level form hierarchy:
 * 1. My Applications Dashboard - shows all user's applications
 * 2. Task List - progress within ONE application
 * 3. Task Forms - each task is a separate GoabPublicForm
 */
export default function App() {
  // View state - which screen is currently displayed
  const [view, setView] = useState<View>("start");

  // All applications for this user (seeded with demo data)
  const [applications, setApplications] = useState<Application[]>(demoApplications);

  // Currently active application ID
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);

  // Get the current application object
  const currentApp = applications.find((a) => a.id === currentAppId);

  // Task completion uses explicit flags (not just history includes)
  const task1Complete = currentApp?.task1Complete ?? false;
  const task2Complete = currentApp?.task2Complete ?? false;
  const task3Complete = currentApp?.task3Complete ?? false;
  const allComplete = task1Complete && task2Complete && task3Complete;

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────────

  const handleNewApplication = () => {
    const newApp = createApplication();
    setApplications([...applications, newApp]);
    setCurrentAppId(newApp.id);
    setView("task-list");
  };

  const handleResumeApplication = (id: string) => {
    setCurrentAppId(id);
    setView("task-list");
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
    // If deleting the current application, clear selection
    if (currentAppId === id) {
      setCurrentAppId(null);
    }
  };

  const handleStartTask = (taskNumber: 1 | 2 | 3) => {
    if (!currentApp) return;

    const updates: Partial<Application> = {};

    // Update application status to in-progress if not started
    if (currentApp.status === "not-started") {
      updates.status = "in-progress";
    }

    // Initialize task state if not exists (so "Save and exit" has something to save)
    const emptyState: PFState = { data: {}, dataBuffer: {}, history: [] };
    if (taskNumber === 1 && !currentApp.task1State) {
      updates.task1State = emptyState;
    } else if (taskNumber === 2 && !currentApp.task2State) {
      updates.task2State = emptyState;
    } else if (taskNumber === 3 && !currentApp.task3State) {
      updates.task3State = emptyState;
    }

    // If task is complete, ensure history ends with "review" (not empty string)
    // so re-entering goes to review page instead of first question
    const isComplete =
      (taskNumber === 1 && currentApp.task1Complete) ||
      (taskNumber === 2 && currentApp.task2Complete) ||
      (taskNumber === 3 && currentApp.task3Complete);

    if (isComplete) {
      const taskState =
        taskNumber === 1
          ? currentApp.task1State
          : taskNumber === 2
            ? currentApp.task2State
            : currentApp.task3State;

      if (taskState && taskState.history[taskState.history.length - 1] === "") {
        // Remove the empty string and ensure we're on review
        const cleanedHistory = taskState.history.filter((h) => h !== "");
        if (!cleanedHistory.includes("review")) {
          cleanedHistory.push("review");
        }
        const cleanedState: PFState = { ...taskState, history: cleanedHistory };

        if (taskNumber === 1) updates.task1State = cleanedState;
        else if (taskNumber === 2) updates.task2State = cleanedState;
        else updates.task3State = cleanedState;
      }
    }

    if (Object.keys(updates).length > 0) {
      updateApplication(updates);
    }

    setView(`task-${taskNumber}` as View);
  };

  const updateApplication = (updates: Partial<Application>) => {
    setApplications(
      applications.map((app) =>
        app.id === currentAppId
          ? { ...app, ...updates, updatedAt: new Date() }
          : app
      )
    );
  };

  // Called when task "Submit section" is clicked - marks complete
  const handleTaskComplete = (taskNumber: 1 | 2 | 3, state: PFState) => {
    const updates: Partial<Application> = {};
    if (taskNumber === 1) {
      updates.task1State = state;
      updates.task1Complete = true;
    } else if (taskNumber === 2) {
      updates.task2State = state;
      updates.task2Complete = true;
    } else {
      updates.task3State = state;
      updates.task3Complete = true;
    }
    updateApplication(updates);
    setView("task-list");
  };

  // Called when exiting task without completing - preserves progress only
  const handleTaskExit = (taskNumber: 1 | 2 | 3, state: PFState | null) => {
    if (state) {
      const updates: Partial<Application> = {};
      if (taskNumber === 1) updates.task1State = state;
      else if (taskNumber === 2) updates.task2State = state;
      else updates.task3State = state;
      updateApplication(updates);
    }
    setView("task-list");
  };

  const handleSubmitApplication = () => {
    // Mark as submitted and go directly to results
    // (confirmation checkbox is already on the task list page)
    updateApplication({
      status: "submitted",
    });
    setView("results");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="app">
      <GoabAppHeader heading="Apply for a Service" />

      <main className="main-content">
        {view === "start" && (
          <StartPage
            onStartNew={handleNewApplication}
            onContinue={() => setView("my-applications")}
          />
        )}

        {view === "my-applications" && (
          <MyApplicationsPage
            applications={applications}
            onNewApplication={handleNewApplication}
            onResumeApplication={handleResumeApplication}
            onDeleteApplication={handleDeleteApplication}
          />
        )}

        {view === "task-list" && currentApp && (
          <TaskListPage
            application={currentApp}
            onStartTask={handleStartTask}
            onSubmitApplication={handleSubmitApplication}
            onBackToDashboard={() => setView("my-applications")}
            canSubmit={allComplete}
          />
        )}

        {view === "task-1" && currentApp && (
          <Task1Form
            initialState={currentApp.task1State}
            onComplete={(state) => handleTaskComplete(1, state)}
            onExit={(state) => handleTaskExit(1, state)}
          />
        )}

        {view === "task-2" && currentApp && (
          <Task2Form
            initialState={currentApp.task2State}
            onComplete={(state) => handleTaskComplete(2, state)}
            onIneligible={() => setView("ineligible")}
            onExit={(state) => handleTaskExit(2, state)}
          />
        )}

        {view === "task-3" && currentApp && (
          <Task3Form
            initialState={currentApp.task3State}
            onComplete={(state) => handleTaskComplete(3, state)}
            onExit={(state) => handleTaskExit(3, state)}
          />
        )}

        {view === "results" && (
          <ResultsPage
            referenceId={currentApp?.referenceId}
            onBackToDashboard={() => setView("my-applications")}
            onBackToStart={() => setView("start")}
          />
        )}

        {view === "ineligible" && (
          <IneligibleResultsPage
            onBackToStart={() => setView("start")}
            onBackToApplications={() => setView("my-applications")}
          />
        )}
      </main>

      <GoabxAppFooter>
        <GoabxAppFooterMetaSection>
          <a href="#">My profile</a>
          <a href="#">Accessibility</a>
          <a href="#">Privacy</a>
          <a href="#">Terms and conditions</a>
        </GoabxAppFooterMetaSection>
      </GoabxAppFooter>
    </div>
  );
}
