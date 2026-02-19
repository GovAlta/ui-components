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
export function Task2Form({ initialState, onComplete, onIneligible, onExit }: Task2FormProps) {
  const [state, setState] = useState<PFState | undefined>();

  // Initialize form with outline and any existing state
  const handleInit = (initFn: InitFunction) => {
    let stateToUse = initialState || { data: {}, dataBuffer: {}, history: [] };

    // If re-entering a completed task, clean up history so it ends with "review"
    if (stateToUse.history.length > 0 && stateToUse.history[stateToUse.history.length - 1] === "") {
      const cleanedHistory = stateToUse.history.filter((h) => h !== "");
      if (!cleanedHistory.includes("review")) {
        cleanedHistory.push("review");
      }
      stateToUse = { ...stateToUse, history: cleanedHistory };
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

  return (
    <div className="form-set">
      {/* Back link above the form - only on first page */}
      <div
        style={{
          marginBottom: isFirstPage ? "var(--goa-space-2xl)" : 0,
          opacity: isFirstPage ? 1 : 0,
          height: isFirstPage ? "auto" : 0,
          overflow: "hidden",
          transition: "opacity 150ms ease-in-out",
        }}
      >
        <BackLink onClick={() => onExit(state || null)}>
          Back to all tasks
        </BackLink>
      </div>

      <GoabPublicForm onInit={handleInit} onNext={handleNext}>
        <GoabPublicFormPage id="id-info" backVisibility="hidden">
          <IdInfo />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="date-of-birth">
          <DateOfBirth />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="review" buttonText="Save and continue" backVisibility="hidden" errorSummaryPosition="none">
          <GoabPublicFormSummary heading="Verify your age" />
          <div style={{ marginTop: "var(--goa-space-2xl)" }}>
            <GoabxFormItem label="">
              <GoabxCheckbox
                name="confirmCorrect"
                data-pf-item=""
                text="I confirm that the information above is correct"
              />
            </GoabxFormItem>
          </div>
        </GoabPublicFormPage>
      </GoabPublicForm>
    </div>
  );
}
