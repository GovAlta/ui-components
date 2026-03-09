import { useState, useEffect } from "react";
import {
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
} from "@abgov/react-components";
import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { PFOutline, PFState } from "@abgov/ui-components-common";
import { BackLink } from "../components";
import { task4Outline } from "./outline";
import { UploadId } from "./pages";

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;

type Task4FormProps = {
  initialState: PFState | null;
  readOnly?: boolean;
  onComplete: (state: PFState) => void;
  onExit: (state: PFState | null) => void;
};

/**
 * Task 4: Important Documents
 *
 * Simple form with 2 pages:
 * 1. Upload ID (file upload)
 * 2. Review (GoabPublicFormSummary)
 */
export function Task4Form({
  initialState,
  readOnly = false,
  onComplete,
  onExit,
}: Task4FormProps) {
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

    const initial = initFn(stateToUse, { outline: task4Outline });
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
  const currentPage = state?.history?.[state.history.length - 1] || "upload-id";
  const isFirstPage = currentPage === "upload-id";

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
        <GoabPublicFormPage id="upload-id" backVisibility="hidden">
          <UploadId />
        </GoabPublicFormPage>

        <GoabPublicFormPage
          id="review"
          buttonText={readOnly ? "Back to all tasks" : "Save and continue"}
          buttonType={readOnly ? "secondary" : "primary"}
          buttonLeadingIcon={readOnly ? "arrow-back" : undefined}
          errorSummaryPosition="none"
          backVisibility={readOnly ? "hidden" : "visible"}
        >
          <GoabPublicFormSummary heading="Important documents" readOnly={readOnly} />
          {!readOnly && (
            <div style={{ marginTop: "var(--goa-space-2xl)" }}>
              <GoabxFormItem label="">
                <GoabxCheckbox
                  name="confirmCorrect"
                  data-pf-item=""
                  text="I confirm that the document above is correct"
                />
              </GoabxFormItem>
            </div>
          )}
        </GoabPublicFormPage>
      </GoabPublicForm>
    </div>
  );
}
