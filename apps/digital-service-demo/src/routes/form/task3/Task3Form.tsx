import { useState, useEffect } from "react";
import {
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
} from "@abgov/react-components";
import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { PFOutline, PFState } from "@abgov/ui-components-common";
import { BackLink } from "../components";
import { task3Outline } from "./outline";
import { AboutYou, ApplyingFor, Relationship, Employment, WhenNeeded } from "./pages";

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;

type Task3FormProps = {
  initialState: PFState | null;
  readOnly?: boolean;
  onComplete: (state: PFState) => void;
  onExit: (state: PFState | null) => void;
};

/**
 * Task 3: Your Application
 *
 * 6 pages with branching:
 * 1. About you (name + phone - for workspace case header)
 * 2. Applying for (radio with branching)
 * 3. Relationship (conditional - only if "someone else")
 * 4. Employment (dropdown)
 * 5. When needed (date picker)
 * 6. Review (GoabPublicFormSummary)
 */
export function Task3Form({
  initialState,
  readOnly = false,
  onComplete,
  onExit,
}: Task3FormProps) {
  const [state, setState] = useState<PFState | undefined>();

  // Initialize form with outline and any existing state
  const handleInit = (initFn: InitFunction) => {
    let stateToUse = initialState || { data: {}, dataBuffer: {}, history: [] };

    // In readOnly mode or re-entering a completed task, start on review page
    if (
      readOnly ||
      (stateToUse.history.length > 0 &&
        stateToUse.history[stateToUse.history.length - 1] === "")
    ) {
      const cleanedHistory = stateToUse.history.filter((h) => h !== "");
      if (!cleanedHistory.includes("review")) {
        cleanedHistory.push("review");
      }
      stateToUse = { ...stateToUse, history: cleanedHistory };
    }

    const initial = initFn(stateToUse, { outline: task3Outline });
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

    // Empty string in history signals form completion
    const lastPage = newState.history[newState.history.length - 1];
    if (lastPage === "") {
      // In readOnly mode, just go back to task list
      if (readOnly) {
        onExit(null);
        return;
      }
      onComplete(newState);
    }
  };

  // Determine current page from history
  const currentPage = state?.history?.[state.history.length - 1] || "about-you";
  const isFirstPage = currentPage === "about-you";

  return (
    <div className="form-set">
      {/* Back link above the form - only on first page, not in readOnly mode */}
      {!readOnly && (
        <div
          style={{
            marginBottom: isFirstPage ? "var(--goa-space-2xl)" : 0,
            opacity: isFirstPage ? 1 : 0,
            height: isFirstPage ? "auto" : 0,
            overflow: "hidden",
            transition: "opacity 150ms ease-in-out",
          }}
        >
          <BackLink onClick={() => onExit(state || null)}>Back to all tasks</BackLink>
        </div>
      )}

      <GoabPublicForm onInit={handleInit} onNext={handleNext}>
        <GoabPublicFormPage id="about-you" backVisibility="hidden">
          <AboutYou />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="applying-for">
          <ApplyingFor />
        </GoabPublicFormPage>

        {/* Conditional page - only shown when branching logic navigates here */}
        <GoabPublicFormPage id="relationship">
          <Relationship />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="employment">
          <Employment />
        </GoabPublicFormPage>

        <GoabPublicFormPage id="when-needed">
          <WhenNeeded />
        </GoabPublicFormPage>

        <GoabPublicFormPage
          id="review"
          buttonText={readOnly ? "Back to all tasks" : "Save and continue"}
          buttonType={readOnly ? "secondary" : "primary"}
          buttonLeadingIcon={readOnly ? "arrow-back" : undefined}
          errorSummaryPosition="none"
          backVisibility={readOnly ? "hidden" : "visible"}
        >
          <GoabPublicFormSummary heading="Your application" readOnly={readOnly} />
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
