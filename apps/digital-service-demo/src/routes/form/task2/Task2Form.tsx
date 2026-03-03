import { useState, useEffect } from "react";
import {
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
} from "@abgov/react-components";
import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { PFOutline, PFState } from "@abgov/ui-components-common";
import { BackLink } from "../components";
import { task2Outline } from "./outline";
import { IdInfo, DateOfBirth } from "./pages";

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;

type Task2FormProps = {
  initialState: PFState | null;
  readOnly?: boolean;
  onComplete: (state: PFState) => void;
  onIneligible: () => void;
  onExit: (state: PFState | null) => void;
};

/**
 * Task 2: Verify Your Identity
 *
 * 3 pages:
 * 1. ID info (info-only)
 * 2. Date of birth (date picker)
 * 3. Review (GoabPublicFormSummary)
 */
export function Task2Form({ initialState, readOnly = false, onComplete, onIneligible, onExit }: Task2FormProps) {
  const [state, setState] = useState<PFState | undefined>();
  const [wasReentry, setWasReentry] = useState(false);

  // Initialize form with outline and any existing state
  const handleInit = (initFn: InitFunction) => {
    let stateToUse = initialState || { data: {}, dataBuffer: {}, history: [] };

    // In readOnly mode, always start on review page
    if (readOnly) {
      const cleanedHistory = stateToUse.history.filter((h) => h !== "");
      if (!cleanedHistory.includes("review")) {
        cleanedHistory.push("review");
      }
      stateToUse = { ...stateToUse, history: cleanedHistory };
      setWasReentry(true);
    } else {
      const isReentryTask = stateToUse.history.length > 0 &&
        stateToUse.history[stateToUse.history.length - 1] === "";

      // If re-entering a completed task, clean up history so it ends with "review"
      if (isReentryTask) {
        const cleanedHistory = stateToUse.history.filter((h) => h !== "");
        if (!cleanedHistory.includes("review")) {
          cleanedHistory.push("review");
        }
        stateToUse = { ...stateToUse, history: cleanedHistory };
        setWasReentry(true);
      }
    }

    const initial = initFn(stateToUse, { outline: task2Outline });
    setState(initial);
  };

  // Listen for back navigation
  useEffect(() => {
    const handleBack = () => {
      setState((prev) => {
        if (!prev || prev.history.length <= 1) return prev;
        const newHistory = [...prev.history];
        newHistory.pop();
        return { ...prev, history: newHistory };
      });
    };

    document.addEventListener("form-page:back", handleBack, true);
    return () => document.removeEventListener("form-page:back", handleBack, true);
  }, []);

  // Handle navigation to next page
  const handleNext = (newState: PFState) => {
    const stateCopy: PFState = {
      data: { ...newState.data },
      dataBuffer: { ...newState.dataBuffer },
      history: [...newState.history],
    };
    setState(stateCopy);

    // Empty string in history signals form exit
    const lastPage = newState.history[newState.history.length - 1];
    if (lastPage === "") {
      // In readOnly mode, just go back to task list
      if (readOnly) {
        onExit(null);
        return;
      }

      // Check which page we exited from
      const exitedFrom = newState.history[newState.history.length - 2];
      if (exitedFrom === "date-of-birth") {
        // Exited from date-of-birth means ineligible (under 18)
        onIneligible();
      } else {
        onComplete(newState);
      }
    }
  };

  // Determine current page from history
  const currentPage = state?.history?.[state.history.length - 1] || "id-info";
  const isFirstPage = currentPage === "id-info";

  // Only show BackLink on first page of a NEW task (not re-entry), and not in readOnly mode
  // During re-entry, user uses the form's internal back button only
  const showBackLink = state !== undefined && isFirstPage && !wasReentry && !readOnly;

  return (
    <div className="form-set">
      {/* Back link above the form - only on first page */}
      {showBackLink && (
        <div style={{ marginBottom: "var(--goa-space-2xl)" }}>
          <BackLink onClick={() => onExit(state || null)}>
            Back to all tasks
          </BackLink>
        </div>
      )}

      <GoabPublicForm onInit={handleInit} onNext={handleNext}>
        <GoabPublicFormPage id="id-info" backVisibility="hidden">
          <IdInfo />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="date-of-birth">
          <DateOfBirth />
        </GoabPublicFormPage>

        <GoabPublicFormPage
          id="review"
          buttonText={readOnly ? "Back to all tasks" : "Save and continue"}
          buttonType={readOnly ? "secondary" : "primary"}
          buttonLeadingIcon={readOnly ? "arrow-back" : undefined}
          errorSummaryPosition="none"
          backVisibility={readOnly ? "hidden" : "visible"}
        >
          <GoabPublicFormSummary heading="Verify your age" readOnly={readOnly} />
          {!readOnly && (
            <div style={{ marginTop: "var(--goa-space-2xl)" }}>
              <GoabxFormItem label="">
                <GoabxCheckbox
                  name="confirmCorrect"
                  data-pf-item=""
                  text="I confirm that the information above is correct"
                />
              </GoabxFormItem>
            </div>
          )}
        </GoabPublicFormPage>
      </GoabPublicForm>
    </div>
  );
}
