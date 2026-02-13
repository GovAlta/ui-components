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
import { ApplyingFor, Relationship, Employment, WhenNeeded } from "./pages";

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;

type Task3FormProps = {
  initialState: PFState | null;
  onComplete: (state: PFState) => void;
  onExit: (state: PFState | null) => void;
};

/**
 * Task 3: Your Situation
 *
 * 5 pages with branching:
 * 1. Applying for (radio with branching)
 * 2. Relationship (conditional - only if "someone else")
 * 3. Employment (dropdown)
 * 4. When needed (date picker)
 * 5. Review (GoabPublicFormSummary)
 */
export function Task3Form({ initialState, onComplete, onExit }: Task3FormProps) {
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
      onComplete(newState);
    }
  };

  // Determine current page from history
  const currentPage = state?.history?.[state.history.length - 1] || "applying-for";
  const isFirstPage = currentPage === "applying-for";


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
        <GoabPublicFormPage id="applying-for" backVisibility="hidden">
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

        <GoabPublicFormPage id="review" buttonText="Save and continue" backVisibility="hidden" errorSummaryPosition="none">
          <GoabPublicFormSummary heading="Your situation" />
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
