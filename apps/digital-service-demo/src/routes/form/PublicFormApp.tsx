import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoabAppHeader } from "@abgov/react-components";
import { GoabxAppFooter, GoabxAppFooterMetaSection } from "@abgov/react-components/experimental";
import { PFState } from "@abgov/ui-components-common";
import { supabase } from "../../lib/supabase";

import { View, Application, createApplication } from "./types";
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

import "./styles.css";

/**
 * Public Form Demo - Orchestrator
 *
 * Implements the three-level form hierarchy:
 * 1. My Applications Dashboard - shows all user's applications
 * 2. Task List - progress within ONE application
 * 3. Task Forms - each task is a separate GoabPublicForm
 *
 * Submits to Supabase on final submission.
 */
export function PublicFormApp() {
  const navigate = useNavigate();

  // View state - which screen is currently displayed
  const [view, setView] = useState<View>("start");

  // All applications for this user (starts empty - no demo data)
  const [applications, setApplications] = useState<Application[]>([]);

  // Currently active application ID
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Get the current application object
  const currentApp = applications.find((a) => a.id === currentAppId);

  // Task completion uses explicit flags
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

    // Initialize task state if not exists
    const emptyState: PFState = { data: {}, dataBuffer: {}, history: [] };
    if (taskNumber === 1 && !currentApp.task1State) {
      updates.task1State = emptyState;
    } else if (taskNumber === 2 && !currentApp.task2State) {
      updates.task2State = emptyState;
    } else if (taskNumber === 3 && !currentApp.task3State) {
      updates.task3State = emptyState;
    }

    // If task is complete, ensure history ends with "review"
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

  // Submit to Supabase
  const handleSubmitApplication = async () => {
    if (!currentApp) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    // Collect all form data from task states
    const formData = {
      task1: currentApp.task1State?.data || {},
      task2: currentApp.task2State?.data || {},
      task3: currentApp.task3State?.data || {},
    };

    // Extract citizen info from task1 (consent page has fullName, contact preference has email)
    const consentData = currentApp.task1State?.data?.consent as Record<string, unknown> | undefined;
    const contactData = currentApp.task1State?.data?.['contact-preference'] as Record<string, unknown> | undefined;
    const citizenName = (consentData?.fullName as string) || null;
    const citizenEmail = (contactData?.emailAddress as string) || null;

    try {
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          form_type: "service-application",
          citizen_name: citizenName,
          citizen_email: citizenEmail,
          form_data: formData,
        })
        .select("reference_number")
        .single();

      if (error) {
        console.error("Supabase error:", error);
        setSubmissionError(error.message);
        setIsSubmitting(false);
        return;
      }

      // Update local state with Supabase reference number
      updateApplication({
        status: "submitted",
        referenceId: data.reference_number,
      });
      setView("results");
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigation back to landing page
  const handleBackToHome = () => {
    navigate("/");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="form-app">
      {/* TODO: Add Sign in link when V2 header lands (PR #3184) */}
      <GoabAppHeader heading="Apply for a Service" url="/" />

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
            isSubmitting={isSubmitting}
            submissionError={submissionError}
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
            onBackToStart={handleBackToHome}
          />
        )}

        {view === "ineligible" && (
          <IneligibleResultsPage
            onBackToStart={handleBackToHome}
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
