import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoabAppHeader } from "@abgov/react-components";
import {
  GoabxAppFooter,
  GoabxAppFooterMetaSection,
  GoabxMenuButton,
  GoabxMenuAction,
} from "@abgov/react-components/experimental";
import { PFState, GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../workspace/hooks/useTheme";

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
import { Task4Form } from "./task4";

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
  const { isDark, toggleTheme } = useTheme();

  // Auth state - demo only, no real authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  const task4Complete = currentApp?.task4Complete ?? false;
  const allComplete = task1Complete && task2Complete && task3Complete && task4Complete;

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

  const handleStartTask = (taskNumber: 1 | 2 | 3 | 4) => {
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
    } else if (taskNumber === 4 && !currentApp.task4State) {
      updates.task4State = emptyState;
    }

    // If task is complete, ensure history ends with "review"
    const isComplete =
      (taskNumber === 1 && currentApp.task1Complete) ||
      (taskNumber === 2 && currentApp.task2Complete) ||
      (taskNumber === 3 && currentApp.task3Complete) ||
      (taskNumber === 4 && currentApp.task4Complete);

    if (isComplete) {
      const taskState =
        taskNumber === 1
          ? currentApp.task1State
          : taskNumber === 2
            ? currentApp.task2State
            : taskNumber === 3
              ? currentApp.task3State
              : currentApp.task4State;

      // Ensure history ends with "" to signal re-entry to the form component
      // The form's handleInit will detect this and clean it, setting wasReentry=true
      if (taskState && taskState.history[taskState.history.length - 1] !== "") {
        const historyWithMarker = [...taskState.history, ""];
        const markedState: PFState = { ...taskState, history: historyWithMarker };

        if (taskNumber === 1) updates.task1State = markedState;
        else if (taskNumber === 2) updates.task2State = markedState;
        else if (taskNumber === 3) updates.task3State = markedState;
        else updates.task4State = markedState;
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
        app.id === currentAppId ? { ...app, ...updates, updatedAt: new Date() } : app,
      ),
    );
  };

  // Called when task "Submit section" is clicked - marks complete
  const handleTaskComplete = (taskNumber: 1 | 2 | 3 | 4, state: PFState) => {
    const updates: Partial<Application> = {};
    if (taskNumber === 1) {
      updates.task1State = state;
      updates.task1Complete = true;
    } else if (taskNumber === 2) {
      updates.task2State = state;
      updates.task2Complete = true;
    } else if (taskNumber === 3) {
      updates.task3State = state;
      updates.task3Complete = true;
    } else {
      updates.task4State = state;
      updates.task4Complete = true;
    }
    updateApplication(updates);
    setView("task-list");
  };

  // Called when exiting task without completing - preserves progress only
  const handleTaskExit = (taskNumber: 1 | 2 | 3 | 4, state: PFState | null) => {
    if (state) {
      const updates: Partial<Application> = {};
      if (taskNumber === 1) updates.task1State = state;
      else if (taskNumber === 2) updates.task2State = state;
      else if (taskNumber === 3) updates.task3State = state;
      else updates.task4State = state;
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
      task4: currentApp.task4State?.data || {},
    };

    // Extract citizen info:
    // - Name and phone from task3 "about-you" page (collected early for workspace case header)
    // - Email from task1 "contact-preference" page
    const aboutYouData = currentApp.task3State?.data?.["about-you"] as
      | Record<string, unknown>
      | undefined;
    const contactData = currentApp.task1State?.data?.["contact-preference"] as
      | Record<string, unknown>
      | undefined;
    const citizenName = (aboutYouData?.fullName as string) || null;
    const citizenPhone = (aboutYouData?.phoneNumber as string) || null;
    const citizenEmail = (contactData?.emailAddress as string) || null;

    // Debug: log extracted citizen info
    console.log("[Submit] Citizen info:", { citizenName, citizenEmail, citizenPhone });
    console.log("[Submit] Form data:", formData);

    try {
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          form_type: "service-application",
          citizen_name: citizenName,
          citizen_email: citizenEmail,
          citizen_phone: citizenPhone,
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

  // Account menu actions
  const handleAccountAction = (detail: GoabMenuButtonOnActionDetail) => {
    switch (detail.action) {
      case "my-applications":
        setView("my-applications");
        break;
      case "theme":
        toggleTheme();
        break;
      case "sign-out":
        setIsLoggedIn(false);
        setView("start");
        break;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="form-app">
      <GoabAppHeader heading="Apply for a Service" url="/" version="2">
        {isLoggedIn ? (
          <div slot="utilities">
            <GoabxMenuButton
              text="Jordan Smith"
              type="tertiary"
              size="compact"
              onAction={handleAccountAction}
            >
              <GoabxMenuAction text="My applications" action="my-applications" />
              <GoabxMenuAction
                text={isDark ? "Light mode" : "Dark mode"}
                action="theme"
                icon={isDark ? "sunny" : "moon"}
              />
              <GoabxMenuAction text="Sign out" action="sign-out" icon="log-out" />
            </GoabxMenuButton>
          </div>
        ) : (
          <a
            slot="utilities"
            href="#sign-in"
            onClick={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
            }}
          >
            Sign in
          </a>
        )}
      </GoabAppHeader>

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
            readOnly={currentApp.status === "submitted"}
            onComplete={(state) => handleTaskComplete(1, state)}
            onExit={(state) => handleTaskExit(1, state)}
          />
        )}

        {view === "task-2" && currentApp && (
          <Task2Form
            initialState={currentApp.task2State}
            readOnly={currentApp.status === "submitted"}
            onComplete={(state) => handleTaskComplete(2, state)}
            onIneligible={() => setView("ineligible")}
            onExit={(state) => handleTaskExit(2, state)}
          />
        )}

        {view === "task-3" && currentApp && (
          <Task3Form
            initialState={currentApp.task3State}
            readOnly={currentApp.status === "submitted"}
            onComplete={(state) => handleTaskComplete(3, state)}
            onExit={(state) => handleTaskExit(3, state)}
          />
        )}

        {view === "task-4" && currentApp && (
          <Task4Form
            initialState={currentApp.task4State}
            readOnly={currentApp.status === "submitted"}
            onComplete={(state) => handleTaskComplete(4, state)}
            onExit={(state) => handleTaskExit(4, state)}
          />
        )}

        {view === "results" && (
          <ResultsPage
            referenceId={currentApp?.referenceId}
            citizenEmail={
              (
                currentApp?.task1State?.data?.["contact-preference"] as Record<
                  string,
                  unknown
                >
              )?.emailAddress as string | undefined
            }
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
          <a href="/workspace">Worker login</a>
        </GoabxAppFooterMetaSection>
      </GoabxAppFooter>
    </div>
  );
}
